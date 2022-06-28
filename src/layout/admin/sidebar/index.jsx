import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import { ADMIN_MENU } from '../../../config'

// 根据选中菜单设置打开菜单
function getMenuOpenKeys(menu) {
  const list = []
  menu.forEach(item => {
    if (item.children) {
      item.children.forEach(child => {
        list.push({
          key: child.key,
          openKey: item.key
        })
      })
    }
  })
  return list
}
const menuOpenKeys = getMenuOpenKeys(ADMIN_MENU)

function AdminSidebar (props) {
  const navigator = useNavigate()
  // 监听菜单点击
  const handleMenuClick = ({ key }) => {
    navigator(key)
  }
  // 根据选中菜单设置打开菜单
  const target = menuOpenKeys.find(i => i.key === props.selectedKeys[0])
  const openKeys = target ? [target.openKey] : []
  return (
    <Menu
      theme={props.theme ?? 'dark'}
      onClick={handleMenuClick}
      defaultOpenKeys={openKeys}
      selectedKeys={props.selectedKeys}
      mode='inline'
      items={ADMIN_MENU}>
    </Menu>
  )
}

export default AdminSidebar
