export default { 
  errno: 0, 
  data: {
    id: '@id',
    title: '@ctitle',
    componentList: [
      // Title
      {
        fe_id: 'a1',
        type: 'questionTitle',
        title: '标题',
        isHidden: false,
        props: {text: '个人信息调研', level: 1, isCenter: false}
      },
      // Input
      {
        fe_id: 'a2',
        type: 'questionInput',
        title: '输入框1',
        isHidden: false,
        props: {title: '你的姓名', placeholder: '请输入姓名...'}
      },
      // Input
      {
        fe_id: 'a3',
        type: 'questionInput',
        title: '输入框2',
        isHidden: false,
        props: {title: '你的电话', placeholder: '请输入电话...'}
      }
    ]
  }, 
  msg: 'zack' 
}
