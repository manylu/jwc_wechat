var Koa = require("koa");
var path = require("path");
var m = require("./m/g");//一些中间件函数
var util = require("./libs/util");//工具函数
var config = require("./config");//公众号的配置信息
var reply = require("./wx/reply");//微信外层业务逻辑，选择回复内容


var app = new Koa();

app.use(m(config.wechat,reply.reply));
console.log("app is starting");
app.listen(1234);