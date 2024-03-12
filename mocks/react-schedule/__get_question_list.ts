import type Application from 'koa'
type QueryParams = {
  page: string
  pageSize: string
}
export default function response(request: Application.Request): object {
  const { originalUrl, ctx: { query = {}} } = request
  const isStar = originalUrl.indexOf('isStar=true') !== -1
  const isDeleted = originalUrl.indexOf('isDeleted=true') !== -1
  const pageSize = parseInt((query as QueryParams).pageSize)
  const page = parseInt((query as QueryParams).page)


  if(isStar) {
    return {
      errno: 0,
      data: {
        [`list|${pageSize}`]: [
          {
            _id: '@id',
            title: '@ctitle',
            "isPublished|1": true,
            isStar: true,
            answerCount: "@natural(60, 100)",
            createdAt: '@datetime',
            isDeleted: false
          }
        ],
        total: 1000
      },
      msg: 'zack'
    }
  }
  if(isDeleted) {
    return {
      errno: 0,
      data: {
        [`list|${pageSize}`]: [
          {
            _id: '@id',
            title: '@ctitle',
            "isPublished|1": true,
            "isStar|1": true,
            answerCount: "@natural(60, 100)",
            createdAt: '@datetime',
            isDeleted: true
          }
        ],
        total: 1000
      },
      msg: 'zack'
    }
  }

  return {
    errno: 0,
    data: {
      [`list|${pageSize}`]: [
        {
          _id: '@id',
          title: '@ctitle',
          "isPublished|1": true,
          "isStar|1": true,
          answerCount: "@natural(60, 100)",
          createdAt: '@datetime',
          isDeleted: false
        }
      ],
      total: 100
    },
    msg: 'zack'
  }
}


// export default {
//   errno: 0,
//   data: {
//     "list|5-15": [
//       {
//         _id: '@id',
//         title: '@ctitle',
//         "isPublished|1": true,
//         "isStar|1": true,
//         answerCount: "@natural(60, 100)",
//         createdAt: '@datetime',
//         isDeleted: false
//       }
//     ],
//     total: 1000
//   },
//   msg: 'zack'
// }
