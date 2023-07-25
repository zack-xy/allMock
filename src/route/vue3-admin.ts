import Router from 'koa-router'
import Mock, { resetRequest } from '@/utils/index'

const mock = new Mock()

const router = new Router()

// 登陆接口
router.post('/sys/login', async (ctx) => {
  const res = await mock.mockData(resetRequest(ctx.request))
  ctx.body = res
})

export default router
