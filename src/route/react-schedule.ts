import path from 'node:path'
import Router from 'koa-router'
import {
  deleteQuestionBatchDeleteFormat,
  getQuestionIdFormat,
  getQuestionListFormat,
  getUserInfoFormat,
  patchQuestionIdFormat,
  postQuestionDuplicateFormat,
} from 'mock/react-schedule/__export_format'
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
  const res = await mock.mockData(request, { format: getQuestionIdFormat })
  ctx.body = res
})

// 更新问卷信息
router.patch('/question/:id', async (ctx) => {
  const request = resetRequest(ctx.request)
  const { originalUrl } = request
  info(`请求接口：/${originalUrl}`)
  const res = await mock.mockData(request, { format: patchQuestionIdFormat })
  ctx.body = res
})

// 批量删除问卷
router.delete('/question/batchDelete', async (ctx) => {
  const request = resetRequest(ctx.request)
  const { originalUrl } = request
  info(`请求接口：/${originalUrl}`)
  const res = await mock.mockData(request, { format: deleteQuestionBatchDeleteFormat })
  ctx.body = res
})

// 复制问卷
router.post('/question/duplicate/:id', async (ctx) => {
  const request = resetRequest(ctx.request)
  const { originalUrl } = request
  info(`请求接口：/${originalUrl}`)
  const res = await mock.mockData(request, {
    format: postQuestionDuplicateFormat,
  })
  ctx.body = res
})

// 问卷列表
router.get('/questions/list', async (ctx) => {
  const request = resetRequest(ctx.request)
  const { originalUrl } = request
  info(`请求接口：/${originalUrl}`)
  const res = await mock.mockData(request, { format: getQuestionListFormat })
  ctx.body = res
})

// 获取用户信息
router.get('/user/info', async (ctx) => {
  const request = resetRequest(ctx.request)
  const { originalUrl } = request
  info(`请求接口：/${originalUrl}`)
  const res = await mock.mockData(request, { format: getUserInfoFormat })
  ctx.body = res
})

export default router
