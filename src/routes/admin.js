import Layout from '../layout/admin'
import AdminHome from '../views/admin/home'
import Edit from '../views/admin/article/edit'
import ArticleManager from '../views/admin/article/manager'
import UserManager from '../views/admin/user/manager'
import { Navigate } from 'react-router-dom'

// const AdminHome = React.lazy(()=>import('../views/admin/home'))
// const Edit = React.lazy(()=>import('../views/admin/article/edit'))
// const ArticleManager = React.lazy(()=>import('../views/admin/article/manager'))


export default {
  path: 'admin',
  role: [1],//管理员才能访问
  element: <Layout />,
  children: [
    { path: '', element: <Navigate to='index' /> },
    { path: 'index', element: <AdminHome /> },
    { path: 'article/edit/:id', element: <Edit /> },
    { path: 'article/add', element: <Edit /> },
    { path: 'article/manager', element: <ArticleManager /> },
    { path: 'user/manager', element: <UserManager /> },
  ]
}
