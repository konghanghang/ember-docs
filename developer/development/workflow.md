# 开发流程速览

这一页只列协作时的最小约定：分支、提交、文档同步、常用命令。它不是完整的项目治理手册。

## 分支与提交

- 默认分支：`master`
- 功能 / 修复 / 重构走独立 feature 分支，命名建议形式：`feat/xxx`、`fix/xxx`、`refactor/xxx`、`docs/xxx`
- 一个提交只表达一个主功能 / 一个主修复 / 一个主重构。多个独立点拆成多个 commit，每个都能被独立 review、独立回滚、独立 cherry-pick。
- 无关改动（格式化、重命名、文档归档）单独提交。
- 提交信息使用中文，保持简短明确。常见形式：
  - `feat: 中文主题`
  - `fix: 中文主题`
  - `refactor: 中文主题`
  - `docs: 中文主题`
  - 在仓库内可选用作用域，如 `feat(api): xxx`、`fix(web): xxx`、`docs(bot): xxx`

提交格式参考 PR 模板的「提交拆分」部分：[`PULL_REQUEST_TEMPLATE.md`](https://github.com/konghanghang/ember/blob/master/.github/PULL_REQUEST_TEMPLATE.md)。

## 提交前最小要求

按你改的范围跑对应最小验证（更细见 [测试与验证](./testing.md)）：

| 改动范围 | 最小验证 |
|----------|----------|
| API（Go） | `cd services/api && go vet ./... && go test ./... && go build ./...` |
| Web（Vue） | `cd services/web && npm ci && npm run build` |
| Bot（Python） | `cd services/bot && pip install -r requirements.txt && python -m py_compile main.py` |
| 数据库 schema | 在 `infrastructure/database/` 加一条 forward-only SQL，命名 `YYYYMMDD_NN_<description>.sql`；并起 `ember-api` 跑一次启动期 Migrate 验证 |
| 部署 / Compose | 本地 `docker compose up -d` 起一遍全栈，过最小冒烟 |
| 文档 | 链接 / 路径一致性检查 |

## 常用 make 命令

最常用的 5 个：

```bash
make help        # 看完整 target 列表
make setup       # 装三服务依赖
make dev-api     # 起 API
make dev-web     # 起 Web
make test        # 跑全部测试
```

完整列表见 [本地开发环境](./setup.md) 的「常用 make 命令速查」节。

## 文档同步原则

- 改了 API 公开行为：同步 `docs/system-architecture.md`
- 改了 Web 视觉规范 / 信息架构：同步 `docs/reference/web-design-guide.md` / `docs/reference/web-information-architecture.md`
- 改了配置项 / 环境变量：同步 `docs/reference/configuration-reference.md` 与 `infrastructure/docker/.env.example`
- 改了部署链路 / Compose / 迁移：同步 `docs/runbooks/deployment.md` / `docs/runbooks/deployment-environment.md`

PR 模板里有「文档同步」勾选项，提交时按实际情况勾。

## 关于 ember-docs（公开文档站）

`konghanghang/ember-docs` 是 Ember 的公开文档站，承载用户使用与开发者部署/贡献两个入口。它不是主仓 `docs/` 的镜像。

- 不要把主仓 `docs/{archive,plan,proposals,reference,runbooks}` 下的文件原样搬到公开文档站
- 主仓有用户可见 / 部署相关的变化时，去 `ember-docs` 同步对应页面（用户指南 / 开发者指南）
- 公开文档站里的开发者页面只承担「精选公开版」，深度细节继续指回主仓 GitHub URL

## 相关文档

- [本地开发环境](./setup.md)
- [测试与验证](./testing.md)
- [贡献指南](../contributing.md)
- [PR 模板（主仓）](https://github.com/konghanghang/ember/blob/master/.github/PULL_REQUEST_TEMPLATE.md)
- [项目治理经验（主仓）](https://github.com/konghanghang/ember/blob/master/docs/reference/project-governance-guide.md)
- [Makefile（主仓）](https://github.com/konghanghang/ember/blob/master/Makefile)
