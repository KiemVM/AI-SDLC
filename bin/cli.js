#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const PKG_ROOT = path.join(__dirname, "..");

// The toolkit deliverable: .claude/ wholesale, plus only the docs/ scaffold
// stubs (never the design source docs at docs/*.md, and never generated
// artifacts under docs/specs/<slug>/ or docs/adr/NNNN-*.md).
const DIR_ITEMS = [".claude"];
const FILE_ITEMS = [
  "docs/specs/README.md",
  "docs/adr/README.md",
  "docs/adr/template.md",
  "docs/business/README.md",
  "docs/ux/README.md",
  "docs/architecture/README.md",
];

const HELP = `AI SDLC Toolkit installer

Usage:
  npx github:KiemVM/AI-SDLC [init] [options]

Options:
  --dest <path>   Target project directory (default: current directory)
  --force         Overwrite files that already exist at the destination
  --dry-run       Show what would be copied without writing anything
  --help          Show this help

Copies .claude/ (commands, skills, CONSTITUTION.md) and the docs/ scaffold
(specs/adr/business/ux/architecture READMEs) into the target project.
Existing files are kept unless --force is given.`;

function parseArgs(argv) {
  const args = { dest: process.cwd(), force: false, dryRun: false, help: false };
  const rest = argv.slice(2).filter((a) => a !== "init");
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === "--force" || a === "-f") args.force = true;
    else if (a === "--dry-run") args.dryRun = true;
    else if (a === "--help" || a === "-h") args.help = true;
    else if (a === "--dest") args.dest = path.resolve(rest[++i]);
    else {
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

  for (const item of DIR_ITEMS) {
    const srcPath = path.join(PKG_ROOT, item);
    const destPath = path.join(args.dest, item);
    if (fs.existsSync(srcPath)) copyDir(srcPath, destPath, opts, stats);
  }
  for (const item of FILE_ITEMS) {
    const srcPath = path.join(PKG_ROOT, item);
    const destPath = path.join(args.dest, item);
    if (fs.existsSync(srcPath)) copyFile(srcPath, destPath, opts, stats);
  }

  const rel = (p) => path.relative(args.dest, p);
  const tag = args.dryRun ? " (dry run)" : "";
  console.log(`AI SDLC Toolkit${tag} — target: ${args.dest}`);
  console.log(`  ${stats.copied.length} file(s) ${args.dryRun ? "would be " : ""}copied.`);
  if (stats.skipped.length > 0) {
    console.log(
      `  ${stats.skipped.length} file(s) already existed and were kept (use --force to overwrite):`
    );
    for (const p of stats.skipped) console.log(`    - ${rel(p)}`);
  }
  if (!args.dryRun && stats.copied.length > 0) {
    console.log("\nNext: open this project in Claude Code and run /guide for the cheat sheet.");
  }
}

main();
