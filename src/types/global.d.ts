
interface FormatFn {
 (options: any): object
}

interface EXPFormat {
  default: object | FormatFn
}

interface MockConfig {
  format: object | FormatFn
  timeout?: number
}

interface WhiteRequest {
  orginal: string | undefined
  originalUrl: string
}

interface WhiteItem {
  name: string
  host: string
}
