import Mock from 'mockjs'

Mock.mock('login', {
  'list|1-10': [{
    'id|+1': 1,
    'email': '@EMAIL',
  }],
})

export default Mock
