import Mock from 'mockjs'
import type Application from 'koa'
import { constellations } from './extendRandom'
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
          }, mockConfig?.timeout || Math.floor(Math.random() * 401 + 100))
        }).catch((e) => {
          reject(e)
        })
    })
  }
}

// 从文件中获取mockjs的format
export async function getMockFormat(request: Application.Request, format?: Format): Promise<object> {
  const { headers, originalUrl } = request
  const pathToFileName = originalUrl.replace(/^\/*/, '').replace('/', '_')
  const idx = whiteList.findIndex(item => item.host === headers.origin)
  if (idx === -1)
    return getFormatObject(request, format || {})
  const { name } = whiteList[idx]
  try {
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

export default NewMock
