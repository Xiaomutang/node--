// 导出
const topicModel = require('../models/topic');
const moment = require('moment');
exports.showIndex = (req, res) => {
    // res.send("showIndex")
    // res.render('index.html');
    topicModel.getAll((err, topics) => {
        if (err) {
            return res.send('服务器内部错误');
        } 
        res.render('index.html', {
            user: req.session.user,
            topics,
            moment
        });
    })   
}