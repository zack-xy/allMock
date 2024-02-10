import type Application from 'koa'
import jwt from 'jsonwebtoken'

interface LoginParams {
  username: string
  password: string
}

// 导出函数，可以根据参数，动态生成一些返回
// 生成token，过期时间是30分钟（30 * 60s）
// 返回的对象是符合mockjs的对象，则数据还是动态假数据
export default function response(request: Application.Request): object {
  const { body } = request
  const { username, password } = body as LoginParams
  const token = jwt.sign({
    body,
  }, 'vue3-admin', {
    expiresIn: 30 * 60,
  })
  return {
    code: 200,
    message: '登陆成功',
    success: true,
    data: [
      {
        name: '管理员',
        id: '1',
        describe: '@sentence(3, 5)',
        assignPermissions: '@sentence(3, 5)',
      },
      {
        name: '超级管理员',
        id: '2',
        describe: '@sentence(3, 5)',
        assignPermissions: '@sentence(3, 5)',
      },
      {
        name: '人事组长',
        id: '3',
        describe: '@sentence(3, 5)',
        assignPermissions: '@sentence(3, 5)',
      },
      {
        name: '前端组长',
        id: '4',
        describe: '@sentence(3, 5)',
        assignPermissions: '@sentence(3, 5)',
      },
      {
        name: '设计师',
        id: '5',
        describe: '@sentence(3, 5)',
        assignPermissions: '@sentence(3, 5)',
      },
      {
        name: '大数据',
        id: '6',
        describe: '@sentence(3, 5)',
        assignPermissions: '@sentence(3, 5)',
      },
      {
        name: '后端岗',
        id: '7',
        describe: '@sentence(3, 5)',
        assignPermissions: '@sentence(3, 5)',
      },
      {
        name: '测试岗',
        id: '8',
        describe: '@sentence(3, 5)',
        assignPermissions: '@sentence(3, 5)',
      },
    ],
  }
}
