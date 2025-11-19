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

function getDepListData(request: Request) {
  return {
    code: 200,
    data: [
      {
        _id: "1122",
        deptName: "技术中心",
        userName: "David",
        parentId: "",
        createId: 1000001,
        createTime: "@datetime",
        updateTime: "@datetime",
        __v: 0,
        children: [
          {
            _id: "112211",
            deptName: "大前端",
            userName: "Kevin",
            parentId: "1122",
            createId: 1000002,
            createTime: "@datetime",
            updateTime: "@datetime",
            __v: 0,
          },
          {
            _id: "112222",
            deptName: "测试部门",
            userName: "Tony",
            parentId: "1122",
            createId: 1000003,
            createTime: "@datetime",
            updateTime: "@datetime",
            __v: 0,
          }
        ]
      }
    ],
    msg: '成功'
  }
}

export default function(router: Router) {
  router.get('/test/:id', async (ctx) => {
    const request = resetRequest(ctx.request)
    info(`请求接口：${request.req.url}`)
    const res = await mock.mockData(request, { format: getTestIdData })
    ctx.body = res
  })

  router.get("/dep/list", async (ctx) => {
    // ctx.query 会自动解析查询参数
    const { deptName } = ctx.query;
    console.log("查询部门名:", deptName);
    const request = resetRequest(ctx.request)
    info(`请求接口：${request.req.url}`)
    const res = await mock.mockData(request, {format: getDepListData})
    ctx.body = res
  })
}
