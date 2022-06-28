import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserAvatar from '../../../components/UserAvatar'
import { loginOut } from '../../../store/features/userSlice'
import Styles from './index.module.scss'


function AdminHeader (props) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userInfo = useSelector(state => state.user.userInfo)
  const handleMenuClick = ({ key }) => {
    switch (key) {
      case 'goHome':
        navigate('/index')
        break
      case 'loginOut':
        dispatch(loginOut())
        break
      default:
        break
    }
  }

  const menuItems = [
    {
      key: 'goHome',
      label: (<span>返回主页</span>)
    },
    {
      key: 'loginOut',
      label: (<span>退出登录</span>)
    },
  ]

  return (
    <div className={Styles.header}>
      <span className={Styles.headerTitle}>Blog Manager</span>
      {userInfo?.name && <UserAvatar menuItems={menuItems} handleMenuClick={handleMenuClick}></UserAvatar>}
    </div>
  )
}

export default AdminHeader
