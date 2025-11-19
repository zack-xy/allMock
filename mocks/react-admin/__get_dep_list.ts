export default {
  code: 200,
  data: [
    {
      _id: "1122",
      deptName: "技术中心",
      userName: "admin",
      parentId: "",
      createId: 1000002,
      createTime: "@datetime",
      updateTime: "@datetime",
      __v: 0,
      children: [
        {
          _id: "112211",
          deptName: "大前端",
          userName: "Jack",
          parentId: "1122",
          createId: 1000002,
          createTime: "@datetime",
          updateTime: "@datetime",
          __v: 0,
        },
        {
          _id: "112222",
          deptName: "测试部门",
          userName: "Lesila",
          parentId: "1122",
          createId: 1000002,
          createTime: "@datetime",
          updateTime: "@datetime",
          __v: 0,
        }
      ]
    }
  ],
  msg: '成功'
}
