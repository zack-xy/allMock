import type Application from 'koa'

import jwt from 'jsonwebtoken'

// 校验token是否失效
export default function response(request: Application.Request): object {
  try {
    let token = ''
    const { body } = request
    const { userName } = body as { userName: string }
    const menus = []
    const points = []
    if (userName === 'super-admin') {
      // 这里不能用赋值运算符，不知道为什么
      menus.push(...[
        'userManage',
        'roleList',
        'permissionList',
        'articleRanking',
        'articleCreate',
      ])
      points.push(...[
        'distributeRole',
        'importUser',
        'removeUser',
        'distributePermission',
      ])
    }
    else if (userName === 'admin') {
      menus.push(...[
        'userManage',
        'articleRanking',
        'articleCreate',
      ])
      points.push(...[])
    }

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
        username: 'zackzheng',
        title: '超级管理员',
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        permission: {
          menus,
          points,
        },
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
