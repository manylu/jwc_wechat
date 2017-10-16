var http = require('http')
var cheerio=require('cheerio')
var superagent=require('superagent')
var fs=require('fs')
var path=require('path')
var async=require('async')
var eventproxy=require('eventproxy')
var cronJob=require('cron').CronJob
var ep=new eventproxy()
var titleNum=0
var timestamp=(new Date()).valueOf()*100000; 
var targetUrl=['http://webplus.scuec.edu.cn/s/27/t/1536/p/14/i.jspy?'+timestamp,'http://www.scuec.edu.cn/s/27/t/1536/p/15/i.htm?'+timestamp]
// var titleRecordUrl='http://webplus.scuec.edu.cn/s/27/t/1536/p/14/i.jspy?'+timestamp
var jsonPath=['./data/atticleInfo.json','./data/dynamicEntry.json']
// var ArticleUrls=[]
var count=0
// var requireNumber=0
var titles=[]
function dataHandle(dataHandle,target,requireNumber){
    // var $=cheerio.load(html)
    // var essayMore=$('#container_content').find('table')
    // .find('table').find('td').next().children('table')
    // .eq(0).find('table').eq(0).find('div').find('a').attr('href')
    // var maxMessageUrl=content.match(/p\/(\S*)\/list.htm/)[1]
    // console.log(maxMessageUrl)
    var pageUrls=[]
    console.log(target)
    var famillyUrl=target.match(/p\/(\S*)\/i./)[1]  
    for(var i=dataHandle;i>0;i--){
        pageUrls.push('http://webplus.scuec.edu.cn/s/27/t/1536/p/'+ famillyUrl +'/i/'+i+'/list.jspy')
    }
    console.log(pageUrls)
    start(pageUrls,requireNumber)
    
    // setTimeout(function(){
    //     // console.log(announcement)
    //     // var articleLinks=announcement.map(function(value){return value.link})
    //     // console.log(articleLinks)
        
    // },1000)
   
}
function saveData(path,data){
    fs.writeFile(path,JSON.stringify(data,null,4),function(err){
        if(err){
            return console.log(err)
        }
        console.log('Data saved')
    })
}

function start(pageUrls,requireNumber){
    console.log('进入start')
    var count=0
    var announcement=[]
    pageUrls.forEach(function(pageUrl) {
        http.get(pageUrl,function(res){
            var html='';
            console.log(pageUrl)
            res.on('data',function(data){
                html+=data;
            })
            res.on('end',function(){
                var $=cheerio.load(html) 
                // var maxPage=parseInt(html/14)
                // var essayHref=$('#newlist').find('table').find('tr').find('td').eq(1).find('table').find('a').attr('href');
                var titleList=$('#newslist').find('table').eq(0).find('tr').find('table').find('a')
                console.log('进入end')
                console.log(titleNum)
                titleList.each(function(item){
                    var title=$(this).find('font').text()
                    var link='http://www.scuec.edu.cn'+$(this).attr('href')
                    // ArticleUrls.push(link)
                    // console.log(link)

                    // console.log(link)
                    // getArticle(link,title)
                   
                    ep.emit('articleHtml',link)
                })
               
            //    console.log(announcement)
                // console.log(list)
                // console.log(html)fs.writeFileSync('jsonfile.json',announcement)
            })
        }).on('error',function(){
            console.log('faild!!')
        })

        
    });
    // console.log(announcement)
    ep.after('articleHtml',titleNum,function(article){
        console.log('进入after')
        console.log(titleNum)
        var curCount = 0;
        var reptileMove = function(url,callback){
            // 延迟毫秒数
            var delay = parseInt((Math.random() * 30000000) % 1000, 10);
            curCount++;
            // console.log('现在的并发数是', curCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒'); 
            superagent
                .get(url)
                .end(function(error,data){
                    if(error){
                        console.log("error exception occured !"+data.status);
                        
                    }
                    var $=cheerio.load(data.text)
                    
                    var title=$('.biaoti3').text()
                    // titles.push(title)
                    var matches=$('.STYLE2').text().match(/\d+/g)
                    var date=matches[0] + '-' + matches[1]+'-' + matches[2]
                    var entry=[]
                    var table=[]
                    var duanluoLength=$('.content').find('p').length
                    // $('.content>p').each(function(){
                    //     var dl=$(this).text()
                    //     entry.push($(this).text())
                    //     ep.emit('duanluo',dl)
                        
                    // })
                    var tableList=$('.content table tr')
                    for(var i=0;i<tableList.length;i++){
                        var td=$('.content table tr').eq(i).children()
                        var tr=[];
                        // console.log(td)
                        // console.log(td.text())
                        for(var j=0;j<td.length;j++){
                            // if(td.length<$('.content table tr').eq(0).children().length){
                            //     tr.push('')
                            // }
                            tr.push(td.eq(j).find('p').text())
                            // console.log(tr)
                        }
                        table.push(tr)
                        
                    }
                    // console.log(table)
                    // ep.after('duanluo',duanluoLength,function(p){
                        // console.log(p)
                       
                    var pArr=$(".content>p")
                    for(var i=0;i<$(".content>p").length;i++){
                        entry.push(pArr.eq(i).text())
                    } 
                    var list={
                        title:title,
                        date:date,
                        content:{
                            entry:entry,
                            table:table
                        } 
                    } 
                   
                    announcement.push(list)
                    // })
                    
                    // console.log(count++)
                    
                    
                    
                })
            setTimeout(function() {
                curCount--;
                callback(null,url +'Call back content');
            }, delay);
            
        };
        
        async.mapLimit(article, 5 ,function (url, callback) {
            reptileMove(url, callback);
          }, function (err,result) {
            console.log('标题总量',titles.length)
            announcement.sort(function(a,b){
                return  Date.parse(b.date)-Date.parse(a.date);//时间正序
            })
            // console.log('标题',titles)
            // console.log('时间排序后：',)
            // console.log('json:',announcement)
            
            // saveData(jsonPath[requireNumber],announcement)
            saveData(path.join(__dirname,jsonPath[requireNumber]),announcement)
            requireNumber++;
            if(requireNumber<targetUrl.length){
                dataRequire(requireNumber);
            }
        });


    })
        
        
}
function dataRequire(requireNumber){
    
    http.get(targetUrl[requireNumber],function(res){
        var html=''
    
        res.on('data',function(data){
            html+=data
        })  
        res.on('end',function(){
    
            var maxPage=Math.ceil(html/14)
            titleNum=parseInt(html)
            console.log(maxPage)
            console.log("开始执行！")
            dataHandle(maxPage,targetUrl[requireNumber],requireNumber)
        })
    }).on('error',function(){
        console.log('获取出错！')
    })
}
function job(){
    var requireNumber=0
    return new cronJob('00 48 17 * * *',function(){
        dataRequire(requireNumber)
    },null,true,'Asia/Chongqing');

}
module.exports=job

