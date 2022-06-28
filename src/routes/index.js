import homeRoutes from './home'
import adminRoutes from './admin'
import ErrorPage from '../components/404'

const routes = [
  adminRoutes,
  homeRoutes,
  {
    path: '*',
    element: <ErrorPage />
  }
  // ..
]

export default routes
