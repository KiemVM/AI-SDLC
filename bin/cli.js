#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { buildCodexSkills } = require("../scripts/build-codex-skills.js");

const PKG_ROOT = path.join(__dirname, "..");

// The toolkit deliverable: .claude/ wholesale (Claude Code target), .codex/skills/
// rendered on the fly from .claude/ (Codex CLI target — project-scoped custom
// prompts aren't reliably supported there yet, only project-scoped Skills), plus
// the docs/ scaffold shared by both (never the design source docs at docs/*.md,
// and never generated artifacts under docs/specs/<slug>/ or docs/adr/NNNN-*.md).
const DIR_ITEMS = [".claude"];
const FILE_ITEMS = [
  "docs/specs/README.md",
  "docs/adr/README.md",
  "docs/adr/template.md",
  "docs/business/README.md",
  "docs/ux/README.md",
  "docs/architecture/README.md",
  "docs/release/README.md",
];
// Seeded once, then grow with real project data (decisions logged, releases
// shipped) — created if missing, but NEVER force-overwritten. Unlike the pure
// templates above, an update wiping these back to the empty starter would
// destroy real project history, not just refresh stale guidance text.
const SEED_FILE_ITEMS = ["docs/adr/DECISIONS.md", "docs/release/CHANGELOG.md"];

const VALID_TARGETS = ["claude", "codex", "both"];

const HELP = `AI SDLC Toolkit installer

Usage:
  npx github:KiemVM/AI-SDLC [init] [options]

Options:
  --target <t>    claude | codex | both (default: claude)
  --dest <path>   Target project directory (default: current directory)
  --force         Overwrite files that already exist at the destination
  --dry-run       Show what would be copied without writing anything
  --help          Show this help

--target claude  installs .claude/ (commands, skills, CONSTITUTION.md) — Claude Code.
--target codex   installs .codex/skills/, rendered from .claude/ (Codex CLI has no
                 reliable project-scoped command layer, only project-scoped Skills,
                 so each Codex skill is a self-contained merge of the matching
                 Claude command + skill). No .claude/ is written for this target.
--target both    installs both, unmodified from each other.

The docs/ scaffold (specs/adr/business/ux/architecture/release conventions) is
always installed, regardless of target — both agents read/write the same docs/
structure. Existing files are kept unless --force is given, EXCEPT
docs/adr/DECISIONS.md and docs/release/CHANGELOG.md: those accumulate real
project history (logged decisions, shipped releases), so they're seeded once
and never touched by --force, even on an update.

To update an existing install to the latest toolkit version, re-run this same
command with --force — your project's own generated docs (specs, personas,
ADRs, decisions, changelog) are never in the copy list and are always safe.`;

function parseArgs(argv) {
  const args = { dest: process.cwd(), force: false, dryRun: false, help: false, target: "claude" };
  const rest = argv.slice(2).filter((a) => a !== "init");
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === "--force" || a === "-f") args.force = true;
    else if (a === "--dry-run") args.dryRun = true;
    else if (a === "--help" || a === "-h") args.help = true;
    else if (a === "--dest") args.dest = path.resolve(rest[++i]);
    else if (a === "--target") {
      const t = rest[++i];
      if (!VALID_TARGETS.includes(t)) {
        console.error(`Invalid --target "${t}" — must be one of: ${VALID_TARGETS.join(", ")}`);
        process.exit(1);
      }
      args.target = t;
    } else {
      console.error(`Unknown option: ${a}`);
      process.exit(1);
    }
  }
  return args;
}

function copyFile(srcPath, destPath, opts, stats) {
  const exists = fs.existsSync(destPath);
  if (exists && !opts.force) {
    stats.skipped.push(destPath);
    return;
  }
  if (!opts.dryRun) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(srcPath, destPath);
  }
  stats.copied.push(destPath);
}

function copyDir(srcDir, destDir, opts, stats) {
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, opts, stats);
    } else {
      copyFile(srcPath, destPath, opts, stats);
    }
  }
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(HELP);
    return;
  }

  const opts = { force: args.force, dryRun: args.dryRun };
  const stats = { copied: [], skipped: [] };

  if (args.target === "claude" || args.target === "both") {
    for (const item of DIR_ITEMS) {
      const srcPath = path.join(PKG_ROOT, item);
      const destPath = path.join(args.dest, item);
      if (fs.existsSync(srcPath)) copyDir(srcPath, destPath, opts, stats);
    }
  }
  if (args.target === "codex" || args.target === "both") {
    const claudeDir = path.join(PKG_ROOT, ".claude");
    const codexSkillsDir = path.join(args.dest, ".codex", "skills");
    const codexStats = buildCodexSkills(claudeDir, codexSkillsDir, opts);
    stats.copied.push(...codexStats.copied);
    stats.skipped.push(...codexStats.skipped);
  }
  for (const item of FILE_ITEMS) {
    const srcPath = path.join(PKG_ROOT, item);
    const destPath = path.join(args.dest, item);
    if (fs.existsSync(srcPath)) copyFile(srcPath, destPath, opts, stats);
  }
  for (const item of SEED_FILE_ITEMS) {
    const srcPath = path.join(PKG_ROOT, item);
    const destPath = path.join(args.dest, item);
    // force is deliberately ignored here — see SEED_FILE_ITEMS comment above.
    if (fs.existsSync(srcPath)) copyFile(srcPath, destPath, { ...opts, force: false }, stats);
  }

  const rel = (p) => path.relative(args.dest, p);
  const tag = args.dryRun ? " (dry run)" : "";
  console.log(`AI SDLC Toolkit${tag} — target: ${args.target} — destination: ${args.dest}`);
  console.log(`  ${stats.copied.length} file(s) ${args.dryRun ? "would be " : ""}copied.`);
  if (stats.skipped.length > 0) {
    console.log(
      `  ${stats.skipped.length} file(s) already existed and were kept (use --force to overwrite):`
    );
    for (const p of stats.skipped) console.log(`    - ${rel(p)}`);
  }
  if (!args.dryRun && stats.copied.length > 0) {
    const nextSteps = [];
    if (args.target === "claude" || args.target === "both") {
      nextSteps.push("open this project in Claude Code and run /guide for the cheat sheet");
    }
    if (args.target === "codex" || args.target === "both") {
      nextSteps.push("open this project in Codex CLI — skills auto-activate, or run /skills to list them");
    }
    console.log(`\nNext: ${nextSteps.join("; ")}.`);
  }
}

main();
