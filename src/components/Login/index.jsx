import { Button } from "antd"
import { useState } from "react"
import Styles from './index.module.scss'
import { Modal } from 'antd'
import LoginForm from "../Form/Login"
import RegisterForm from '../Form/Register'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import UserAvatar from "../UserAvatar"
import { useNavigate } from "react-router-dom"
import { loginOut } from "../../store/features/userSlice"


export default function Login (props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // 用户信息
  const userInfo = useSelector(state => state.user.userInfo)

  useEffect(() => {
    // 关闭模态框
    if (modalShow.state) {
      setModelShow({ name: '', state: false })
    }
  }, [userInfo])
  //模态框显示
  const [modalShow, setModelShow] = useState({
    name: '',
    state: false
  })

  // 监听按钮点击
  const handleBtnClick = (type) => {
    switch (type) {
      case '登录':
        setModelShow({ name: type, state: true })
        break
      case '注册':
        setModelShow({ name: type, state: true })
        break
      default:
        break
    }
  }
  // 监听模态框关闭
  const handleCancel = () => {
    setModelShow({ name: '', state: false })
  }
  // 监听头像下拉菜单列表点击
  const handleMenuClick = ({ key }) => {
    switch (key) {
      case 'goAdmin':
        navigate('/admin/index')
        break
      case 'loginOut':
        dispatch(loginOut())
        break
      default:
        break
    }
  }
  // 头像下拉列表元素
  const menuItems = () => {
    const menu = [
      {
        key: 'loginOut',
        label: (<span>退出登录</span>)
      },
    ]
    if (userInfo.role === 1) {
      menu.unshift({
        key: 'goAdmin',
        label: (<span>后台管理</span>)
      })
    }
    return menu
  }

  return (
    <div className={Styles.loginWrap}>
      {!userInfo?.name ? <>
        <Button onClick={() => handleBtnClick('登录')} size='small' type='primary' ghost>登录</Button>
        <Button onClick={() => handleBtnClick('注册')} size='small' ghost danger>注册</Button>
      </> : <UserAvatar menuItems={menuItems()} handleMenuClick={handleMenuClick}></UserAvatar>}
      <Modal footer={null} title={modalShow.name} visible={modalShow.state} onCancel={handleCancel}>
        {modalShow.name === '登录' && <LoginForm />}
        {modalShow.name === '注册' && <RegisterForm />}
      </Modal>
    </div>
  )
}