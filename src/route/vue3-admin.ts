import path from 'node:path'
import Router from 'koa-router'
import Mock, { generateNormalPost, resetRequest } from '@/utils/index'
import { info } from '@/utils/log4j'

const mock = new Mock()

const router = new Router()

generateNormalPost(path.basename(__filename, '.ts'), router)

// 自定义路由，这是一个演示例子
router.post('/sys/profile2', async (ctx) => {
  const request = resetRequest(ctx.request)
  const { originalUrl } = request
  info(`请求接口：/${originalUrl}`)
  const res = await mock.mockData(request, {
    format: { message: '我是mock数据' }, timeout: 100,
  })
  ctx.body = res
})

export default router
