/*
 * @Description: 
  RESTFUL
  将通用的接口改造成通用CRUD接口
  常规增删改查，将接口路径设置为动态，然后根据请求接口链接获取目标资源从而请求对应的数据库
 * @Autor: 庄佩芬
 * @Date: 2019-09-02 16:28:30
 * @LastEditors: 庄佩芬
 * @LastEditTime: 2019-10-08 15:28:54
 */
module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams: true
  })

  // 引入中间腱
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')

  // 创建接口
  router.post('/', async (req, res) => {
    const data = await req.Model.create(req.body)
    res.status(200).send({
      msg: '操作成功！',
      result: data
    })
  })

  // 获取资源
  router.get('/', async (req, res) => {
    // 有些资源请求不需要关联查其他数据 就需要特殊操作
    // const data = await req.Model.find().populate('parent').limit(10)
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    if (req.Model.modelName === 'Article') {
      queryOptions.populate = 'categories'
    }
    const data = await req.Model.find().setOptions(queryOptions).limit(100)

    res.status(200).send({
      msg: '操作成功！',
      result: data
    })
  })

  // 删除接口
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id);
    res.status(200).send({
      msg: '删除成功！'
    })
  })

  // 获取单条数据接口
  router.get('/:id', async (req, res) => {
    const data = await req.Model.findById(req.params.id)
    res.status(200).send({
      msg: '操作成功！',
      result: data
    })
  })

  // 编辑接口
  router.put('/:id', async (req, res) => {
    const data = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).send({
      msg: '操作成功！',
      result: data
    })
  })

  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(),
    router)

  const multer = require('multer')
  // 目标地址
  const upload = multer({
    dest: __dirname + '/../../upload'
  })
  //express本身无法接受文件上传的数据，需要一个中间件来处理上传文件 multer
  // upload.single接受单个上传文件
  // file是前端通过file字段传输数据给服务器
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file;
    file.url = `http://47.107.167.119/upload/${file.filename}`

    res.status(200).send({
      msg: '上传成功！',
      result: file
    })
  })

  app.post('/admin/api/login', async (req, res) => {
    const {
      username,
      password
    } = req.body

    // assert(!username, 401, '用户名不能为空')
    // assert(!password, 401, '密码不能为空')
    if (!username) {
      return res.status(422).send({
        msg: '用户名不能为空'
      })
    }
    if (!password) {
      return res.status(422).send({
        msg: '密码不能为空'
      })
    }

    // 1,根据用户名找用户
    // model中设置了password不可查询 使用select('+password')代表把password也添加入查询
    const user = await AdminUser.findOne({
      username
    }).select('+password')

    // assert(!user, 401, '用户不存在')
    if (!user) {
      return res.status(422).send({
        msg: '用户不存在'
      })
    }

    // 2,校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    if (!isValid) {
      return res.status(422).send({
        msg: '密码不正确'
      })
    }

    // 3,返回token
    // 生成token
    const token = jwt.sign({
      id: user._id
    }, app.get('secret'))
    res.send({
      msg: '登录成功！',
      result: token
    })
  })

  // 错误处理函数
  // app.use(async (err, req, res, next) => {
  //   try {
  //     res.status(err.statusCode || 500).send({
  //       msg: err.message
  //     })
  //   } catch (err) {
  //     next(err);
  //   }
  // })
}