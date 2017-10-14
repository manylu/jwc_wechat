"use strict";
var config = require("../config");
var Wechat = require("../m/wechat");
var wechatApi = new Wechat(config.wechat);
var path = require("path");
var menu = require("./menu");
wechatApi.deleteMenu().then(function() {
	console.log("createMenu");
	return wechatApi.createMenu(menu);
});

exports.reply = function *(next) {
	var message = this.weixin;
	if(message.MsgType === "event") {
		if(message.Event === "subscribe") {
			this.body = "欢迎关注中南民族大学教务处！";
		} else if (message.Event === "unsubscribe") {
			this.body = "bye";
		}
	} else if(message.MsgType === "text") {
		var content = message.Content;
		var reply = "你缩的 " + message.Content + "是神马东东，俺八知道啊.....";
		this.body = reply;
	}
	yield next;
}

