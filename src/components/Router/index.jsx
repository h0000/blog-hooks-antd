import { useSelector } from "react-redux"
import { useRoutes } from "react-router-dom"
import ROUTES from "../../routes"

// 过滤掉没有权限的路由
const authRoutes = (routes, role) => {
  const newRoutes = routes.filter(item => {
    if (item.children && !(item.role && !item.role.includes(role))) {
      item.children = authRoutes(item.children, role)
    }
    return !(item.role && !item.role.includes(role))
  })
  return newRoutes
}

export default function Index () {
  const userInfo = useSelector(state => state.user.userInfo)
  // 过滤掉没有权限的路由
  const routes = authRoutes(ROUTES, userInfo?.role)
  const element = useRoutes(routes)
  return (element)
}