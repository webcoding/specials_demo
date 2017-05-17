
import layout from '../pages/layout'
import tag from '../pages/tag'
import svg from '../pages/svg'
import bookmark from '../pages/bookmark'
import explore from '../pages/explore'
import docs from '../pages/docs'
import read from '../pages/read'
import help from '../pages/help'
import changelog from '../pages/changelog'
import about from '../pages/about'
import dev from '../pages/dev'
import bookmarkAdd from '../pages/bookmark-add'

// 别名与跳转
// 暂时用别名 后期如为归纳统一路径 则使用跳转比别名好
const pages = [
  {
    path: '/explore',
    name: 'explore',
    component: explore,
  },
  {
    path: '/read',
    name: 'read',
    component: read,
  },
  {
    path: '/bookmark',
    name: 'bookmark',
    component: bookmark,
    alias: ['/bookmarks', 'b'],
  },
  {
    path: '/docs',
    name: 'docs',
    component: docs,
    alias: '/doc',
  },
  {
    path: '/changelog',
    name: 'changelog',
    component: changelog,
  },
  {
    path: '/help',
    name: 'help',
    component: help,
  },
  {
    path: '/about',
    name: 'about',
    component: about,
  },
  {
    path: '/dev',
    name: 'dev',
    component: dev,
  },
]

const bookmarkPages = [
  {
    path: '/',
    // 使用默认子路由，则父路由的 name 就得去掉
    // 否则使用 `:to="{name: 'demo'"` 会导致默认子路由不会render
    name: '',
    component: layout,
    children: [
      {
        path: '/',
        name: 'bookmarks',
        component: bookmark,
      },
      {
        path: '/tag',
        name: 'tag',
        component: tag,
        alias: ['/tags', '/t'],
      },
      {
        path: '/svg',
        name: 'svg',
        component: svg,
      },
    ].concat(pages),
  },
  {
    path: '/bookmark/add',
    name: 'bookmark-add',
    meta: {
      requiresAuth: true,
    },
    component: bookmarkAdd,
  },
]

export default bookmarkPages
