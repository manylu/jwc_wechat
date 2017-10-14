"use strict";
var path = require("path");
var util = require("./libs/util");
var wechat_file = path.join(__dirname,"./wechat.txt");
var config = {
	wechat: {
		//测试号
		"token": "benbentu",
		"appID": "wx6554231a9cf259c8",
		"appSecret": "80cd2040ce35701ed400ed6380f1e540",
		getAccessToken: function() {
			return util.readFileAsync(wechat_file);
		},
		saveAccessToken: function(data) {
			data = JSON.stringify(data);//转成字符串
			return util.writeFileAsync(wechat_file,data);
		}
	}
}
module.exports = config;