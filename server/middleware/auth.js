/*
 * @Description: 登录校验中间键
 * @Autor: 庄佩芬
 * @Date: 2019-09-18 17:01:54
 * @LastEditors: 庄佩芬
 * @LastEditTime: 2019-09-18 17:33:56
 */

module.exports = options => {
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/AdminUser')
  
  return async (req, res, next) => {

    // 获取前端请求token
    const token = String(req.headers.authorization || '').split(' ').pop();
    if (!token) {
      return res.status(401).send({
        msg: '请登录'
      })
    }
    //验证token 获取用户信息
    const {
      id
    } = jwt.verify(token, req.app.get('secret'))

    if (id == 'undefined') {
      return res.status(401).send({
        msg: '请登录'
      })
    }
    // 根据token解析出来的id进行查询是否有权限
    req.user = await AdminUser.findById(id);
    if (!req.user) {
      return res.status(401).send({
        msg: '请登录'
      })
    }
    await next();
  }
}