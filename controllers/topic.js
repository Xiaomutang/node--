const categoryModel = require('../models/category');
const topicModel = require('../models/topic');
exports.showTopic = (req, res) => {
    // res.send("showTopic")
    categoryModel.getAll((err, categories) => {
        res.render('topic/create.html', {
            categories,
            user: req.session.user
        });
    });
};

exports.handleTopic = (req, res) => {
    // res.send("handleTopic")
    if (!req.session.user) {
        res.json({
            code: 403,
            msg: '登录过期，请先登录'
        });
    }
    req.body.userId = req.session.user.id;
    req.body.createdAt = new Date();
    topicModel.createTopic(req.body, (err, isOK) => {
        if (err) {
            return res.json({
                code: 500,
                msg: '服务器内部错误'
            });
        }
        if (isOK) {
            res.json({
                code: 200,
                msg: '添加成功'
            });
        } else {
            res.json({
                code: 400,
                msg: '话题添加失败'
            });
        }
    })
}

exports.showTopicID = (req, res) => {
    res.send("showTopicID")
}

exports.showEdit = (req, res) => {
    res.send("showEdit")
}

exports.handleTopicID = (req, res) => {
    res.send("handleTopicID")
}

exports.hanleDelete = (req, res) => {
    res.send("hanleDelete")
}