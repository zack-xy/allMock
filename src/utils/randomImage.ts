// import { createCanvas } from 'canvas'
import { randomIntegerInRange } from './tools'

// 这里是canvas官方例子代码
// 这个扩展作为占位符@imageBase64已经可以获得base64的图片
// 方法2：应该还可以读取文件作为随机图片
// 方法3: 应该也可以对接提供图片服务的API
// TODO 待完善随机生成图片的方法(使用canvas可以做出更加复杂的图片)
// export function generateImgBase64() {
//   const canvas = createCanvas(200, 200)
//   const ctx = canvas.getContext('2d')

//   // Write "Awesome!"
//   ctx.font = '30px Impact'
//   ctx.rotate(0.1)
//   ctx.fillText('Awesome!', 50, 100)

//   // Draw line under text
//   const text = ctx.measureText('Awesome!')
//   ctx.strokeStyle = 'rgba(0,0,0,0.5)'
//   ctx.beginPath()
//   ctx.lineTo(50, 102)
//   ctx.lineTo(50 + text.width, 102)
//   ctx.stroke()

//   // console.log(`<img src="${canvas.toDataURL()}" />`)
//   return canvas.toDataURL()
// }

// 可以传递参数
// TODO 自定义扩展
export function generateImage(size?: string, color?: string) {
  // import Mock from 'mockjs'
  // 可能通过Mock.Random.email()生成一些随机数据再返回
  return [] // 返回随机数据
}

export function generateUrlImg(width: number = 200, height?: number) {
  const randomIdx = randomIntegerInRange(0, 6)
  const imgApis = [
    'https://img.xjh.me/random_img.php',
    'https://cdn.seovx.com/d/?mom=302',
    'https://api.r10086.com/樱道随机图片api接口.php?图片系列=动漫综合1',
    'https://api.r10086.com/樱道随机图片api接口.php?图片系列=动漫综合2',
    'https://img2.baidu.com/it/u=3654977212,2301797782&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667',
    'https://gd-hbimg.huaban.com/3566021105a8fc763e59b033c5dedbac4f92d2a41f0de-jTELRL_fw658',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201907%2F16%2F20190716195837_vsaMV.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1709991751&t=1e3dd3afbd9c668eac0c9a81f961de6f',
    'https://img0.baidu.com/it/u=1817709836,3411811934&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
  ]
  return imgApis[randomIdx]
}

// https://cdn.seovx.com/d/?mom=302

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
