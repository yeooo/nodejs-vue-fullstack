/*
 * @Description: 数据库模型
 * @Autor: 庄佩芬
 * @Date: 2019-09-02 17:10:17
 * @LastEditors: 庄佩芬
 * @LastEditTime: 2019-09-24 17:55:43
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }
})

schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})

schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})

module.exports = mongoose.model('Category', schema)