const Router = require('koa-router')
const ArticleController = require('../controllers/article')

// 基础路径：/article
const router = new Router({ prefix: '/article' })

router.get('/getArticle', ArticleController.getArticleById)

router.get('/getList', ArticleController.getList)
router.post('/addArticle', ArticleController.addArticle)
router.put('/updateArticle', ArticleController.updateArticle)
router.delete('/delArticleById', ArticleController.delArticleById)

module.exports = router