/*
 * @Description:数据库
 * @Autor: 庄佩芬
 * @Date: 2019-09-02 16:31:34
 * @LastEditors: 庄佩芬
 * @LastEditTime: 2019-09-24 16:08:34
 */
module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
    useNewUrlParser: true
  })

  require('require-all')(__dirname + '/../models')
  
}