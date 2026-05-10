# Ember Public Docs

Ember 的公开文档站点，覆盖用户使用与开发者部署/贡献两个入口。

- 用户指南：面向普通用户的使用手册
- 开发者指南：面向开源使用者、部署者、贡献者的精简公开文档

主仓真相源仍是 [`konghanghang/ember`](https://github.com/konghanghang/ember)。本仓只承载公开表达，不承载内部架构、内部排障、内部治理与历史方案文档。

## 本地开发

```bash
npm ci
npm run docs:dev
```

默认入口：

- 首页：`/`
- 第一次使用（用户）：`/getting-started`
- 用户功能说明：`/features/overview`
- 开发者总入口：`/developer/`
- Docker Compose 部署：`/developer/deployment/docker-compose`
- 贡献指南：`/developer/contributing`

## 本地构建

```bash
npm run docs:build
npm run docs:preview
```

构建产物目录是 `.vitepress/dist`。

## GitHub Pages

当前按自定义域名发布，静态资源基路径使用 `/`。

- 工作流会把 `VITEPRESS_BASE` 设置为 `/`
- 如果后续改回 `https://<username>.github.io/<repository>/` 形式发布，需要把工作流里的 `VITEPRESS_BASE` 改成 `/<repository>/`
- 仓库设置里要把 Pages 的 Source 设成 `GitHub Actions`
