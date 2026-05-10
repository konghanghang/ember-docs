# 开发者指南

这一组文档不面向普通用户，只回答三件事：

- 怎么把 Ember 部署起来
- Ember 由哪些服务、哪些外部集成构成
- 你想给 Ember 提 PR 时该看什么

如果你是普通用户、只想学会怎么用网站，请回到 [用户指南](../).

## 你想做什么

- 想 5 步把站点跑起来：看 [Docker Compose 部署](./deployment/docker-compose.md)
- 想理解 Ember 的服务结构：看 [架构总览](./architecture/overview.md)
- 想理解每个服务的职责：看 [服务边界](./architecture/services.md)
- 想知道 Ember 接了哪些外部系统：看 [外部集成](./architecture/integrations.md)
- 想本地拉起完整开发栈：看 [本地开发环境](./development/setup.md)
- 想给 Ember 提 PR：看 [贡献指南](./contributing.md)

## 部署一遍

按这个顺序看，最快上手：

1. [架构总览](./architecture/overview.md)
2. [Docker Compose 部署](./deployment/docker-compose.md)
3. [配置参考](./deployment/configuration.md)
4. [部署排障](./deployment/troubleshooting.md)

## 理解架构

按这个顺序看，5 分钟读懂 Ember：

1. [架构总览](./architecture/overview.md)
2. [服务边界](./architecture/services.md)
3. [外部集成](./architecture/integrations.md)
4. [仓库地图与技术栈](./architecture/repo-map.md)

## 本地开发

按这个顺序看：

1. [本地开发环境](./development/setup.md)
2. [开发流程速览](./development/workflow.md)
3. [测试与验证](./development/testing.md)

## 贡献代码

提 PR 前看：

- [贡献指南](./contributing.md)

## 这套文档不覆盖什么

- 完整的环境变量字典 / API 端点目录 / 数据模型字段表：去主仓 [`docs/reference/`](https://github.com/konghanghang/ember/tree/master/docs/reference)
- 内部治理（多 Agent 协作、归档治理、发布流程）：不公开维护
- 内部排障 case（database-*、stripe-payment-testing、cloudflared-local-testing 等）：去主仓 [`docs/runbooks/`](https://github.com/konghanghang/ember/tree/master/docs/runbooks)
- 设计草稿、提案、归档：去主仓 [`docs/{plan,proposals,archive}`](https://github.com/konghanghang/ember/tree/master/docs)

## 相关文档

- [Ember 主仓](https://github.com/konghanghang/ember)
- [系统架构（主仓真相源）](https://github.com/konghanghang/ember/blob/master/docs/system-architecture.md)
- [部署指南（主仓）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/deployment.md)
- [文档中心（主仓）](https://github.com/konghanghang/ember/blob/master/docs/README.md)
