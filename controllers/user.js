const md5 = require('md5');
const userModel = require('../models/user');
// 导出
exports.showSignin = (req, res) => {
    // res.send("showSignin")
    res.render('signin.html');
}

exports.handleSignin = (req, res) => {
  userModel.getByEmail(req.body.email, (err, user) => {
    if (err) {
      return res.send('服务器内部错误');
    }
    // 判断user是否存在
    if (!user) {
      // 不存在
      return res.json({
        code: 401,
        msg: '邮箱不存在，请检查输入或者注册新用户'
      });
    }
    // 判断密码是否正确
    const password = md5(req.body.password);
    if (password === user.password) {
      // 记录session 保存状态
      delete user.password;
      req.session.user = user;
      res.json({
        code: 200,
        msg: '登录成功'
      });
    } else {
      res.json({
        code: 402,
        msg: '密码错误，请重新输入'
      });
    }
  });
}

exports.showSignup = (req, res) => {
    // res.send("showSignup");
    res.render('signup.html');
}

exports.handleSignup = (req, res) => {
  userModel.getByEmail(req.body.email, (err, user) => {
    if (err) {
      return res.send('服务器内部错误');
    }
    if (user) {
      // 邮箱已经存在
      return res.render('signup.html', {
        msg: '邮箱已经存在'
      });
    }
    // 验证昵称
    userModel.getByNickname(req.body.nickname, (err, user) => {
      if (err) {
        return res.send('服务器内部错误');
      }
      if (user) {
        // 昵称已经存在
        return res.render('signup.html', {
          msg: '昵称已经存在'
        });
      }
      req.body.createdAt = new Date();
      req.body.password = md5(req.body.password);
      // 插入用户
      userModel.createUser(req.body, (err, isOK) => {
        if (isOK) {
          res.redirect('/signin');
        } else {
          res.render('signup.html', {
            msg: '注册失败'
          });
        }
      })
    }); 
  });
}

exports.handleSignout = (req, res) => {
    // res.send("handleSignout");
    req.session.destroy();
    res.redirect('/signin');
}