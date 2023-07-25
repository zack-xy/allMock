import { createCanvas } from 'canvas'

// 这里是canvas官方例子代码
// 这个扩展作为占位符@imageBase64已经可以获得base64的图片
// 方法2：应该还可以读取文件作为随机图片
// 方法3: 应该也可以对接提供图片服务的API
// TODO 待完善随机生成图片的方法(使用canvas可以做出更加复杂的图片)
export function generateImgBase64() {
  const canvas = createCanvas(200, 200)
  const ctx = canvas.getContext('2d')

  // Write "Awesome!"
  ctx.font = '30px Impact'
  ctx.rotate(0.1)
  ctx.fillText('Awesome!', 50, 100)

  // Draw line under text
  const text = ctx.measureText('Awesome!')
  ctx.strokeStyle = 'rgba(0,0,0,0.5)'
  ctx.beginPath()
  ctx.lineTo(50, 102)
  ctx.lineTo(50 + text.width, 102)
  ctx.stroke()

  // console.log(`<img src="${canvas.toDataURL()}" />`)
  return canvas.toDataURL()
}

// 可以传递参数
// TODO 自定义扩展
export function generateImage(size?: string, color?: string) {
  // import Mock from 'mockjs'
  // 可能通过Mock.Random.email()生成一些随机数据再返回
  return [] // 返回随机数据
}
