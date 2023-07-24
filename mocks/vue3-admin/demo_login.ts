import type Application from 'koa'

interface LoginParams {
  username: string
  password: string
}

// 导出函数，可以根据参数，动态生成一些返回
export default function response(request: Application.Request): object {
  const { body } = request
  const { username, password } = body as LoginParams
  if (username === 'admin')
    return { name: 'admin' }
  return { name: '@cname' }
}
