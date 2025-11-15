import Router from 'koa-router'
import fs from 'node:fs'
import path from 'node:path'
import { error } from "./utils/log4j"
import { generateNormalPost } from '@/utils/index'

// import Mock from '@/utils/index'

import vue3AdminRoute from '@/route/vue3-admin'
import reactSchedule from '@/route/react-schedule'

const router = new Router()
// const mock = new Mock()

// 匹配所有get路由
// router.get('/', async (ctx) => {
//   ctx.body = 'allMock服务器'
// })

// 例子，匹配了所有路由
// router.post(/./, async (ctx) => {
//   const res = await mock.mockData(ctx.request)
//   ctx.body = res
// })

// 以/vue3-admin开头的路由都被vue3AdminRoute处理
router.use(
  '/vue3-admin',
  vue3AdminRoute.routes(),
  vue3AdminRoute.allowedMethods(),
)

router.use(
  '/react-schedule',
  reactSchedule.routes(),
  reactSchedule.allowedMethods(),
)


let allMockFolders = []
try {
  // 排除掉vue3-admin和react-schedule这两个示例项目名
  allMockFolders = fs.readdirSync(path.resolve(__dirname, `../mocks`)).filter(name => name !== 'vue3-admin' && name !== 'react-schedule')
  allMockFolders.forEach((name) => {
    const subRouter = new Router()
    generateNormalPost(name, subRouter)
    router.use(
      `/${name}`,
      subRouter.routes(),
      subRouter.allowedMethods(),
    )
  })
} catch (e) {
  error(String(e))
}

export default router
