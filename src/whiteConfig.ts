// 配置白名单，标明相应接口的请求是哪一个项目
// 以第一个为例，表明8080端口的请求是vue3-admin项目
// 读mocks/vue3-admin文件夹内的文件
const whiteList: Array<WhiteListItem> = [
  { name: 'vue3-admin', host: 'http://localhost:8080' },
  { name: 'react-schedule', host: 'http://localhost:3000' },
]

export default whiteList
