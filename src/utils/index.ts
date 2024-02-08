import fs from 'node:fs'
import path from 'node:path'
import Mock from 'mockjs'
import type Application from 'koa'
import type Router from 'koa-router'
import { constellations } from './extendRandom'
import { generateImgBase64, generateUrlImg } from './randomImage'
import { info } from './log4j'
import whiteList from '@/whiteConfig'

// 自定义占位符

class NewMock {
  mock: typeof Mock
  constructor() {
    const Random = Mock.Random
    Random.extend({
      constellation(date) {
        return this.pick(constellations)
      },
      imageBase64: generateImgBase64,
      imageUrl: generateUrlImg,
    })
    this.mock = Mock
  }

  // 请求的响应时间，默认100-500毫秒
  mockData(request: Application.Request, mockConfig?: MockConfig) {
    return new Promise((resolve, reject) => {
      getMockFormat(request, mockConfig?.format)
        .then((format) => {
          setTimeout(() => {
            resolve(Mock.mock(format))
          }, mockConfig?.timeout === undefined
            ? Math.floor(Math.random() * 401 + 100)
            : mockConfig?.timeout)
        }).catch((e) => {
          reject(e)
        })
    })
  }
}

// 从文件中获取mockjs的format
export async function getMockFormat(request: Application.Request, format?: Format): Promise<object> {
  if (format) // 如果配置了format，则有限读取配置的format
    return getFormatObject(request, format)
  const { headers, originalUrl } = request
  const pathToFileName = originalUrl.replace('/', '_')
  const idx = whiteList.findIndex(item => item.host === headers.origin)
  if (idx === -1) // 若白名单没有配置，则读取配置的format
    return getFormatObject(request, format || {})
  const { name } = whiteList[idx]
  try {
    // 从白名单中匹配，以读取配置文件
    const fileFormat = await import(`../../mocks/${name}/${pathToFileName}`)
    return getFormatObject(request, fileFormat.default)
  }
  catch (e) {
    throw new Error(`没找到接口文件,项目:${name},接口:${originalUrl}`)
  }
}

// 根据Format得到mock对象
function getFormatObject(request: Application.Request, format: Format): object {
  if (typeof format === 'object')
    return format
  return format(request)
}

// 重新设置Request
// 排除路由的第一段路径，第一段路径表示项目
export function resetRequest(request: Application.Request) {
  const { originalUrl, headers, ...rest } = request
  const newOriginalUrl = originalUrl ? originalUrl.replace(/\/*[^\/]*\//, '') : ''
  return { ...rest, originalUrl: newOriginalUrl, headers }
}

export function generatePath(name: string) {
  return fs.readdirSync(path.resolve(__dirname, `../../mocks/${name}`))
}

export function generateNormalPost(name: string, router: Router) {
  generatePath(name).forEach((fileName) => {
    router.post(`/${fileName.replace('.ts', '').replace('_', '/')}`, async (ctx) => {
      const request = resetRequest(ctx.request)
      const { originalUrl } = request
      info(`请求接口${originalUrl}`)
      const res = await new NewMock().mockData(request)
      ctx.body = res
    })
  })
}

export default NewMock
