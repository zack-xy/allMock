import type Application from 'koa'
export default function response(request: Application.Request): object {
  const { originalUrl } = request
  const isStar = originalUrl.indexOf('isStar=true') !== -1
  const isDeleted = originalUrl.indexOf('isDeleted=true') !== -1


  if(isStar) {
    return {
      errno: 0,
      data: {
        "list|5-15": [
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
        "list|5-15": [
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
      "list|5-15": [
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
      total: 1000
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
