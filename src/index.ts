import Koa from 'koa'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
import chalk from 'chalk'
import route from './route'
import log4js from './utils/log4j'

const app = new Koa()

app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(bodyParser())
app.use(route.routes())
app.use(route.allowedMethods())

// Koa中止时调用log4js.shutdown
app.on('close', () => {
  log4js.shutdown(() => {
    // eslint-disable-next-line no-console
    console.log(chalk.bgRed.whiteBright.bold('应用已停止'))
  })
})

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log(
    chalk
      .bgGreenBright
      .whiteBright
      .bold('🚀 Mock服务器已启动-端口：4000 🚀'),
  )
})
