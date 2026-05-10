# 升级与迁移

这一页只回答两件事：怎么升级，迁移失败了怎么办。

## 升级最小路径

```bash
cd ember/infrastructure/docker
docker compose pull
docker compose up -d
```

启用 Bot 时：

```bash
docker compose pull
docker compose --profile bot up -d
```

不需要任何手工 SQL。`ember-api` 启动期会自动应用未应用的迁移。

## 数据库迁移如何工作

Ember 自 v1.4 起把数据库 schema 演进收敛到「`ember-api` 启动期内嵌迁移」一条路径：

- 真相源：主仓 [`infrastructure/database/`](https://github.com/konghanghang/ember/tree/master/infrastructure/database) 下的顶层 SQL 文件，按字典序 forward-only 排序
- 启动序列：`InitDB → Migrate → VerifySchema → Bootstrap → Start`
- `Migrate` 阶段通过 `pg_advisory_lock` 串行化、`schema_migrations` 表记账，已应用的不重复执行
- `VerifySchema` 兜底校验：表 / 关键列 / 关键索引三层缺一就 fail-fast
- 日志带 `[Migrate]` 前缀，失败时容器进 restart loop

两条分支：

- **新空库**：业务核心表不存在 + `schema_migrations` 为空 → 按字典序跑全部 SQL 完成初始化
- **已有库**：直接 `pull && up -d` → 自动应用未应用 SQL

镜像是只读的：**不要 `docker exec` 进容器删 SQL 文件、不要修改原文件**（这会破坏 checksum）。

完整说明见主仓 [`infrastructure/database/README.md`](https://github.com/konghanghang/ember/blob/master/infrastructure/database/README.md) 的「自动迁移与 schema_migrations」章节。

## 如果迁移失败

容器进 restart loop 时，先看 API 日志：

```bash
docker compose logs --tail=200 ember-api
```

带 `[Migrate]` 前缀的行会直接告诉你失败的 SQL 文件名。常见原因：

- 数据库里有不符合 migration 预期的脏数据（migration 内置 `RAISE EXCEPTION` 预检并附排查 SQL）
- 上一次升级某条 SQL 没跑成功，留下中间态
- PostgreSQL 版本不兼容

不要走偏：

- **不要**手工进容器改 SQL 文件
- **不要**手工 `INSERT INTO schema_migrations` 跳过失败项
- **不要**直接 `docker compose down -v`（这会删数据卷）

正路：

1. 看清楚失败的 SQL 文件名与报错
2. 按 forward-only 原则在主仓追加一条新的 SQL 抵消错误效果（不修改原文件）
3. 重新构建并推送镜像 → `docker compose pull && up -d` 恢复

更细的步骤与 v1.3.1 → v1.4.0 历史升级期的脏数据自查表见主仓 [部署环境与配置](https://github.com/konghanghang/ember/blob/master/docs/runbooks/deployment-environment.md) 的「数据库迁移策略」章节。

## 回滚思路

Ember 的迁移是 forward-only：

- 没有「downgrade」脚本
- 数据库无法回滚到旧 schema
- 但镜像版本可以回退：在 `.env` 显式钉住旧版镜像 tag，再 `docker compose up -d`

如果旧版 API 拒绝在新 schema 上启动（比如校验失败），唯一可行的方案是从备份恢复数据库。备份方法见主仓 [部署排障](https://github.com/konghanghang/ember/blob/master/docs/runbooks/deployment-troubleshooting.md) 的「备份与恢复」章节。

生产部署前请先做一次完整的数据库备份。

## 升级前自检

- 已备份 PostgreSQL 数据
- 已查看主仓 [Releases](https://github.com/konghanghang/ember/releases) 看本次升级是否有破坏性变更说明
- 已确认 `.env` 里的密钥没被替换（特别是 `JWT_SECRET` 和 `CONFIG_ENCRYPTION_KEY`，换值会导致登录态失效或敏感配置无法解密）

## 相关文档

- [Docker Compose 部署](./docker-compose.md)
- [配置参考](./configuration.md)
- [部署排障](./troubleshooting.md)
- [部署指南（主仓真相源）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/deployment.md)
- [部署环境与配置（主仓）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/deployment-environment.md)
- [数据库迁移说明（主仓）](https://github.com/konghanghang/ember/blob/master/infrastructure/database/README.md)
