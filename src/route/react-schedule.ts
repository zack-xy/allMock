import path from 'node:path'
import Router from 'koa-router'
import questionIdFormat from 'mock/react-schedule/__get_question_id'
import questionListFormat from 'mock/react-schedule/__get_question_list'
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

// 问卷信息
router.get('/question/:id', async (ctx) => {
  const request = resetRequest(ctx.request)
  const { originalUrl } = request
  info(`请求接口：/${originalUrl}`)
  const res = await mock.mockData(request, { format: questionIdFormat })
  ctx.body = res
})

// 问卷列表
router.get('/questions/list', async (ctx) => {
  const request = resetRequest(ctx.request)
  const { originalUrl } = request
  info(`请求接口：/${originalUrl}`)
  const res = await mock.mockData(request, { format: questionListFormat })
  ctx.body = res
})

export default router
