var Koa = require("koa");
var path = require("path");
var m = require("./m/g");//一些中间件函数
var util = require("./libs/util");//工具函数
var config = require("./config");//公众号的配置信息
var reply = require("./wx/reply");//微信外层业务逻辑，选择回复内容
var job = require("./spider/spider");
var app = new Koa();
//1
var router = require('koa-router')();
var views = require('koa-views');
var co = require('co');
var convert = require('koa-convert');
var json = require('koa-json');
var onerror = require('koa-onerror');
var bodyparser = require('koa-bodyparser')();
var logger = require('koa-logger');

var index = require('./views/routes/index');
var users = require('./views/routes/users');
var api = require('./views/routes/api');

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/views/public'));

app.use(views(__dirname + '/views/views-ejs', {
  extension: 'ejs'
}));


// logger
// app.use(async (ctx, next) => {
//   var start = new Date();
//   await next();
//   var ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

//router.use('/', index.routes(), index.allowedMethods());
//router.use('/users', users.routes(), users.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());

app.use(router.routes(), router.allowedMethods());

//2
//job();
app.use(m(config.wechat,reply.reply));
console.log("app is starting");
app.listen(1234);

module.exports = app;