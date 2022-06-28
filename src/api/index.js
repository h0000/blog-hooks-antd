import { del, get, post, put } from '../utils/fetch'

// 获取栏目列表
export const getCategoryList = async () => {
  return get('/category/getAll')
}
// 添加文章
export const addArticle = async (data) => {
  return post('/article/addArticle', data)
}
// 更新文章
export const updateArticle = async (data) => {
  return put('/article/updateArticle', data)
}
// 获取文章列表
export const getArticleList = async (query) => {
  return get('/article/getList', query)
}
// 登录
export const login = async (form) => {
  return post('/user/login', form)
}
// 注册
export const register = async (form) => {
  return post('/user/register', form)
}
// 根据id获取文章
export const getArticleById = async (id) => {
  return get('/article/getArticle', { id })
}
// 根据id删除文章
export const delArticleById = async (id) => {
  return del('/article/delArticleById', { id })
}
// 获取所有用户
export const getUsers = async (query) => {
  return get('/user/getUsers', query)
}
// 更新用户权限
export const updateUserRole = async (data) => {
  return put('/user/setUserRole', data)
}
// 删除用户
export const delUser = async (id) => {
  return del('/user/delUserById', { id })
}

