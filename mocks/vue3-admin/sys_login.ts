export default {
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
    'token': '@guid',
    'role|1': [0, 1], // 用户角色：0:系统管理员 1:普通用户
    'roleList': [],
    'createTime': '@datetime',
    'lastLoginTime': '@datetime',
  },
}
