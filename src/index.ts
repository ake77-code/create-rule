import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import spawn from "cross-spawn";
import mri from "mri";
import * as prompts from "@clack/prompts";
import colors from "picocolors";

const {
  blue,
  blueBright,
  cyan,
  green,
  greenBright,
  magenta,
  red,
  redBright,
  reset,
  yellow,
} = colors;

const argv = mri<{
  help?: boolean;
  overwrite?: boolean;
}>(process.argv.slice(2), {
  alias: { h: "help" },
  boolean: ["help", "overwrite"],
});

const cwd = process.cwd();

// prettier-ignore
const helpMessage = `\
Usage: create-vite [OPTION]... [DIRECTORY]

Create a new Vite project in JavaScript or TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template

Available templates:
${yellow    ('vanilla-ts     vanilla'  )}
${green     ('vue-ts         vue'      )}
${cyan      ('react-ts       react'    )}
${cyan      ('react-swc-ts   react-swc')}
${magenta   ('preact-ts      preact'   )}
${redBright ('lit-ts         lit'      )}
${red       ('svelte-ts      svelte'   )}
${blue      ('solid-ts       solid'    )}
${blueBright('qwik-ts        qwik'     )}`

async function init() {
  const argTargetDir = argv._[0]
    ? formatTargetDir(String(argv._[0]))
    : undefined;
  const argOverwrite = argv.overwrite;

  const help = argv.help;
  if (help) {
    console.log(helpMessage);
    return;
  }
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const cancel = () => prompts.cancel("Operation cancelled");

  // 1. 选择你要在什么编辑器下创造rules
  const editor = await prompts.select({
    message: "选择你要在什么编辑器下创造rule",
    options: [
      { value: "trae", label: "trae" },
      { value: "cursor", label: "cursor" },
      { value: "windsurf", label: "windsurf" },
    ],
  });
  if (prompts.isCancel(editor)) return cancel()
  const rule = await getRule("python-testing-generator");
  console.log(editor);
  //  if (prompts.isCancel(overwrite)) return cancel()
}

function formatTargetDir(targetDir: string) {
  return targetDir.trim().replace(/\/+$/g, "");
}

interface PkgInfo {
  name: string;
  version: string;
}

function pkgFromUserAgent(userAgent: string | undefined): PkgInfo | undefined {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

async function getRule(input: string) {
  const slug = extractSlug(input);
  console.log(slug);
  const response = await fetch(`https://cursor.directory/api/${slug}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch from API: ${response.statusText}`);
  }

  const json = await response.json();
  const rule = json.data;
  if (!rule) {
    throw new Error(`No rule found with slug: ${slug}`);
  }
  return rule;
}

function extractSlug(input: string) {
  // Check if input is a URL
  if (input.startsWith("http://") || input.startsWith("https://")) {
    // Extract the slug from the URL (everything after the last slash)
    const urlParts = input.split("/");
    return urlParts[urlParts.length - 1];
  }
  return input;
}

init().catch((e) => {
  console.error(e);
});
