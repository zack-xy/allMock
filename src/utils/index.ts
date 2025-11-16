import fs from 'node:fs'
import path from 'node:path'
import Mock from 'mockjs'
import type Application from 'koa'
import type Router from 'koa-router'
import { constellations } from './extendRandom'
import { generateUrlImg } from './randomImage'
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
      // imageBase64: generateImgBase64, // 生成一个随机的base64图片
      imageUrl: generateUrlImg, // 生成一个随机的url图片
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
  if (format) // 如果配置了format，则优先读取配置的format
    return getFormatObject(request, format)
  const { headers, originalUrl } = request
  const pathToFileName = originalUrl.replace(/\//g, '_')
  const idx = whiteList.findIndex(item => item.host === headers.origin)
  const folderName = request.req.url?.split('/')[1] || ''
  let name = ''
  if (idx !== -1) name = whiteList[idx].name
  if (fs.existsSync(path.resolve(__dirname, `../../mocks/${folderName}`))) name = folderName
  if (name === '') return getFormatObject(request, format || {})
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

interface PathReqInfo {
  reqType: 'post' | 'get' | 'delete' | 'put' | 'patch'
  fileName: string
}
``
// 过滤所有项目
export function generatePath(name: string) {
  const allResults = fs.readdirSync(path.resolve(__dirname, `../../mocks/${name}`))
  let ret: Array<PathReqInfo> = []
  for (const str of allResults) {
    if(str.startsWith('__')) {
      ret.push(getReqTypeAndFileName(str))
    } else {
      ret.push({
        reqType: 'post',
        fileName: str
      })
    }
  }
  return ret
}

function getReqTypeAndFileName(str: string): PathReqInfo {
  const parts = str.replace('__', '')
  if(parts.startsWith('get')) return {
    reqType: 'get',
    fileName: parts.replace('get_', '')
  }
  if(parts.startsWith('delete')) return {
    reqType: 'delete',
    fileName: parts.replace('delete_', '')
  }
  if(parts.startsWith('put')) return {
    reqType: 'put',
    fileName: parts.replace('put_', '')
  }
  if(parts.startsWith('patch')) return {
    reqType: 'put',
    fileName: parts.replace('patch_', '')
  }
  return {
    reqType: 'post',
    fileName: parts
  }
}

// 生成一般的post请求Mock
export function generateNormalPost(name: string, router: Router) {
  const allPath = generatePath(name)
  // 处理post请求
  allPath.forEach(({reqType, fileName}) => {
    router[reqType](`/${fileName.replace('.ts', '').replace(/_/g, '/')}`, async (ctx) => {
      const request = resetRequest(ctx.request)
      const { originalUrl } = request
      info(`请求接口${originalUrl}`)
      const res = await new NewMock().mockData(request)
      ctx.body = res
    })
  })
  // 处理其他类型请求
}

export default NewMock
