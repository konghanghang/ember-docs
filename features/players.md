# 播放器推荐

这页不是为了证明“什么都能连”，而是帮你少走弯路：

你手上是什么设备，就先看对应平台下的主推荐。  
如果主推荐不适合你，再看备选。

## 先准备这三样东西

不管你用哪种播放器，通常都先准备好：

- 服务器地址
- 用户名
- 密码

服务器地址建议这样理解：

- 优先使用 `https`
- 端口使用 `443`
- 如果播放器把地址和端口拆开填写，就填 `https` + `443`
- 如果播放器只让你填一整条地址，就直接填站点给你的 `https` 地址

如果播放器能自动发现服务器，直接选中就行。  
如果发现不到，就改成手动添加，把上面三项填进去。

如果你还没找到服务器地址，先去控制台的 [概览](./dashboard.md)。  
当前版本里，服务器地址默认展示在 `概览`，不是旧文档里常说的“我的账号”。

## 不知道选哪个？直接按设备看

- 安卓：先看 `Yamby`
- iPhone / iPad / Apple TV / Mac：先看 `Infuse`，其次 `SenPlayer`
- 鸿蒙：先看 `HosPlayer`
- Windows：先看 `Hills Lite`
- 已经长期使用 Kodi：直接看 `Kodi / Emby for Kodi`
- 想尝试社区方案：看最后一节

## 安卓

### 主推荐：Yamby

适合：

- 想用更轻量一点的第三方客户端
- 更看重安卓端的 Emby 专用体验

下载：

- [Google Play 下载 Yamby](https://play.google.com/store/apps/details?id=com.hush.yamby)

推荐理由：

- 商店描述直接写明是第三方 Emby 客户端
- 支持手机和平板
- 更适合作为安卓端的默认第一选择

怎么添加服务器：

1. 安装并打开 `Yamby`
2. 选择添加服务器
3. 输入服务器地址，优先用 `https`
4. 如果客户端单独要求端口，填写 `443`
5. 输入用户名和密码
6. 完成后进入媒体库首页

配置截图：

![Yamby 配置示意](/assets/players/yamby-config.png)

填写时重点看两件事：

- 地址尽量用 `https`
- 端口用 `443`

### 备选：VidHub

适合：

- 想要界面更现代
- 想直接连 Emby
- 希望播放器能力更全

下载：

- [Google Play 下载 VidHub](https://play.google.com/store/apps/details?id=com.oumi.utility.media.hub)

推荐理由：

- 当前 Android 版已明确支持添加 `Emby / Jellyfin / Plex`
- 功能更全，适合作为 Yamby 之外的第二选择

怎么添加服务器：

1. 安装并打开 `VidHub`
2. 进入添加媒体服务器或添加媒体库的入口
3. 选择 `Emby`
4. 输入服务器地址
5. 输入用户名和密码
6. 保存后进入媒体库

## Apple 生态

这一组包括：

- iPhone
- iPad
- Apple TV
- Mac

### 主推荐：Infuse

适合：

- Apple 设备用户
- 更看重播放器稳定性、字幕和播放体验
- 想长期把播放器当主力用

下载：

- [App Store 下载 Infuse](https://apps.apple.com/us/app/infuse/id1136220934)

推荐理由：

- 在 Apple 平台里是最成熟的一档选择
- Firecore 官方文档明确支持把 Emby 当媒体服务器源接入
- 对 Apple 用户来说，通常是最稳的默认推荐

怎么添加服务器：

1. 安装并打开 `Infuse`
2. 进入 `Add Files` 或添加来源
3. 选择 `Emby`
4. 输入服务器地址，优先用 `https`
5. 如果客户端单独要求端口，填写 `443`
6. 输入用户名和密码
7. 完成后等待库同步

配置截图：

![Infuse 配置示意](/assets/players/infuse-config.jpeg)

填写时重点看两件事：

- 地址尽量用 `https`
- 端口用 `443`

### 主推荐：SenPlayer

适合：

- 想试试偏播放器型的 Apple 客户端
- 需要多服务器能力
- 想把它作为 Infuse 之外的第二主推荐

下载：

- [App Store 下载 SenPlayer](https://apps.apple.com/us/app/senplayer-media-player/id6443975850)

推荐理由：

- 明确支持 `Plex / Emby / Jellyfin / NAS`
- 覆盖 `iPhone / iPad / Mac / Apple TV`
- 现在更适合放在 Apple 生态的第二推荐位

怎么添加服务器：

1. 打开 `SenPlayer`
2. 进入媒体库或服务器管理入口
3. 选择 `Emby`
4. 输入服务器地址，优先用 `https`
5. 如果客户端单独要求端口，填写 `443`
6. 输入用户名和密码
7. 完成后进入媒体库

配置截图：

![SenPlayer 配置示意](/assets/players/senplayer-config.jpeg)

填写时也优先按这套来：

- 协议选 `https`
- 端口填 `443`

### 备选：VidHub

下载：

- [App Store 下载 VidHub](https://apps.apple.com/us/app/vidhub-video-library-player/id1659622164)

适合：

- 想要更直接的 Emby 媒体库体验
- 希望同时覆盖 iPhone / iPad / Mac / Apple TV
- 想要更灵活的播放控制

推荐理由：

- 商店页面明确写了支持直连 `Emby / Jellyfin / Plex`
- 平台覆盖完整：`iPhone / iPad / Mac / Apple TV`
- 适合作为 Infuse / SenPlayer 之外的第三选择

怎么添加服务器：

1. 安装并打开 `VidHub`
2. 进入添加服务器入口
3. 选择 `Emby`
4. 输入服务器地址
5. 输入用户名和密码
6. 进入媒体库开始使用

### 备选：Filebar

下载：

- [App Store 下载 Filebar](https://apps.apple.com/us/app/filebar-media-player/id1558391784)

适合：

- 想把本地文件、网盘和 Emby 放进一个 App 里管理

怎么添加服务器：

1. 打开 `Filebar`
2. 进入添加来源或服务器入口
3. 选择 `Emby`
4. 输入服务器地址、用户名和密码
5. 保存后开始使用

## Windows

### 主推荐：Hills Lite

适合：

- 想在 Windows 上直接用轻量客户端
- 想要简单接入，不折腾复杂媒体管理

配置截图：

![Hills Lite 配置示意](/assets/players/hills.png)

## 常见问题

### 自动发现不到服务器怎么办？

别反复重装，直接改走手动添加。  
大多数时候，手动输入服务器地址更快。

### 添加服务器时到底填什么？

通常就填三样：

- 服务器地址
- 用户名
- 密码

### Apple 设备先用哪个？

默认先试：

1. `Infuse`
2. `SenPlayer`

### 安卓先用哪个？

默认先试：

1. `Yamby`
2. `VidHub`

### Windows 先用哪个？

默认先试：

1. `Hills Lite`
2. `小幻影视`

## 相关文档

- [第一次使用](../getting-started.md)
- [概览](./dashboard.md)
- [FAQ](../faq.md)
