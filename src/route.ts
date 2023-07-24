import Router from 'koa-router'
import Mock from '@/utils/index'

const router = new Router()
const mock = new Mock()

router.get('/', async (ctx) => {
  ctx.body = 'allMock服务器'
})

router.post(/./, async (ctx) => {
  // const res = await Mock.asyncGeneratedData({ ...item })
  const req: WhiteRequest = {
    orginal: ctx.headers.origin,
    originalUrl: ctx.request.originalUrl,
  }
  const res = await mock.mockData(req)
  ctx.body = res
})

export default router
