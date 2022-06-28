const Joi = require('joi')

const ArticleModel = require('../models').article
const CategoryModel = require('../models').category

class ArticleController {
  // 添加文章
  static async addArticle (ctx) {
    const { title, content, categoryName } = ctx.request.body
    let category
    // 查询或创建分类
    if (categoryName.trim()) {
      [category] = await CategoryModel.findOrCreate({
        where: { name: categoryName },
        defaults: {
          name: categoryName
        }
      })
    }
    // 创建文章
    const [article,flag] = await ArticleModel.findOrCreate({
      where: { title },
      defaults:{title, content, categoryId: category.id}
    })
    ctx.body = { flag: flag, id: article.id }
  }
  // 更新文章
  static async updateArticle (ctx) {
    const { id, title, content, categoryName } = ctx.request.body
    let category
    // 查询或创建分类
    if (categoryName.trim()) {
      [category] = await CategoryModel.findOrCreate({
        where: { name: categoryName },
        defaults: {
          name: categoryName
        }
      })
    }
    const [flag] = await ArticleModel.update({ title, content, categoryId: category.id }, { where: { id } })
    ctx.body = { flag }
  }
  // 删除文章
  static async delArticleById (ctx) {
    const { id } = ctx.query
    // try {
    const flag = await ArticleModel.destroy({ where: { id } })
    // } catch (error) {
    //   ctx.body = error
    // }

    ctx.body = { flag }
  }
  // 获取文章列表
  static async getList (ctx) {
    const { current: page = 1, pageSize = 10, preview, keyword = '', order, categoryId } = ctx.query

    let articleOrder = [['createdAt', 'DESC']]
    if (order) {
      articleOrder = [order.split(' ')]
    }

    // 查询语句
    const whereObj = {
      $or: {
        title: {
          $like: `%${keyword}%`
        },
        content: {
          $like: `%${keyword}%`
        }
      }
    }
    // 当query包含分类id时
    if (categoryId) {
      whereObj.categoryId = { $eq: categoryId }
    }

    const data = await ArticleModel.findAndCountAll({
      where: whereObj,
      include: CategoryModel,
      offset: (page - 1) * pageSize,
      limit: parseInt(pageSize),
      order: articleOrder,
      row: true,
      distinct: true // count 计算
    })
    if (preview === '1') {
      data.rows.forEach(i => {
        i.content = i.content.slice(0, 500) + '...' // 只是获取预览，减少打了的数据传输。。。
      })
    }
    ctx.body = data
  }
  // 获取详情
  static async getArticleById (ctx) {
    const { id } = ctx.query
    const article = await ArticleModel.findOne(
      {
        where: { id },
        include: CategoryModel
      }
    )
    // 阅读+1
    article && await ArticleModel.increment({ viewCount: 1 }, { where: { id } })
    ctx.body = { flag: !!article, data: article }
  }

}

module.exports = ArticleController