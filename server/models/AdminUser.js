/*
 * @Description: 数据库模型
 * @Autor: 庄佩芬
 * @Date: 2019-09-02 17:10:17
 * @LastEditors: 庄佩芬
 * @LastEditTime: 2019-09-17 14:37:43
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    select: false,//不允许被查询
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  }
})

module.exports = mongoose.model('AdminUser', schema)