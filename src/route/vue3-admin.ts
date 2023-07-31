import Router from 'koa-router'
import Mock, { resetRequest } from '@/utils/index'
import { info } from '@/utils/log4j'

const mock = new Mock()

const router = new Router()

// 登陆接口
router.post('/sys/login', async (ctx) => {
  const request = resetRequest(ctx.request)
  const { originalUrl } = request
  info(`请求接口：/${originalUrl}`)
  const res = await mock.mockData(request)
  ctx.body = res
})

export default router
