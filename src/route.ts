import Router from 'koa-router'
import Mock from '@/utils/index'

const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'allMock服务器'
})

router.post(/./, async (ctx) => {
  // const res = await Mock.asyncGeneratedData({ ...item })
  ctx.body = Mock.mock({
    'list|1-10': [{
      'id|+1': 1,
      'email': '@EMAIL',
    }],
  })
})

export default router
