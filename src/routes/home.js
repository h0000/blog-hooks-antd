
import { Navigate } from 'react-router-dom'
import Layout from '../layout/home'
import Home from '../views/home'
import Article from '../views/home/article'
import Categories from '../views/home/categories'

// const Home = React.lazy(()=>import('../views/home'))
// const Article = React.lazy(()=>import('../views/home/article'))
// const Categories = React.lazy(()=>import('../views/home/categories'))


export default {
  path: '/',
  name: 'home',
  element: <Layout />,
  children: [
    { path: '', element: <Navigate to='index' /> },
    { path: 'index', element: <Home /> },
    { path: 'article/:id', element: <Article /> },
    { path: 'categories', element: <Categories /> },
    { path: 'search', element: <Home /> },
    { path: 'categories/:id', element: <Home /> },
  ],
}
