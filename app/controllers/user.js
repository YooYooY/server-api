const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const UserService = require('../services/user')
const { secret } = require('../config/index')

class UserController {
  /**
   * 获取用户信息
   * @param {*} ctx
   */
  static async getUserInfo(ctx, next) {
    const userId = parseInt(ctx.params.id)
    let ret
    try {
      ret = ctx.ok(await UserService.getById(userId))
    } catch (ex) {
      ret = ctx.ok({
        errCode: (ex.original && ex.original.errno) || -10000,
        errMsg: (ex.original && ex.original.code) || 'unknown error!',
      })
    }
    ctx.body = ret
    await next
  }
  /**
   * 更新用户信息
   * @param {*} ctx
   * @param {*} next
   */
  static async updateAuthenticatedUser(ctx, next) {
    const req = ctx.request
    const { name, position, company, homePage, brief } = req.body

    const token = req.header['authorization'].substring(7)
    const userData = UserService.getUserDataFromToken(token)
    const uid = userData.id
    const obj = {}
    if (name) obj.name = name
    if (position) obj.position = position
    if (company) obj.company = company
    if (homePage) obj.homePage = homePage
    if (brief) obj.brief = brief
    let ret
    try {
      ret = ctx.ok(await UserService.update(uid, obj))
    } catch (ex) {
      ret = ctx.ok({
        errCode: (ex.original && ex.original.errno) || -10000,
        errMsg: (ex.original && ex.original.code) || 'unknown error!',
      })
    }
  }
  /**
   * 登录逻辑
   * @param {*} ctx
   * @param {*} next
   */
  static async login(ctx) {
    const { body } = ctx.request
    const { username, password } = body
    try {
      if (!username || !password) {
        ctx.status = 400
        ctx.body = {
          error: `expected an object with username, password but got: ${body}`,
        }
        return
      }

      const user = await UserService.getOne(username)
      if (!user) {
        ctx.status = 401
        ctx.body = {
          message: '用户名错误',
        }
        return
      }
      // 匹配密码是否相等
      if (bcrypt.compareSync(password, user.password)) {
        const userInfo = {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          type: user.type,
        }
        ctx.status = 200
        ctx.body = {
          message: '登录成功',
          user: userInfo,
          token: jsonwebtoken.sign(
            {
              data: userInfo,
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // token过期时间是1星期
            },
            secret
          ),
        }
      } else {
        ctx.status = 401
        ctx.body = {
          message: '密码错误',
        }
      }
    } catch (error) {
      ctx.throw(500)
    }
  }
  /**
   * 注册逻辑
   * @param {*} ctx
   */
  static async register(ctx) {
    const { body } = ctx.request
    const username = body.username
    let password = body.password
    const email = body.email
        
    try {
      if (!username || !password || !email) {
        ctx.status = 400

        ctx.body = {
          error: `expected an object with username, password, email but got: ${JSON.stringify(
            body
          )}`,
        }

        return
      }
      
      // 密码加盐
      password = bcrypt.hashSync(password, 5)
      // 先查找是否存在
      let user = await UserService.getOne(username)

      if (!user) {
        const avatar =
          '//qpic.url.cn/feeds_pic/ajNVdqHZLLBK7QyJnicMuicwWVrKhuIc426wEYbIaSlaXZRDuqs2h4XA/'
        user = await UserService.create(username, password, email, avatar)

        ctx.status = 200
        ctx.body = {
          message: '注册成功',
          user,
        }
      } else {
        ctx.status = 406
        ctx.body = {
          message: '用户名已经存在',
        }
      }
    } catch (error) {
      ctx.error(error)
      // ctx.throw(500)
    }
  }
  /**
   * todo 获取用户喜欢过的文章
   * @param {*}} ctx
   * @param {*} next
   */
  static async starred(ctx, next) {
    const userId = parseInt(ctx.params.id)
    const page = parseInt(ctx.query['page'])
    const pageSize = parseInt(ctx.query['per_page'])

    let ret

    try {
      ret = ctx.ok(await UserService.getStarredArticle(page, pageSize, userId))
    } catch (ex) {
      ret = ctx.ok({
        errCode: (ex.original && ex.original.errno) || -10000,
        errMsg: (ex.original && ex.original.code) || 'unknown error!',
      })
    }

    ctx.body = ret

    await next
  }
}

module.exports = {
  login: UserController.login,
  register: UserController.register,
  starred: UserController.starred,
  getUserInfo: UserController.getUserInfo,
  updateAuthenticatedUser: UserController.updateAuthenticatedUser,
}
