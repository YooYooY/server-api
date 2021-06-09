const koaRouter = require('koa-router')
const jwt = require('../middlewares/jwt')
const user = require('../controllers/user')

const router = koaRouter({
  prefix: '/api/v1',
})

/**
 * 登录: /user/login
 * {POST}
 */
router.post('/user/login', user.login)

/**
 * 注册逻辑: /user/register
 * {POST}
 */
router.post('/user/register', user.register)

/**
 * 当前登录用户信息: /user
 * {GET}
 */
router.get('/user/:id', user.getUserInfo)

/**
 * 修改用户信息: /user
 */
router.put('/user', jwt, user.updateAuthenticatedUser)

// /**
//  * 用户创建商品列表: /user/:id/article?page=1&per_page=10
//  * {GET}
//  */
// router.get('/user/:id/goods', user.article);

/**
 * 用户的商品列表: /user/:id/starred?page=1&per_page=10
 * {GET}
 */
router.get('/user/:id/starred', user.starred)


module.exports = router;