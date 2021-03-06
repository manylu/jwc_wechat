const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello string!'
  })
})

router.get('/getInform_10', async (ctx, next) => {
  var informs = '';
  var file="./spider/data/atticleInfo.json";
  var result=fs.readFileSync(file);
  informs = JSON.parse(result);
  ctx.state = {
    title: '重要通知'
  };

  await ctx.render('getInform_10', {
      informs:informs
    });
})

router.get('/getInform', async (ctx, next) => {
  var informs = '';
  var file="./spider/data/atticleInfo.json";
  var result=fs.readFileSync(file);
  informs = JSON.parse(result);
  ctx.state = {
    title: '重要通知'
  };

  await ctx.render('getInform', {
      informs:informs
    });
})

router.get('/getEntry',async function (ctx, next) {
  var entrys = '';
  var file="./spider/data/dynamicEntry.json";
  var result=fs.readFileSync(file);
  entrys = JSON.parse(result);

  ctx.state = {
    title: '教务动态'
  };

  await ctx.render('getEntry', {
      entrys:entrys
    });
   
})

<<<<<<< HEAD
=======
router.get('/getWorkFlow',async function (ctx, next) {
  var entrys = '';
  var file="./spider/data/workFlow.json";
  var result=fs.readFileSync(file);
  entrys = JSON.parse(result);

  ctx.state = {
    title: '业务流程'
  };

  await ctx.render('getWorkFlow', {
          workFlows:entrys
    });
   
})

>>>>>>> 736921e8109e4b52305341dc12d1e3ce668670b1
router.get('/getInform/:id', async (ctx, next) => {
  var informs = ''
  var inform = ''
  var id = ''
  var file="./spider/data/atticleInfo.json";
  var result=fs.readFileSync(file);
  informs = JSON.parse(result);
  id = ctx.params.id
  inform = informs[id]
  ctx.state = {
    title: 'inform title'
  };

  await ctx.render('inform', {
      inform:inform
    });
})

router.get('/getEntry/:id', async (ctx, next) => {
  var entrys = ''
  var entry = ''
  var id = ''
  var file="./spider/data/dynamicEntry.json";
  var result=fs.readFileSync(file);
  entrys = JSON.parse(result);
  id = ctx.params.id
  entry = entrys[id]
  ctx.state = {
    title: 'entry title'
  };

  await ctx.render('entry', {
      entry:entry
    });
})

<<<<<<< HEAD
=======
router.get('/getWorkFlow/:id', async (ctx, next) => {
  var entrys = ''
  var entry = ''
  var id = ''
  var file="./spider/data/workFlow.json";
  var result=fs.readFileSync(file);
  entrys = JSON.parse(result);
  id = ctx.params.id
  entry = entrys[id]
  ctx.state = {
    title: '业务流程'
  };

  await ctx.render('workFlow', {
      workFlow:entry
    });
})

>>>>>>> 736921e8109e4b52305341dc12d1e3ce668670b1
module.exports = router
