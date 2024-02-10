export default {
  code: 200,
  message: '请求成功',
  success: true,
  data: {
    'userName': '@cname',
    'gender|1': ['男', '女'],
    'nationality': '汉族',
    'mobile': 111111111111,
    'province': '@province',
    'remark': ['测试', '测试二', '测试三', '测试四'],
    'address': '@county(true)',
    'avatar': '@imageUrl',
    'experience|2-8': [
      {
        startTime: '@date',
        endTime: '@date',
        title: '@sentence(3, 5)',
        desc: '@csentence',
      },
    ],
    'major': '@csentence',
    'glory': '@csentence',
  },
}
