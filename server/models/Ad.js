/*
 * @Description: 数据库模型
 * @Autor: 庄佩芬
 * @Date: 2019-09-02 17:10:17
 * @LastEditors: 庄佩芬
 * @LastEditTime: 2019-09-17 10:15:41
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  items: [{
    image: {
      type: String
    },
    url: {
      type: String
    }
  }]
})

module.exports = mongoose.model('Ad', schema)