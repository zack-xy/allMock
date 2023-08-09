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
    data: {
      'times': '@increment',
      'userId': '@pick(["111","222"])',
      'img': '@imageBase64',
      'img2': '@image',
      'userName': '@first',
      'state|1-3': 1, // 1:在职 2:离职 3:试用期
      'sex|1': [0, 1], // 性别：0:男 1:女
      'userEmail': '@email',
      'deptId': ['token'],
      'token': token,
      'role|1': [0, 1], // 用户角色：0:系统管理员 1:普通用户
      'roleList': [],
      'createTime': '@datetime',
      'lastLoginTime': '@datetime',
    },
  }
}
