const Koa = require('koa')
const setupRouter = require('./router')
const db = require('./models')
const bodyParser = require("koa-bodyparser")

const { PORT } = require('./config')
const koaCors = require('koa-cors')
const app = new Koa()

app.on('error', err => {

});
// 跨域
app.use(koaCors({
  origin:'*'
}))
// 请求体解析
app.use(bodyParser())
// 启动路由
setupRouter(app)
// 监听端口
app.listen(PORT, () => {
  db.sequelize
    .sync({ force: false }) // If force is true, each DAO will do DROP TABLE IF EXISTS ..., before it tries to create its own table
    .then(async () => {
      console.log('sequelize connect success')
      console.log(`sever listen on http://127.0.0.1:${PORT}`)
    })
    .catch(err => {
      console.log(err)
    })
})
