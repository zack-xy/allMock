import type Application from 'koa'

import jwt from 'jsonwebtoken'

// 校验token是否失效
export default function response(request: Application.Request): object {
  try {
    let token = ''
    if (request.headers && request.headers.authorization)
      token = request.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, 'vue3-admin')
    return {
      code: 200,
      success: true,
      data: {
        role: [
          {
            id: 1,
            title: '超级管理员',
          },
        ],
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      },
    }
  }
  catch (error) {
    return {
      code: 401,
      success: false,
      message: 'token已失效',
    }
  }
}
