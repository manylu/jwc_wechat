"use strict";
var hostname = 'http://186176m22q.imwork.net';
// var hostname = 'http://manylu.com';

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
			"url": "http://ehall.scuec.edu.cn/publicapp/sys/ksapapp/mobile/examArrange/index.html"
		},{
			"name": "课表",
			"type": "view",
			"url": "http://ehall.scuec.edu.cn/publicapp/sys/mykbxt/mobile/mySchoolTimetable/index.html"
		},{
			"name": "空闲教室",
			"type": "view",
			"url": "http://ehall.scuec.edu.cn/publicapp/sys/czxs/mobile/czxs/index.html"
		}]
	},{
		"name": "教务速递",
		"sub_button": [{
			"name": "重要通知",
			"type": "view",
			"url": hostname + "/getInform"
		},{
			"name": "教务动态",
			"type": "view",
			"url": hostname + "/getEntry"
		}]
	},{
		"name": "掌上教务",
		"sub_button": [{
			"name": "办事指南",
			"type": "view",
			"url": "http://baidu.com"
		},{
			"name": "微课程学习",
			"type": "view",
			"url": "http://baidu.com"
		},{
			"name": "联系方式",
			"type": "view",
			"url": "http://baidu.com"
		},{
			"name": "校历testhhh",
			"type": "view",
			"url": "http://baidu.com"
		}]
	}]
}
