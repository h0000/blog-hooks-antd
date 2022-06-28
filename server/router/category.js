const Router = require('koa-router')
const CategoryController = require('../controllers/category')

// 基础路径：/article
const router = new Router({ prefix: '/category' })

router.get('/getAll', CategoryController.getCategories)

module.exports = router