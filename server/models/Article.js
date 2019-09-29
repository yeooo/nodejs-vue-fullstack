/*
 * @Description: 
 * @Autor: 庄佩芬
 * @Date: 2019-09-10 17:24:38
 * @LastEditors: 庄佩芬
 * @LastEditTime: 2019-09-10 17:24:38
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }],
  title: {
    type: String
  },
  body: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Article', schema)