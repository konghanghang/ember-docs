# 测试与验证

这一页只回答两件事：每改一类东西的最低验证命令是什么，什么时候必须再做手工测试。

## 何时看这份文档

- 你改了 API、Web、Bot，需要知道最低验证动作
- 你改了集成配置、鉴权、支付、Telegram，需要知道还要补哪些手工检查
- 你要决定是做「编译级验证」还是「完整手工回归」

## API 改动

```bash
cd services/api
go vet ./...
go test ./...
go build ./...
```

`go test ./...` 包含了单元测试与不依赖外部服务的集成测试。需要外部服务（Emby / Stripe / Telegram）的链路不会跑通，要靠手工测试覆盖。

也可以从仓库根目录用：

```bash
make test-api
```

## Web 改动

```bash
cd services/web
npm ci
npm run build
```

构建通过只代表 TypeScript 类型与构建产物没断；交互层正确性要靠：

```bash
npm run test           # 单元 + 组件测试
npm run test:unit
npm run test:component
```

或者：

```bash
make test-web
```

## Bot 改动

```bash
cd services/bot
pip install -r requirements.txt
python -m py_compile main.py
```

要跑测试：

```bash
python -m pytest tests
# 或 make test-bot
```

`py_compile` 只能保证语法；Telegram 命令、消息格式化、与 API Internal 的交互必须靠手工验证。

## 什么时候必须补手工测试

下列改动只跑编译不够：

- 登录、注册、兑换、账号状态流转
- 管理后台关键页面和设置保存
- Emby、TMDB、MoviePilot 集成
- Telegram 绑定、通知、Webhook
- 支付流程
- Docker Compose、环境变量、反向代理、部署脚本

详细的手工测试条目维护在主仓：

- [手工测试清单（主仓）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/manual-testing-checklist.md)

## 常见误区

- 文档改动不会触发主仓 CI 测试（`.github/workflows/test.yml` 对 `docs/**` 与 `*.md` 做了 `paths-ignore`）
- `go build ./...` 通过不代表 Emby、Telegram、支付链路真的可用
- 手工测试不是「把所有页面点一遍」，而是按变更范围跑对应清单
- 本地用 Compose 跑通也不代表生产能跑通；密钥、域名、Webhook URL、HTTPS 都是真实环境才暴露的差异

## 想看更细的测试入口

- [测试指南（主仓真相源）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/testing.md)
- [手工测试清单（主仓）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/manual-testing-checklist.md)
- [Stripe 支付测试指南（主仓）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/stripe-payment-testing.md)
- [Cloudflared 本地联调（主仓）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/cloudflared-local-testing.md)

## 相关文档

- [本地开发环境](./setup.md)
- [开发流程速览](./workflow.md)
- [贡献指南](../contributing.md)
- [测试指南（主仓）](https://github.com/konghanghang/ember/blob/master/docs/runbooks/testing.md)
