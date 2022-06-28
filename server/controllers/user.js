
const UserModel = require('../models').user

class UserController {
  // 注册
  static async register (ctx) {
    const { name, pwd } = ctx.request.body
    const user = await UserModel.create({ name, pwd })
    if (user) {
      user.pwd = undefined
      ctx.body = { flag: true, msg: '创建用户成功！', user }
    } else {
      ctx.body = { flag: false, msg: '创建用户失败！' }
    }
  }
  //注册
  static async login (ctx) {
    const { name, pwd } = ctx.request.body
    const user = await UserModel.findOne({ where: { name } })
    if (user && user.pwd === pwd) {
      user.pwd = undefined
      ctx.body = { flag: true, msg: '登录成功!', data: user }
    } else {
      ctx.body = { flag: false, msg: '账号或密码错误！' }
    }
  }
  // 获取所有用户
  static async getUsers (ctx) {
    const { current: page = 1, pageSize = 10, keyword = '', order } = ctx.query
    let userOrder = [['createdAt', 'DESC']]
    if (order) {
      userOrder = [order.split(' ')]
    }
    const users = await UserModel.findAndCountAll(
      {
        attributes: { exclude: ['pwd'] },
        offset: (page - 1) * pageSize,
        limit: parseInt(pageSize),
        order: userOrder,
        row: true,
        distinct: true
      }
    )
    ctx.body = users
  }
  // 改变用户权限
  static async setUserRole (ctx) {
    const { id, role } = ctx.request.body
    const [flag] = await UserModel.update({ role }, {
      where: { id }
    })
    ctx.body = { flag }
  }
  // 删除用户
  static async delUserById (ctx) {
    const { id } = ctx.query
    const flag = await UserModel.destroy({
      where: { id }
    })
    ctx.body = { flag }
  }
}

module.exports = UserController