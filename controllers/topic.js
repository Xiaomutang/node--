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
    const topicID = req.params.topicID;
    if (isNaN(topicID)) {
        return res.send('参数错误');
    }
    topicModel.getById(topicID, (err, topic) => {
        if (err) {
            return res.send('服务器内部错误');
        }
        if (topic) {
            res.render('topic/show.html', {
              topic,
              user: req.session.user
            });
        } else {
            res.send('您查询的话题不存在');
        }
    })
}

exports.showEdit = (req, res) => {
    categoryModel.getAll((err, categories) => {
        const id = req.params.topicID;
        if (isNaN(id)) {
            return res.send('参数错误');
        }
        topicModel.getById(id, (err, topic) => {
            if (err) {
                return res.send('服务器内部错误');
            }
            if (topic) {
                res.render('topic/edit.html', {
                    categories,
                    topic,
                    user: req.session.user
                })
            } else {
                res.send('没有查询到数据');
            }
        })
    })
}

exports.handleTopicID = (req, res) => {
    const id = req.params.topicID;
    req.body.id = id;
    topicModel.update(req.body, (err, isOK) => {
        if (err) {
            return res.json({
                code: 500,
                msg: '服务器内部错误'
            });
        }
        if (isOK) {
            return res.json({
                code: 200,
                msg: '修改成功'
            });
        } else {
            return res.json({
                code: 403,
                msg: '修改失败'
            });
        }
    })
}

exports.hanleDelete = (req, res) => {
    res.send("hanleDelete")
}