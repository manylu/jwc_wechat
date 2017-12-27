"use strict";
var sha1 = require("sha1");//加密模块
var getRawBody = require("raw-body");//
var Wechat = require("./wechat");//wechat构造函数
var util = require("./util");//工具包，常用的封装好的一些方法

module.exports = function(opts,handler) {
	var wechat = new Wechat(opts);
	return function *(next) {
		var that = this;
		var token = opts.token;
		var signature = this.query.signature;
		var nonce = this.query.nonce;
		var timestamp = this.query.timestamp;
		var echostr = this.query.echostr;
		var str = [token,timestamp,nonce].sort().join("");
		var sha = sha1(str);
		if(this.method === "GET") {
			if(sha === signature) {
				this.body = echostr + "";
			} else {
				this.body = "wrong";
			}
		} else if(this.method === "POST"){
			if(sha !== signature) {
				this.body = "wrong";
				return false;
			} 
			var data = yield getRawBody(this.req,{
				length: this.length,
				limit: "1mb",
				encoding: this.charset
			});
			var content = yield util.parseXMLAsync(data);
			var message = util.formatMessage(content.xml);
			this.weixin  = message;//将微信服务器返回的用户消息挂载在this对象上		
			yield handler.call(this,next);//外层业务逻辑处理消息
			wechat.reply.call(this);//进行消息回复
		}
	}
}