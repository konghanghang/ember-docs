# Ember Public Docs

Ember 的公开用户文档站点。

这个仓库只保留面向普通用户的使用手册，不承载内部架构、开发规范、部署手册和历史方案文档。

## 本地开发

```bash
npm ci
npm run docs:dev
```

默认入口：

- 首页：`/`
- 第一次使用：`/getting-started`
- 用户功能说明：`/features/overview`

## 本地构建

```bash
npm run docs:build
npm run docs:preview
```

构建产物目录是 `.vitepress/dist`。

## GitHub Pages

仓库默认按 `https://<username>.github.io/<repository>/` 形式发布。

- 工作流会把 `VITEPRESS_BASE` 设置为 `/<repository>/`
- 如果后续改成自定义域名，需要把工作流里的 `VITEPRESS_BASE` 改成 `/`
- 仓库设置里要把 Pages 的 Source 设成 `GitHub Actions`
