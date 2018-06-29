// 程序入口
var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');
var art = require('express-art-template');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const config = require('./config');
var app = express();
// 配置express-art-template
app.engine('html', require('express-art-template'));
// 配置body-parser包
// 成功之后 req.body(请求体)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 统一处理静态资源
app.use('/public', express.static('./public/'));
app.use('/node_modules', express.static('./node_modules/'));
var db = config.database;
// 把session保存到mysql中
var options = {
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.database
};

var sessionStore = new MySQLStore(options);
// 配置session
app.use(session({
  key: 'sessionid',  // 修改sessionid的名称
  secret: 'keyboard cat',  // 对sessionid 进行加密 
  resave: false,   // 强制重新存储服务器上的session数据  
  store: sessionStore,   // 配置把session数据存储到mysql
  saveUninitialized: true  // 即使不写session 也会生成sessionid
}));
// 5 在app.js导入 并且 挂载路由 app.use(router)
app.use(router);
// 监听端口
app.listen(3000, () => {
    console.log('haobang');
})

// 模块化  commonjs  AMD  require.js  CMD   sea.js
// 前端模块化解决问题
            // 文件依赖
            // 变量命名污染