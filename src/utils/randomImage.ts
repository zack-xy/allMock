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

/** 随机图片API
 * 岁月小筑 https://img.xjh.me
爱壁纸API api.isoyu.com
保罗API https://api.paugram.com/help/wallpaper
墨天逸 http://api.mtyqx.cn
听风过畔 https://api.osgz.com
如诗API https://api.likepoems.com
Unsplash https://source.unsplash.com/
小歪API https://api.ixiaowai.cn
樱花API http://www.dmoe.cc/
樱道 https://img.r10086.com/
EEEDOG https://www.eee.dog/tech/rand-pic-api.html
东方Project https://img.paulzzh.tech/
动漫星空 https://api.dongmanxingkong.com/suijitupian.html
随机生成图片大全：https://www.fang1688.cn/study-code/103.html
随机美图API：https://cdn.seovx.com/
二次元：http://www.dmoe.cc/random.php
二次元：https://api.mz-moe.cn/img.php
 */
