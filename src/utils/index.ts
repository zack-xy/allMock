import Mock from 'mockjs'
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

  /**
   * 异步mock数据
   * @param {string} path  // 接口路径
   * @param {object} format  // 数据格式（mockjs格式）
   * @param {number} timeout  // 请求的响应时间，默认200-600毫秒
   */
  mockData(request: WhiteRequest, mockConfig?: MockConfig) {
    return new Promise((resolve, reject) => {
      let timeout = Math.floor(Math.random() * 401 + 200)
      if (mockConfig && mockConfig.timeout)
        timeout = mockConfig.timeout
      getMockFormat(request)
        .then((format) => {
          setTimeout(() => {
            const mockData = Mock.mock(format)
            resolve(mockData)
          }, timeout)
        }).catch((e) => {
          reject(e)
        })
    })
  }
}

// 从文件中获取mockjs的format
export async function getMockFormat(request: WhiteRequest): Promise<object | FormatFn> {
  let format: EXPFormat = { default: {} }
  const { orginal, originalUrl } = request
  const pathToFileName = originalUrl.replace(/^\/*/, '').replace('/', '_')
  const idx = whiteList.findIndex(item => item.host === orginal)
  if (idx === -1)
    return format.default
  const { name } = whiteList[idx]
  try {
    format = await import(`../../mocks/${name}/${pathToFileName}`)
  }
  catch (e) {
    throw new Error(`没找到接口文件,项目:${name},接口:${originalUrl}`)
  }
  return format.default
}

export default NewMock
