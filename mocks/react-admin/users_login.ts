import type Application from 'koa'
import jwt from 'jsonwebtoken'

interface LoginParams {
  username: string
  password: string
}

// 导出函数，可以根据参数，动态生成一些返回
// 生成token，过期时间是30分钟（30 * 60s）
export default function response(request: Application.Request): object {
  const { body } = request
  const { username, password } = body as LoginParams
  const token = jwt.sign({
    body,
  }, 'react-admin', {
    expiresIn: 30 * 60,
  })
  console.log('用户登录，用户名：', username, '密码')
  return {
    code: 200,
    data: token,
    msg: '登陆成功',
  }
}
