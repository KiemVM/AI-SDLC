"use strict";

const fs = require("fs");
const path = require("path");

// Codex CLI has no project-scoped equivalent of Claude Code's thin "commands"
// layer (project-scoped custom prompts aren't reliably supported yet) — only
// project-scoped Skills (.codex/skills/<name>/SKILL.md, same open SKILL.md
// standard Claude uses). So each Codex skill must be self-contained: it needs
// the Inputs/Process/Output-template/Guardrails that, for Claude, live in the
// separate command file. This module merges each command + its skill into one
// Codex-flavored SKILL.md, rendered at install time from .claude/ — .claude/
// stays the single source of truth; nothing here is hand-duplicated.

// command path (relative to .claude/commands/) -> skill name it invokes.
// Two commands (implement, test) share the test-driven-development skill.
const COMMAND_TO_SKILL = [
  ["business/vision.md", "vision-writing"],
  ["business/prd.md", "prd-writing"],
  ["business/persona.md", "persona-definition"],
  ["business/architecture.md", "architecture-writing"],
  ["ux/user-journey.md", "user-journey-mapping"],
  ["ux/wireframe.md", "wireframing"],
  ["ux/prototype.md", "prototyping"],
  ["spec/spec.md", "spec-writing"],
  ["spec/plan.md", "implementation-planning"],
  ["spec/tasks.md", "task-breakdown"],
  ["engineering/implement.md", "test-driven-development"],
  ["engineering/test.md", "test-driven-development"],
  ["engineering/review.md", "reviewing-code"],
  ["engineering/refactor.md", "refactoring"],
  ["release/release.md", "release-preparation"],
  ["decide.md", "decision-capture"],
];

// Skills with no owning command — invoked as sub-steps from other
// skills/commands, not a primary entrypoint. Copied through unmerged.
const STANDALONE_SKILLS = ["systematic-debugging", "verification-before-completion"];

// Commands with no backing skill — self-contained already, becomes its own
// Codex skill directly (no merge partner).
const SKILLLESS_COMMANDS = ["guide.md"];

function splitFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { fields: {}, body: raw };
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z-]+):\s*(.*)$/);
    if (m) fields[m[1]] = m[2];
  }
  return { fields, body: match[2].replace(/^\r?\n/, "") };
}

