const Router = require('koa-router')
const UserController = require('../controllers/user')

const router = new Router({ prefix: '/user' })

router.post('/register',UserController.register)
router.post('/login',UserController.login)
router.get('/getUsers',UserController.getUsers)
router.put('/setUserRole',UserController.setUserRole)
router.del('/delUserById',UserController.delUserById)

module.exports = router