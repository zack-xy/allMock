import Koa from 'koa'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
import chalk from 'chalk'
import route from './route'

const app = new Koa()

app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(bodyParser())
app.use(route.routes())
app.use(route.allowedMethods())

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log(
    chalk
      .bgGreenBright
      .whiteBright
      .bold('🚀 Mock服务器已启动-端口：4000 🚀'),
  )
})
