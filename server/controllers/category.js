const sequelize = require('sequelize')

const CategoryModel = require('../models').category
const ArticleModel = require('../models').article

class CategoriesController {
  // 获取分类数据
  static async getCategories (ctx) {
    const categories = await CategoryModel.findAll({
      attributes: {
        include: [
          [// 注意下面的调用中的括号！https://www.sequelize.com.cn/other-topics/sub-queries
            sequelize.literal(`(SELECT COUNT(*) FROM articles AS article WHERE article.categoryId = category.id)`),
            'count'
          ]
        ]
      }
    })
    ctx.body = categories
  }
}

module.exports = CategoriesController