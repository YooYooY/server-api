const Koa =require('koa')
const router =require('./routes')
const cors =require('koa2-cors')
const koaBody = require('koa-body')
const middlewares =require('./middlewares')
const helmet =require('koa-helmet')

const app = new Koa()

app
  .use(helmet())
  .use(middlewares())
  .use(
    koaBody({
      multipart: true
    })
  )
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Serving on http://localhost:' + PORT)
})

module.exports = app
