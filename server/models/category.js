const moment = require('moment')
// category 表
module.exports = (sequelize, dataTypes) => {
  const Category = sequelize.define('category', {
    id: { type: dataTypes.INTEGER(11), primaryKey: true, autoIncrement: true },
    name: { type: dataTypes.STRING(100), allowNull: false, unique: true },
    createdAt: {
      type: dataTypes.DATE,
      defaultValue: dataTypes.NOW,
      get () {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    updatedAt: {
      type: dataTypes.DATE,
      defaultValue: dataTypes.NOW,
      get () {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  })

  Category.associate = models => {
    Category.hasMany(models.article)
  }

  return Category
}
