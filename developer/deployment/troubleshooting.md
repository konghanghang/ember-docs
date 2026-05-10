# 部署排障

这一页只列最高频的 5 个症状与第一步该看哪里。深入排障与备份恢复看主仓真相源。

## 先做最小检查

任何排障开始前先跑这几行，把现状看清楚：

```bash
cd ember/infrastructure/docker
docker compose ps
docker compose logs --tail=100 ember-api
curl http://localhost:8080/health
```

启用 Bot 时再加：

```bash
docker compose logs --tail=100 ember-bot
curl http://localhost:8000/health
```

报错抄清楚再继续。

## 1. 容器启动失败

最常见的原因是必填密钥没填。

检查：

- `.env` 里 `POSTGRES_PASSWORD` / `JWT_SECRET` / `CONFIG_ENCRYPTION_KEY` / `INTERNAL_API_SECRET` 是否都不为空且不是示例值
- `docker compose up` 报的具体错误（缺哪个变量会直接打到终端）

辅助：

```bash
docker compose config
```

## 2. API 不可达

`curl http://localhost:8080/health` 不返回 200。

检查：

- `docker compose ps` 里 `ember-api` 是不是 `Up`
- 看 API 日志有没有数据库连接错误：`docker compose logs --tail=200 ember-api`
- `[Migrate]` 前缀的行有没有 fail
- `JWT_SECRET` / `CONFIG_ENCRYPTION_KEY` 是否为空字符串

## 3. Web 打不开

`http://localhost` 502 或白屏。

检查：

- `docker compose ps` 里 `ember-web` 是不是 `Up`
- `ember-api` 是不是 `Up`（Web 容器内 nginx 反代到 API 容器，API 没起就会 502）
- `docker compose logs --tail=100 ember-web` 是否有 nginx 配置异常

## 4. Bot 不响应

Telegram 发命令没反应，或 API 推送的事件没到 Telegram。

检查：

- `docker compose ps` 里 `ember-bot` 是不是 `Up`（默认 profile 不启动 Bot，需要 `--profile bot`）
- `TELEGRAM_BOT_TOKEN` 是否填了
- `webhook` 模式下 `WEBHOOK_URL` 是不是真的公网可达 HTTPS
- `TELEGRAM_WEBHOOK_SECRET` 与 Telegram 侧设置是否一致
- `INTERNAL_API_SECRET` 在 API 与 Bot 两侧是否完全一致（不一致时所有 Bot 调 API、API 推 Bot 全部 401）

辅助：

```bash
docker compose logs --tail=200 ember-bot
curl http://localhost:8000/health
```

本地联调建议直接用 Cloudflared 起公网入口，不要在内网反复试，详见主仓 [Cloudflared 本地联调](https://github.com/konghanghang/ember/blob/master/docs/runbooks/cloudflared-local-testing.md)。

## 5. 数据库连接失败

API 日志反复刷数据库连接错误。

检查：

- `docker compose ps` 里 `postgres` 是不是 `healthy`
- 用了独立 PostgreSQL 时，`DATABASE_URL` 是否真的指向当前 DB，账号密码是否正确
- 数据库侧的 `pg_hba.conf` 是否允许当前连接

辅助：

```bash
docker compose logs postgres
docker compose exec postgres psql -U postgres -d ember -c '\dt'
```

## 想看更细的排障

本页只覆盖最常见的 5 个入口动作。完整排障表（备份与恢复、迁移失败、配置层错误、Stripe 测试、Cloudflared 联调、testing-troubleshooting 等）维护在主仓：

- [部署排障（主仓真相源）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/deployment-troubleshooting.md)
- [Cloudflared 本地联调（主仓）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/cloudflared-local-testing.md)
- [Stripe 支付测试指南（主仓）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/stripe-payment-testing.md)
- [测试排障（主仓）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/testing-troubleshooting.md)

## 何时停止排障，直接修配置

出现下面任一情况，就别继续看日志碰运气：

- `.env` 里仍有 `your-...` 这类占位值
- 依赖的外部地址（Emby / TMDB / MoviePilot）不可达
- 升级环境却没让 `ember-api` 跑过启动期 Migrate
- Webhook 地址写成了内网地址却想接公网回调

## 相关文档

- [Docker Compose 部署](./docker-compose.md)
- [配置参考](./configuration.md)
- [升级与迁移](./upgrade.md)
- [部署排障（主仓真相源）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/deployment-troubleshooting.md)
- [部署环境与配置（主仓）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/deployment-environment.md)
