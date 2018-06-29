// 程序入口
var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');
var art = require('express-art-template');
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