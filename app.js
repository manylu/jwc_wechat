var Koa = require("koa");
var path = require("path");
var m = require("./m/g");//一些中间件函数
var util = require("./libs/util");//工具函数
var config = require("./config");//公众号的配置信息
var reply = require("./wx/reply");//微信外层业务逻辑，选择回复内容
var job = require("./spider/spider");
var app = new Koa();

//1
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./hk/routes/index')
const users = require('./hk/routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/hk/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))
app.use(views(__dirname + '/hk/views', {
  extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
//2
job();
app.use(m(config.wechat,reply.reply));
console.log("app is starting");
app.listen(1234);

module.exports = app;