// 1 安装express
var express = require('express');

// 导入
var user = require('./controllers/user');
var topic = require('./controllers/topic');
var index = require('./controllers/index');

// 2 express.Router() 
var router = express.Router();

// 3 router.get()
// 首页路由
router.get('/', index.showIndex);

// 用户路由
router
    .get('/signin', user.showSignin)
    .post('/signin', user.handleSignin)
    .get('/signup', user.showSignup)
    .post('/signup', user.handleSignup)
    .get('/signout', user.handleSignout);

// 话题路由
router
    .get('/topic/create', topic.showTopic)
    .post('/topic/create', topic.handleTopic)
    
    .get('/topic/:topicID', topic.showTopicID)
    .get('/topic/:topicID/edit', topic.showEdit)
    .post('/topic/:topicID/edit', topic.handleTopicID)
    .get('/topic/:topicID/delete', topic.hanleDelete);

// 4 导出router
module.exports = router;