[English Version](./README.md)

# llm-rules-cli

## 项目简介
llm-rules-cli 是一个命令行工具，用于从远程规则库下载并安装规则文件到本地编辑器，支持 Trae、Cursor、Windsurf 主流编辑器，帮助开发者快速集成和管理 LLM 相关规则。

## 安装方法

1. 克隆仓库或直接下载：
```bash
git clone <repo-url>
cd llm-rules-cli
```
2. 安装依赖：
```bash
npm install
```
3. 构建（可选）：
```bash
npm run build
```

## 使用说明

### 基本用法
```bash
npx llm-rules
# 或
npm link # 全局安装后
llm-rules
```

### 命令参数
- `-t, --template NAME` 指定规则模板名称或 URL
- `--overwrite` 覆盖已存在的规则文件
- `-h, --help` 显示帮助信息

### 编辑器规则文件保存路径
- **Trae**: `.trae/rules/project_rules.md`
- **Cursor**: `.cursor/rules/<slug>.mdc`
- **Windsurf**: `.windsurfrules`

规则文件会根据所选编辑器自动保存到对应路径。

### 交互流程
1. 选择目标编辑器（trae/cursor/windsurf）
2. 输入或选择规则模板名称（slug 或 URL）
3. 工具自动下载规则内容并保存到本地指定路径

### 示例
```bash
llm-rules trae my-rule-slug
llm-rules --template https://cursor.directory/api/my-rule-slug
```

## 依赖说明
- Node.js 16+
- 主要依赖：@clack/prompts、mri、picocolors、node-fetch、fs-extra、unbuild 等

## 贡献指南
欢迎提交 issue 和 PR，完善规则模板与 CLI 功能。

## License
MIT