// Splits a command body into { title, intro, sections: [{heading, content}] }
// on "## " headings. Our command files are authored consistently enough
// (by us, for this repo) that a heading-split is reliable without a full
// markdown parser — except fenced code blocks (```...```) can themselves
// contain lines starting with "## " (e.g. an example Markdown template), so
// fence state must be tracked to avoid splitting inside one.
function splitSections(body) {
  const lines = body.split(/\r?\n/);
  let title = "";
  let i = 0;
  if (lines[0] && lines[0].startsWith("# ")) {
    title = lines[0].slice(2).trim();
    i = 1;
  }

  const sections = [];
  let current = { heading: null, lines: [] };
  let inFence = false;
  for (; i < lines.length; i++) {
    const line = lines[i];
    if (/^```/.test(line)) inFence = !inFence;
    if (!inFence && line.startsWith("## ")) {
      sections.push(current);
      current = { heading: line.slice(3).trim(), lines: [] };
      continue;
    }
    current.lines.push(line);
  }
  sections.push(current);

  const intro = sections[0].lines.join("\n").trim();
  const namedSections = sections.slice(1).map((s) => ({
    heading: s.heading,
    content: s.lines.join("\n").trim(),
  }));
  return { title, intro, sections: namedSections };
}

function findSection(sections, prefix) {
  return sections.find((s) => s.heading.toLowerCase().startsWith(prefix.toLowerCase()));
}

function renderCommandWorkflow(commandRelPath, raw) {
  const { fields, body } = splitFrontmatter(raw);
  const { title, sections } = splitSections(body);
  const inputs = findSection(sections, "Inputs");
  const process = findSection(sections, "Process");
  const output = findSection(sections, "Output");
  const guardrails = findSection(sections, "Guardrails");

  let out = `### ${title || commandRelPath}\n\n`;
  if (fields.description) out += `${fields.description}\n\n`;
  if (inputs) out += `**Inputs**\n\n${inputs.content}\n\n`;
  if (process) out += `**Process**\n\n${process.content}\n\n`;
  if (output) out += `**${output.heading}**\n\n${output.content}\n\n`;
  if (guardrails) out += `**Guardrails**\n\n${guardrails.content}\n\n`;
  return out.trim();
}

function mergeOne(claudeDir, commandRelPaths, skillName) {
  const skillPath = path.join(claudeDir, "skills", skillName, "SKILL.md");
  const skillRaw = fs.readFileSync(skillPath, "utf8");
  const { fields: skillFields, body: skillBody } = splitFrontmatter(skillRaw);
  const { title: skillTitle } = splitSections(skillBody);

  const workflows = commandRelPaths.map((relPath) => {
    const commandPath = path.join(claudeDir, "commands", relPath);
    const raw = fs.readFileSync(commandPath, "utf8");
    return renderCommandWorkflow(relPath, raw);
  });

  const bodyWithoutTitle = skillBody.replace(/^# .+\r?\n/, "").trim();

  const merged = `---
name: ${skillFields.name || skillName}
description: ${skillFields.description || ""}
---

# ${skillTitle || skillName}

> Ported for Codex CLI from this toolkit's Claude Code command(s) + skill. Source of truth:
> \`.claude/commands/${commandRelPaths.join("\`, \`.claude/commands/")}\` and
> \`.claude/skills/${skillName}/SKILL.md\` in the AI SDLC Toolkit repo. Regenerate this file
> from there rather than editing it directly.

## Workflow

${workflows.join("\n\n")}

## Methodology

${bodyWithoutTitle}
`;
  return merged;
}

function renderSkillless(claudeDir, commandRelPath) {
  const commandPath = path.join(claudeDir, "commands", commandRelPath);
  const raw = fs.readFileSync(commandPath, "utf8");
  const { fields, body } = splitFrontmatter(raw);
  const { title, intro, sections } = splitSections(body);
  const slug = path.basename(commandRelPath, ".md");

  let out = `---
name: ${slug}
description: ${fields.description || ""}
---

# ${title || slug}

> Ported for Codex CLI from this toolkit's Claude Code command. Source of truth:
> \`.claude/commands/${commandRelPath}\` in the AI SDLC Toolkit repo. Regenerate this file
> from there rather than editing it directly.

${intro}

`;
  for (const s of sections) {
    out += `## ${s.heading}\n\n${s.content}\n\n`;
  }
  return out.trim() + "\n";
}

function writeOut(outPath, content, opts, stats) {
  const exists = fs.existsSync(outPath);
  if (exists && !opts.force) {
    stats.skipped.push(outPath);
    return;
  }
  if (!opts.dryRun) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, content);
  }
  stats.copied.push(outPath);
}

/**
 * Renders .codex/skills/ from a .claude/ source directory.
 * @param {string} claudeDir - path to a .claude/ directory (commands/, skills/)
 * @param {string} destDir - path to the .codex/skills/ directory to write into
 * @param {{dryRun?: boolean, force?: boolean}} opts
 * @returns {{copied: string[], skipped: string[]}}
 */
function buildCodexSkills(claudeDir, destDir, opts = {}) {
  const stats = { copied: [], skipped: [] };

  const bySkill = new Map();
  for (const [commandRelPath, skillName] of COMMAND_TO_SKILL) {
    if (!bySkill.has(skillName)) bySkill.set(skillName, []);
    bySkill.get(skillName).push(commandRelPath);
  }

  for (const [skillName, commandRelPaths] of bySkill) {
    const merged = mergeOne(claudeDir, commandRelPaths, skillName);
    const outPath = path.join(destDir, skillName, "SKILL.md");
    writeOut(outPath, merged, opts, stats);
  }

  for (const skillName of STANDALONE_SKILLS) {
    const srcPath = path.join(claudeDir, "skills", skillName, "SKILL.md");
    const outPath = path.join(destDir, skillName, "SKILL.md");
    writeOut(outPath, fs.readFileSync(srcPath), opts, stats);
  }

  for (const commandRelPath of SKILLLESS_COMMANDS) {
    const slug = path.basename(commandRelPath, ".md");
    const rendered = renderSkillless(claudeDir, commandRelPath);
    const outPath = path.join(destDir, slug, "SKILL.md");
    writeOut(outPath, rendered, opts, stats);
  }

  return stats;
}

module.exports = { buildCodexSkills, COMMAND_TO_SKILL, STANDALONE_SKILLS, SKILLLESS_COMMANDS };
