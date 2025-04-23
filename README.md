[中文版说明](./README.zh.md)

# llm-rules-cli

## Project Overview
llm-rules-cli is a command-line tool for downloading and installing rule files from a remote rule repository to your local editor. It supports mainstream editors such as Trae, Cursor, and Windsurf, helping developers quickly integrate and manage LLM-related rules.

## Installation

1. Clone the repository or download directly:
```bash
git clone <repo-url>
cd llm-rules-cli
```
2. Install dependencies:
```bash
npm install
```
3. Build (optional):
```bash
npm run build
```

## Usage

### Basic Usage
```bash
npx llm-rules
# Or
npm link # After global installation
llm-rules
```

### Command Options
- `-t, --template NAME` Specify the rule template name or URL
- `--overwrite` Overwrite existing rule files
- `-h, --help` Show help information

### Editor Rule File Save Paths
- **Trae**: `.trae/rules/project_rules.md`
- **Cursor**: `.cursor/rules/<slug>.mdc`
- **Windsurf**: `.windsurfrules`

The rule file will be automatically saved to the corresponding path based on the selected editor.

### Interactive Flow
1. Select the target editor (trae/cursor/windsurf)
2. Enter or select the rule template name (slug or URL)
3. The tool automatically downloads the rule content and saves it to the specified local path

### Example
```bash
llm-rules trae my-rule-slug
llm-rules --template https://cursor.directory/api/my-rule-slug
```

## Dependencies
- Node.js 16+
- Main dependencies: @clack/prompts, mri, picocolors, node-fetch, fs-extra, unbuild, etc.

## Contribution Guide
Contributions are welcome! Please submit issues and PRs to improve rule templates and CLI features.

## License
MIT