/*
 * @Description: 数据库模型
 * @Autor: 庄佩芬
 * @Date: 2019-09-02 17:10:17
 * @LastEditors: 庄佩芬
 * @LastEditTime: 2019-09-07 17:40:46
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  icon: {
    type: String
  },
})

module.exports = mongoose.model('Item', schema)