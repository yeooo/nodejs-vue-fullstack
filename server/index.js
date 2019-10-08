/*
 * @Description:
 * @Autor: 庄佩芬
 * @Date: 2019-09-02 16:25:38
 * @LastEditors: 庄佩芬
 * @LastEditTime: 2019-10-08 11:39:10
 */
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('secret', '123456')

// 设置跨域
app.use(require('cors')())
// 接受json参数
app.use(express.json())
app.use(bodyParser.json()); //数据JSON类型
app.use(bodyParser.urlencoded({
  extended: false
})) //解析post请求数据

// 静态文件托管
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web'))
app.use('/upload', express.static(__dirname + '/upload'))

require('./plugins/db')(app)
require('./routes/admin/index')(app)
require('./routes/web/index')(app)

app.listen(3001, () => {
  console.log('server stared on 3001...')
})