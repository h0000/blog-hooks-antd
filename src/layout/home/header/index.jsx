
import { Layout, Row, Col, Menu, Input } from 'antd'
import Styles from './index.module.scss'
import { HOME_MENU } from '../../../config'
import { SearchOutlined } from '@ant-design/icons'
import Login from '../../../components/Login'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Header = Layout.Header

// 响应式
const responsiveLeft = { xxl: 8, xl: 8, lg: 8, sm: 8, xs: 24 }
const responsiveRight = { xxl: 16, xl: 16, lg: 16, sm: 16, xs: 0 }

const HomeHeader = () => {
  const location = useLocation()
  const navigate = useNavigate()
  // 监听菜单点击
  const handleMenuClick = ({ key }) => {
    navigate(key)
  }

  // 搜索框值初始化
  const [inputValue, setInputValue] = useState('')
  // 监听搜索框值改变
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  // 监听搜索
  const handleSearch = () => {
    if (inputValue.trim()) {
      navigate(`/search/${inputValue}`)
      setInputValue('')
    }
  }
  return (
    <Header className={Styles.appHeader}>
      <Row className={Styles.content}>
        <Col {...responsiveLeft} style={{ display: 'flex', alignItems: 'center' }}>
          <Input value={inputValue} onChange={handleInputChange} prefix={<SearchOutlined style={{ color: 'var(--border-color)' }} />} bordered={false} placeholder='在此输入搜索内容' onPressEnter={handleSearch}></Input>
        </Col>
        <Col {...responsiveRight} style={{ display: 'flex', justifyContent: 'right' }}>
          <Menu onClick={handleMenuClick} selectedKeys={[location.pathname]} mode="horizontal" items={HOME_MENU}></Menu>
          <Login />
        </Col>
      </Row>
    </Header>
  )
}

export default HomeHeader
