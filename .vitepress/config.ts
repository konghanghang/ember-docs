import { defineConfig } from 'vitepress'

const base = process.env.VITEPRESS_BASE || '/'

const userSidebar = [
  {
    text: '开始',
    items: [
      { text: '首页', link: '/' },
      { text: '第一次使用', link: '/getting-started' }
    ]
  },
  {
    text: '播放器推荐',
    items: [
      { text: '播放器推荐', link: '/features/players' }
    ]
  },
  {
    text: '控制台功能',
    items: [
      { text: '功能地图', link: '/features/overview' },
      { text: '控制台总览', link: '/features/user-console' },
      { text: '概览', link: '/features/dashboard' },
      { text: '账号中心', link: '/features/account-center' },
      { text: '我的画像', link: '/features/profile-analytics' },
      { text: '登录、注册与找回密码', link: '/features/account-access' },
      { text: '订阅管理', link: '/features/subscriptions' },
      { text: '播放排行榜', link: '/features/rankings' },
      { text: '媒体库', link: '/features/library' },
      { text: '追剧日历', link: '/features/tv-calendar' },
      { text: '续费中心', link: '/features/payments' },
      { text: 'Telegram Bot', link: '/features/telegram-bot' }
    ]
  },
  {
    text: '帮助',
    items: [
      { text: '社群与通知', link: '/community' },
      { text: '常见问题', link: '/faq' },
      { text: '更新记录', link: '/changelog' }
    ]
  }
]

const developerSidebar = [
  {
    text: '入门',
    items: [
      { text: '开发者总入口', link: '/developer/' },
      { text: '架构总览', link: '/developer/architecture/overview' }
    ]
  },
  {
    text: '架构',
    items: [
      { text: '架构总览', link: '/developer/architecture/overview' },
      { text: '服务边界', link: '/developer/architecture/services' },
      { text: '外部集成', link: '/developer/architecture/integrations' },
      { text: '仓库地图与技术栈', link: '/developer/architecture/repo-map' }
    ]
  },
  {
    text: '部署',
    items: [
      { text: 'Docker Compose 部署', link: '/developer/deployment/docker-compose' },
      { text: '配置参考', link: '/developer/deployment/configuration' },
      { text: '升级与迁移', link: '/developer/deployment/upgrade' },
      { text: '部署排障', link: '/developer/deployment/troubleshooting' }
    ]
  },
  {
    text: '开发',
    items: [
      { text: '本地开发环境', link: '/developer/development/setup' },
      { text: '开发流程速览', link: '/developer/development/workflow' },
      { text: '测试与验证', link: '/developer/development/testing' }
    ]
  },
  {
    text: '贡献与协议',
    items: [
      { text: '贡献指南', link: '/developer/contributing' }
    ]
  }
]

export default defineConfig({
  title: 'Ember Docs',
  description: 'Ember 公开文档站，覆盖用户使用与开发者部署/贡献两个入口',
  base,
  cleanUrls: true,
  lang: 'zh-CN',
  lastUpdated: true,
  themeConfig: {
    nav: [
      {
        text: '用户指南',
        items: [
          { text: '第一次使用', link: '/getting-started' },
          { text: '功能地图', link: '/features/overview' },
          { text: '播放器推荐', link: '/features/players' },
          { text: 'Telegram Bot', link: '/features/telegram-bot' }
        ]
      },
      {
        text: '开发者指南',
        items: [
          { text: '总入口', link: '/developer/' },
          { text: '架构总览', link: '/developer/architecture/overview' },
          { text: 'Docker Compose 部署', link: '/developer/deployment/docker-compose' },
          { text: '本地开发', link: '/developer/development/setup' },
          { text: '贡献指南', link: '/developer/contributing' }
        ]
      },
      { text: 'FAQ', link: '/faq' },
      { text: 'GitHub', link: 'https://github.com/konghanghang/ember' }
    ],
    sidebar: {
      '/getting-started': userSidebar,
      '/features/': userSidebar,
      '/community': userSidebar,
      '/faq': userSidebar,
      '/changelog': userSidebar,
      '/developer/': developerSidebar
    },
    footer: {
      message: '公开文档站，覆盖用户使用与开发者部署/贡献',
      copyright: 'Ember'
    }
  }
})
