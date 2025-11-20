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

function getMenuData(request: Request) {
  return {
    code: 200,
    data: [
      {
        _id: "111",
        menuName: "Dashboard",
        icon: "DesktopOutlineed",
        path: "/dashboard",
        menuType: 1,
        menuCode: "",
        parentId: "",
        component: "",
        menuStatus: 1,
        createTime: "@datetime",
        buttons: [
        ],
        children: [
          {
            _id: "1111",
            menuName: "查看",
            icon: "DesktopOutlineed",
            path: "/dashboard",
            menuType: 2,
            menuCode: "home@query",
            parentId: "111",
            component: "",
            menuStatus: 1,
            createTime: "@datetime",
          }
        ]
      },
      {
        _id: "222",
        menuName: "用户模块",
        icon: "UsergroupAddOutlined",
        path: "",
        menuType: 1,
        menuCode: "",
        parentId: "",
        component: "",
        menuStatus: 1,
        createTime: "@datetime",
        buttons: [],
        children: [
          {
            _id: "2221",
            menuName: "用户列表",
            icon: "DesktopOutlineed",
            path: "/userList",
            menuType: 1,
            menuCode: "user@query",
            parentId: "222",
            component: "",
            menuStatus: 1,
            createTime: "@datetime",
          },
          {
            _id: "2222",
            menuName: "菜单管理",
            icon: "DesktopOutlineed",
            path: "/userList",
            menuType: 1,
            menuCode: "user@query",
            parentId: "222",
            component: "",
            menuStatus: 1,
            createTime: "@datetime",
          },
          {
            _id: "2223",
            menuName: "角色管理",
            icon: "DesktopOutlineed",
            path: "/userList",
            menuType: 1,
            menuCode: "user@query",
            parentId: "222",
            component: "",
            menuStatus: 1,
            createTime: "@datetime",
          },
          {
            _id: "2224",
            menuName: "部门管理",
            icon: "DesktopOutlineed",
            path: "/userList",
            menuType: 1,
            menuCode: "user@query",
            parentId: "222",
            component: "",
            menuStatus: 1,
            createTime: "@datetime",
          }
        ]
      }
    ],
    msg: '成功'
  }
}

function getRolesData(request: Request) {
  return {
    code: 200,
    data: {
      list: [
        {
          permissionList: {
            checkedKeys: [],
            halfCheckedKeys: []
          },
          _id: "@id",
          roleName: "一般管理员",
          createId: 1000002,
          updateTime: "@datetime",
          createTime: "@datetime",
          __v: 0
        },
        {
          permissionList: {
            checkedKeys: [],
            halfCheckedKeys: []
          },
          _id: "@id",
          roleName: "一般管理员",
          createId: 1000002,
          updateTime: "@datetime",
          createTime: "@datetime",
          __v: 0
        }
      ],
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 200
      },
    },
    msg: '成功'
  }
}

export default function (router: Router) {
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
    const res = await mock.mockData(request, { format: getDepListData })
    ctx.body = res
  })

  router.get("/menu/list", async (ctx) => {
    // ctx.query 会自动解析查询参数
    const { menuName, menuState } = ctx.query;
    const request = resetRequest(ctx.request)
    info(`请求接口：${request.req.url}`)
    const res = await mock.mockData(request, { format: getMenuData })
    ctx.body = res
  })

  router.get("/roles/list", async (ctx) => {
    // ctx.query 会自动解析查询参数
    const { menuName, menuState } = ctx.query;
    const request = resetRequest(ctx.request)
    info(`请求接口：${request.req.url}`)
    const res = await mock.mockData(request, { format: getRolesData })
    ctx.body = res
  })

}
