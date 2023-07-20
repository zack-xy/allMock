import Router from 'koa-router'

const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'allMock服务器'
})

export default router
