[GitHub 仓库地址](https://github.com/your-username/create-rule)

[English Version Documentation](https://github.com/ake77-code/create-rule/blob/main/README.md)

# create-rule

## 项目简介
create-rule 是一款为开发者设计的命令行工具，可高效下载并集成 LLM 相关规则到主流本地编辑器（Trae、Cursor、Windsurf），简化规则管理，提升 AI 项目工作流效率。

**规则来源**：当前所有规则内容均来源于 [https://cursor.directory/rules](https://cursor.directory/rules)

## 功能说明
| 模块               | 描述                                                         |
|--------------------|--------------------------------------------------------------|
| 规则下载           | 支持通过模板名或 URL 下载远程规则                             |
| 多编辑器适配       | 自动检测并支持 Trae、Cursor、Windsurf 编辑器                  |
| 路径自动保存       | 自动将规则文件保存到各编辑器标准路径                          |
| 覆盖与交互体验     | 支持覆盖已有文件，提供交互式 CLI 体验                         |
| CLI 选项丰富       | 丰富的命令行选项，灵活管理规则                                |

## 安装与使用方法

### 安装步骤
1. 克隆仓库或直接下载：
```bash
git clone <repo-url>
cd create-rule
```
2. 安装依赖：
```bash
npm install
```
3. 构建（可选）：
```bash
npm run build
```

### 快速开始
- 直接运行（无需全局安装）：
```bash
npx create-rule
```
- 全局安装后运行：
```bash
npm link
create-rule
```

### 常用命令选项
| 选项                    | 说明                           |
|-------------------------|--------------------------------|
| -t, --template NAME     | 指定规则模板名或 URL           |
| --overwrite             | 覆盖已存在的规则文件           |
| -h, --help              | 显示帮助信息                   |

### 编辑器规则文件保存路径
| 编辑器   | 路径                                   |
|----------|----------------------------------------|
| Trae     | .trae/rules/project_rules.md           |
| Cursor   | .cursor/rules/<slug>.mdc               |
| Windsurf | .windsurfrules                         |

### 交互流程
1. 选择目标编辑器（trae/cursor/windsurf）
2. 输入或选择规则模板名（slug 或 URL）
3. 工具自动下载规则内容并保存到指定本地路径

### 示例
```bash
create-rule trae my-rule-slug
create-rule --template https://cursor.directory/api/my-rule-slug
```

## 常见问题与注意事项
- 请确保 Node.js 版本为 16 及以上。
- 规则模板名需与远程仓库一致或使用有效 URL。
- 使用 --overwrite 可覆盖目标路径下的已有规则文件。
- 若因网络问题下载失败，请检查网络连接或重试。

## 依赖说明
- Node.js 16+
- 主要依赖：@clack/prompts、mri、picocolors、node-fetch、fs-extra、unbuild 等。

## 贡献指南
欢迎通过 issue 或 PR 参与贡献，包括但不限于：
- 新增或优化规则模板
- 改进 CLI 功能与用户体验
- 修复 bug 或完善文档

贡献流程：
1. Fork 本仓库并创建新分支
2. 提交更改并发起 Pull Request
3. 等待维护者审核合并

## 联系与支持信息
- 问题与建议请通过 GitHub Issues 提交
- 更多信息请访问项目主页或文档中心

## 许可证
MIT