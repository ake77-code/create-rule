[GitHub 仓库地址](https://github.com/ake77-code/create-rule)

[中文版说明](https://github.com/ake77-code/create-rule/blob/main/README.zh.md)

# create-rule

## Project Overview
create-rule is a command-line tool designed for developers to efficiently download and integrate LLM-related rules from remote repositories into mainstream local editors (Trae, Cursor, Windsurf). This tool streamlines rule management and simplifies AI project workflows.

## Features
| Module             | Description                                                      |
|--------------------|-----------------------------------------------------------------|
| Rule Download      | Download remote rules by template name or URL                    |
| Multi-Editor Adapt | Auto-detect and support Trae, Cursor, Windsurf editors           |
| Path Auto-Save     | Automatically save rule files to standard paths for each editor   |
| Overwrite & CLI UX | Support overwriting existing files, interactive CLI experience    |
| CLI Options        | Rich command-line options for flexible rule management            |

## Installation & Usage

### Installation Steps
1. Clone the repository or download directly:
```bash
git clone <repo-url>
cd create-rule
```
2. Install dependencies:
```bash
npm install
```
3. Build (optional):
```bash
npm run build
```

### Quick Start
- Run directly (no global install needed):
```bash
npx create-rule
```
- After global install:
```bash
npm link
llm-rules
```

### Common Command Options
| Option                | Description                        |
|-----------------------|------------------------------------|
| -t, --template NAME   | Specify rule template name or URL   |
| --overwrite           | Overwrite existing rule files       |
| -h, --help            | Show help information               |

### Editor Rule File Save Paths
| Editor   | Path                                 |
|----------|--------------------------------------|
| Trae     | .trae/rules/project_rules.md         |
| Cursor   | .cursor/rules/<slug>.mdc             |
| Windsurf | .windsurfrules                       |

### Interactive Flow
1. Select the target editor (trae/cursor/windsurf)
2. Enter or select the rule template name (slug or URL)
3. The tool automatically downloads the rule content and saves it to the specified local path

### Example
```bash
llm-rules trae my-rule-slug
llm-rules --template https://cursor.directory/api/my-rule-slug
```

## FAQ & Notes
- Ensure Node.js version is 16 or above.
- Rule template names must match the remote repository or use a valid URL.
- Use --overwrite to replace existing rule files at the target path.
- If download fails due to network issues, please check your connection or retry.

## Dependencies
- Node.js 16+
- Main dependencies: @clack/prompts, mri, picocolors, node-fetch, fs-extra, unbuild, etc.

## Contribution Guide
Contributions are welcome via issues or PRs, including but not limited to:
- Adding or optimizing rule templates
- Improving CLI features and user experience
- Bug fixes or documentation improvements

Contribution Process:
1. Fork the repository and create a new branch
2. Commit your changes and submit a Pull Request
3. Wait for maintainer review and merge

## Contact & Support
- For issues and suggestions, please submit via GitHub Issues
- Email support: support@example.com
- For more information, visit the project homepage or documentation center

## License
MIT