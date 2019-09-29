/*
 * @Description: 
 * @Autor: 庄佩芬
 * @Date: 2019-09-18 17:02:50
 * @LastEditors: 庄佩芬
 * @LastEditTime: 2019-09-18 17:39:13
 */
module.exports = options => {
  return async (req, res, next) => {
    // 常规增删改查，将接口路径设置为动态，然后根据请求接口链接获取目标资源从而请求对应的数据库
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
    next()
  }
}