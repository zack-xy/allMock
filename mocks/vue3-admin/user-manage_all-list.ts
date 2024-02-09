import type Application from 'koa'
import jwt from 'jsonwebtoken'

// 导出函数，可以根据参数，动态生成一些返回
// 生成token，过期时间是30分钟（30 * 60s）
// 返回的对象是符合mockjs的对象，则数据还是动态假数据
export default function response(request: Application.Request): object {
  const { body } = request
  const { page, size } = body as { page: number; size: number }
  const token = jwt.sign({
    body,
  }, 'vue3-admin', {
    expiresIn: 30 * 60,
  })
  return {
    code: 200,
    message: '请求成功',
    success: true,
    data: {
      'list|5-30': [
        {
          'userName': '@cname',
          'id': '@id',
          'mobile': '@string("number", 11)',
          'avatar': '@imageUrl',
          'nowTime': 1707401665899,
          'openTime': '@datetime',
          'role|1-5': [
            {
              'id': '@id',
              'title|1': ['人事', '后端', '前端', '销售经理', '保安队长', 'CEO', 'CFO', 'COO'],
            },
          ],
        },
      ],
      'page': `${page}`,
      'size': `${size}`,
      'total': 1000,
    },
  }
}
