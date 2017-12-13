"use strict";
var hostname = 'http://ducheng.tunnel.qydev.com'
module.exports = {
	"button": [{
		"name": "微教务",
		"sub_button":[{
			"name": "查询成绩",
			"type": "view",
			"url": "http://ehall.scuec.edu.cn/publicapp/sys/cjcxapp/mobile/gradesQuery/index.html"
		},{
			"name": "考试安排",
			"type": "view",
			"url": "http://ehall.scuec.edu.cn/publicapp/sys/ksapapp/index.do"
		},{
			"name": "课表",
			"type": "view",
			"url": "http://ehall.scuec.edu.cn/publicapp/sys/mykbxt/index.do#/curriculum"
		},{
			"name": "教室",
			"type": "view",
			"url": "http://ehall.scuec.edu.cn/publicapp/sys/czxs/index.do"
		},{
			"name": "校历",
			"type": "view",
			"url": "http://baidu.com"
		}]
	},{
		"name": "教务速递",
		"sub_button": [{
			"name": "重要通知",
			"type": "view",
			"url": hostname + "/getInform"
		},{
			"name": "讲座预告",
			"type": "view",
			"url": hostname + "/getEntry"
		},{
			"name": "教务动态",
			"type": "view",
			"url": "http://baidu.com"
		},{
			"name": "活动分享",
			"type": "view",
			"url": "http://baidu.com"
		}]
	},{
		"name": "掌上教务",
		"sub_button": [{
			"name": "联系方式",
			"type": "view",
			"url": "http://baidu.com"
		},{
			"name": "微课程学习",
			"type": "view",
			"url": "http://baidu.com"
		},{
			"name": "办事指南",
			"type": "view",
			"url": "http://baidu.com"
		}]
	}]
}
