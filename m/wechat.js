"use strict";
var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var _ = require("lodash");
var util = require("./util");
var fs = require("fs");

var prefix = "https://api.weixin.qq.com/cgi-bin/";
var semanticUrl = "https://api.weixin.qq.com/semantic/semproxy/search?access_token=";
var api = {
	semanticUrl,
	accessToken: prefix + "token?grant_type=client_credential&",
	temporary: {
		upload: prefix + "media/upload?",
		fetch: prefix + "media/get?"
	},
	permanent: {
		upload: prefix + "material/add_material?",
		fetch: prefix + "material/get_material?",
		uploadNews: prefix + "material/add_news?",
		uploadNewsPic: prefix + "media/uploadimg?",
		del: prefix + "material/del_material?",
		update: prefix + "material/update_news?",
		count: prefix + "material/get_materialcount?",
		batch: prefix + "material/batchget_material?"
	},
	menu: {
		create: prefix + "menu/create?",
		get: prefix + "menu/get?",
		del: prefix + "menu/delete?",
		current: prefix + "get_current_selfmenu_info?"
	}
}

function Wechat(opts) {
	var that = this;
	this.appID = opts.appID;
	this.appSecret = opts.appSecret;
	this.getAccessToken = opts.getAccessToken;//获取票据
	this.saveAccessToken = opts.saveAccessToken;//存储票据
	this.fetchAccessToken;//判断票据是否可用
}

//验证access_token是否合法
Wechat.prototype.isValidAccessToken = function(data) {
	if(!data || !data.access_token || !data.expires_in) {
		return false;
	}
	var access_token = data.access_token;
	var expires_in = data.expires_in;
	var now = (new Date().getTime());
	if(now < expires_in) {
		return true;
	} else {
		return false;
	}
}


//更新access_token
Wechat.prototype.updateAccessToken = function(data) {
	var appID = this.appID;
	var appSecret = this.appSecret;
	var url = api.accessToken + "appid="+appID+"&secret="+appSecret;
	return new Promise(function(resolve,reject) {
		request({url: url,json: true},function(err,response,body) {
			if(!err && response.statusCode === 200) {
				var data = body;
				var now = (new Date().getTime());
				var expires_in = now + (data.expires_in-20) *1000;
				data.expires_in = expires_in;
				resolve(data);
			} else {
				reject();
			}
		})
	});
}

Wechat.prototype.fetchAccessToken = function() {
	var that = this;
	if(this.access_token && this.expires_in) {
		if(this.isValidAccessToken(this)) {
			return Promise.resolve(this);
		}
	}
	return this.getAccessToken()
		.then(function(data) {
			try {
				data = JSON.parse(data);
			}
			catch(e) {//文件不存在或者不合法
				return that.updateAccessToken(data);//获取票据失败，返回更新数据
			}
			if(that.isValidAccessToken(data)) {//access_token是否合法并在有效期内
				return Promise.resolve(data);//将这个票据传递下去   坑.....
			} else {//不合法或过期 则更新
				return that.updateAccessToken();
			}
		}).then(function(data) {//将合法的票据挂在实例上并保存票据
			that.access_token = data.access_token;
			that.expires_in = data.expires_in;
			that.saveAccessToken(data);
			return Promise.resolve(data);
		});
}


Wechat.prototype.createMenu = function(menu) {
	var that = this;
	return new Promise(function(resolve,reject) {
		that.fetchAccessToken()
		.then(function (data) {
			var url = api.menu.create + "access_token="+data.access_token;
			request({method: "POST", url: url,body: menu,json: true},function(err,response,body) {
				if(!err && response.statusCode === 200) {
					var _data = body;
					console.log("_data");
					console.log(_data);
					resolve(_data);
				} else {
					console.log("create menu fails");
					reject(err);
				}
			});
		});
	});
}



Wechat.prototype.getMenu = function() {
	var that = this;
	return new Promise(function(resolve,reject) {
		that.fetchAccessToken()
		.then(function (data) {
			var url = api.menu.get + "access_token="+data.access_token;
			request({url: url,json: true},function(err,response,body) {
				if(!err && response.statusCode === 200) {
					var _data = body;
					console.log("_data");
					console.log(_data);
					resolve(_data);
				} else {
					console.log("get menu fails");
					reject(err);
				}
			});
		});
	});
}


Wechat.prototype.deleteMenu = function() {
	var that = this;
	return new Promise(function(resolve,reject) {
		that.fetchAccessToken()
		.then(function (data) {
			var url = api.menu.del + "access_token="+data.access_token;
			request({url: url,json: true},function(err,response,body) {
				if(!err && response.statusCode === 200) {
					var _data = body;
					console.log("_data");
					console.log(_data);
					resolve(_data);
				} else {
					console.log("delete menu fails");
					reject(err);
				}
			});
		});
	});
}


Wechat.prototype.getCurrentMenu = function() {
	var that = this;
	return new Promise(function(resolve,reject) {
		that.fetchAccessToken()
		.then(function (data) {
			var url = api.menu.current + "access_token="+data.access_token;
			request({ url: url,json: true},function(err,response,body) {
				if(!err && response.statusCode === 200) {
					var _data = body;
					console.log("_data");
					console.log(_data);
					resolve(_data);
				} else {
					console.log("get currrent menu fails");
					reject(err);
				}
			});
		});
	});
}

Wechat.prototype.reply = function() {
	var content = this.body;//要回复的内容
	var message = this.weixin;//用户发送过来的消息
	var xml = util.tpl(content,message);
	this.status = 200;
	this.type = "application/xml";
	this.body = xml;
}
module.exports = Wechat;