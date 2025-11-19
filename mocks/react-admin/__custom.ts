import type Router from 'koa-router'
import type { Request } from 'koa'
import { info } from '../../src/utils/log4j'
import Mock, { resetRequest } from '../../src/utils/index'

const mock = new Mock()

function getTestIdData(request: Request) {
  return {
    id: '@id',
    name: 'zack zheng'
  }
}

export default function(router: Router) {
  router.get('/test/:id', async (ctx) => {
    const request = resetRequest(ctx.request)
    info(`请求接口：${request.req.url}`)
    const res = await mock.mockData(request, { format: getTestIdData })
    ctx.body = res
  })
}
