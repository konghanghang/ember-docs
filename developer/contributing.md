# 贡献指南

欢迎给 Ember 提 Issue 与 PR。这一页讲贡献流程的最小约束：在哪里报问题、怎么提建议、提 PR 时该注意什么、协议是什么。

## 先看这一步

提交前先确认：

- 已搜索 [现有 Issue](https://github.com/konghanghang/ember/issues?q=is%3Aissue) 没有重复
- 不确定是 bug 还是配置 / 用法问题：先去 [Discussions Q&A](https://github.com/konghanghang/ember/discussions/categories/q-a) 提问
- 还在想法阶段、不确定是否值得做：先去 [Discussions Ideas](https://github.com/konghanghang/ember/discussions/categories/ideas) 讨论
- 想报 bug 或贴日志：先脱敏，**不要贴 Token、密码、验证码、支付凭证、完整请求体**

## 你能贡献什么

不限于：

- Bug 修复
- 功能增强 / 新功能（建议先在 Discussions 讨论再开 PR，避免重复造轮子）
- 文档改进（主仓 `docs/` 或公开文档站 `ember-docs`）
- 翻译、测试、运维体验改进
- 部署样例、第三方集成示例

不收这些：

- 「可能如此」「未来会支持」类没有落地代码的设计稿
- 与 Ember 业务领域无关的纯粹改动
- 大量未拆分、相互无关改动堆在一个 PR 里的内容

## 报告 Bug

去主仓 [新建 Bug 报告](https://github.com/konghanghang/ember/issues/new?template=bug_report.yml)。模板会让你填：

- 涉及的功能场景（注册 / Emby 账号 / 兑换码 / 支付 / 求片订阅 / Bot 等）
- Ember 版本（镜像 tag、release tag 或 commit SHA）
- 部署方式（Docker Compose / 自建 / 其他）
- Emby 服务器版本（涉及 Emby 集成功能时）
- 复现步骤、期望行为、实际行为
- 操作系统 / 浏览器（涉及 Web 时）
- 相关日志（脱敏后）

模板见主仓 [`.github/ISSUE_TEMPLATE/bug_report.yml`](https://github.com/konghanghang/ember/blob/master/.github/ISSUE_TEMPLATE/bug_report.yml)。

## 提功能建议

去主仓 [新建功能建议](https://github.com/konghanghang/ember/issues/new?template=feature_request.yml)。模板会让你填：

- 涉及的功能场景
- 你在解决什么问题（具体场景，不是空泛的「如果有 X 就好了」）
- 期望行为 / 方案
- 替代方案
- 你愿不愿意提 PR 实现

模板见主仓 [`.github/ISSUE_TEMPLATE/feature_request.yml`](https://github.com/konghanghang/ember/blob/master/.github/ISSUE_TEMPLATE/feature_request.yml)。

## 提 PR 时要注意什么

PR 模板（[`PULL_REQUEST_TEMPLATE.md`](https://github.com/konghanghang/ember/blob/master/.github/PULL_REQUEST_TEMPLATE.md)）的核心要点：

1. **变更概述**：简述本 PR 主要做了什么；不写背景 / 评价 / 过程。
2. **关联 Issue**：例如 `Closes #123` / `Refs #456`；如无可写「无」。
3. **改动类型**：`feat` / `fix` / `refactor` / `perf` / `docs` / `test` / `chore` 等多选保留。
4. **受影响模块**：勾出 `services/api`、`services/web`、`services/bot`、`infrastructure/database`、部署、文档等。
5. **验证方式**：至少说明你做了什么验证。最低参考 [测试与验证](./development/testing.md)。
6. **数据库 Schema**：二选一勾出「不涉及」或「涉及，已在 `infrastructure/database/` 提供 forward-only SQL（命名 `YYYYMMDD_NN_<description>.sql`）」。
7. **文档同步**：勾出已同步的文档；改了用户可见或部署相关的内容时，记得也同步公开文档站 `ember-docs`。
8. **提交拆分**：一个 commit 一个主题；多个独立点拆多个 commit。

不熟悉这些约束时，可以在 PR 评论里说明，maintainer 会协助拆分。

## 协议

Ember 基于 **Apache License 2.0** 开源。

你可以做的：

- 自由使用、复制、修改、再发布
- 用于个人 / 商业项目
- 私有部署或闭源衍生

你需要保留的：

- 原版权声明与许可声明
- 在显著修改的文件中标记你做了哪些修改
- 不使用 Ember 项目的名称、logo 或商标做未经授权的背书

完整协议条款见主仓 [`LICENSE`](https://github.com/konghanghang/ember/blob/master/LICENSE)。

## 主仓与公开文档站的边界

- 代码、内部架构 / 治理 / 排障文档：在主仓 [`konghanghang/ember`](https://github.com/konghanghang/ember)
- 用户使用手册、开发者部署 / 贡献入口：在公开文档站 [`konghanghang/ember-docs`](https://github.com/konghanghang/ember-docs)
- 改了用户可见行为或部署链路：两边都要同步

## 相关文档

- [本地开发环境](./development/setup.md)
- [开发流程速览](./development/workflow.md)
- [测试与验证](./development/testing.md)
- [Bug 报告模板（主仓）](https://github.com/konghanghang/ember/blob/master/.github/ISSUE_TEMPLATE/bug_report.yml)
- [功能建议模板（主仓）](https://github.com/konghanghang/ember/blob/master/.github/ISSUE_TEMPLATE/feature_request.yml)
- [PR 模板（主仓）](https://github.com/konghanghang/ember/blob/master/.github/PULL_REQUEST_TEMPLATE.md)
- [LICENSE（主仓）](https://github.com/konghanghang/ember/blob/master/LICENSE)
