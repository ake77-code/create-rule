import path from "node:path";
import mri from "mri";
import * as prompts from "@clack/prompts";
import colors from "picocolors";
import { writeFile } from "node:fs/promises";
import { existsSync } from "node:fs"
const {
  // blue,
  // blueBright,
  cyan,
  green,
  // greenBright,
  // magenta,
  // red,
  // redBright,
  // reset,
  yellow,
} = colors;

const argv = mri<{
  template?: string
  help?: boolean;
  overwrite?: boolean;
}>(process.argv.slice(2), {
  alias: { h: "help", t: 'template' },
  boolean: ["help", "overwrite"],
  string: ['template'],
});

const RULES_API_BASE_URL = 'https://cursor.directory/api'


// prettier-ignore
const helpMessage = `\
Usage: create-rule [OPTION]... [DIRECTORY]

创建一个新的 LLM Rules 配置文件。
无参数时，以交互模式启动 CLI。

Options:
  -t, --template NAME        use a specific template

选择编辑器:
${yellow('trae     trae')}
${green('cursor         cursor')}
${cyan('windsurf       windsurf')}
`

async function init() {
  const argTargetEditor = argv._[0]
    ? formatTargetEditor(String(argv._[0]))
    : undefined;
  const argTemplate = argv.template
  const argOverwrite = argv.overwrite;
  const help = argv.help;
  if (help) {
    console.log(helpMessage);
    return;
  }

  const cancel = () => prompts.cancel("操作被取消");
  let editor: 'trae' | 'cursor' | 'windsurf' | symbol
  // 1. 选择你要在什么编辑器下创造rules
  if (argTargetEditor === 'trae') {
    editor = 'trae'
  } else {
    editor = await prompts.select({
      message: "你要在什么编辑器下创造rule",
      options: [
        { value: "trae", label: "trae" },
        { value: "cursor", label: "cursor" },
        { value: "windsurf", label: "windsurf" },
      ],
    });
  }
  if (prompts.isCancel(editor)) return cancel()

  let template = argTemplate

  if (!template) {
    const templateResult = await prompts.text({
      message: "你要创建的rule",
      validate(value) {
        if (value.length === 0) return "rule名称不能为空";
        if (value.includes("/")) {
          return "rule名称不能包含 /";
        }
      },
    });
    if (prompts.isCancel(templateResult)) return cancel()
    template = templateResult
  }

  // 2. 选择你要创建的rules
  const slug = extractSlug(template);

  const fileContent = await getRule(slug);


  // Write the file
  const filePath = getEditorRustPath(editor, slug);

  if (existsSync(filePath)) {
    const overwrite = argOverwrite
      ? 'yes'
      : await prompts.select({
        message:
          `目标文件 "${filePath}"
           已经存在. 是否要继续:`,
        options: [
          {
            label: '取消操作',
            value: 'no',
          },
          {
            label: '覆盖文件',
            value: 'yes',
          },

        ],
      })
    if (prompts.isCancel(overwrite)) return cancel()
    switch (overwrite) {
      case 'yes':
        // emptyDir(targetDir)
        break
      case 'no':
        cancel()
        return
    }
  }

  await writeFile(filePath, fileContent);

  console.log(`成功保存规则到: ${filePath}`);
  //  if (prompts.isCancel(overwrite)) return cancel()
}

function getEditorRustPath(editor: 'trae' | 'cursor' | 'windsurf', slug: string): string {
  // 根据编辑器类型返回对应的规则文件路径
  switch (editor) {
    case 'trae':
      return path.join(process.cwd(), '.trae', 'rules', 'project_rules.md');
    case 'cursor':
      return path.join(process.cwd(), ".cursor", "rules", `${slug}.mdc`);;
    case 'windsurf':
      return path.join(process.cwd(), '.windsurfrules');
    default:
      throw new Error('不支持的编辑器类型');
  }
}

function formatTargetEditor(targetEditor: string) {
  return targetEditor.trim().replace(/\/+$/g, "");
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

async function getRule(slug: string) {
  const response = await fetch(`${RULES_API_BASE_URL}/${slug}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch from API: ${response.statusText}`);
  }
  const json = await response.json();
  const rule = json.data;
  if (!rule) {
    throw new Error(`未找到对应的规则: ${slug}`);
  }
  const fileContent = `---
  description: ${rule.title}
  globs:
  alwaysApply: false
  ---
  ${rule.content.trim()}`;

  return fileContent;
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
