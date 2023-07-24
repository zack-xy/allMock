// import type Application from 'koa'

interface FormatFn {
 (request: Application.Request): object
}

type Format = ReturnType<FormatFn> | FormatFn

interface MockConfig {
  format: Format
  timeout?: number
}

interface WhiteListItem {
  name: string
  host: string
}
