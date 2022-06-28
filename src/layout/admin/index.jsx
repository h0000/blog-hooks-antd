// import React, { useState, useEffect } from 'react'
// // import './styles/admin.less'

import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Layout } from 'antd'
import AdminSideBar from './sidebar'
import AdminHeader from './header'
import Styles from './index.module.scss'
import { useSelector } from "react-redux"
import { useEffect } from "react"
//  import Breadcrumb from '@/components/Breadcrumb'

const { Sider, Header, Content } = Layout

export default function AdminLayout (props) {
  const location = useLocation()
  const navigator = useNavigate()
  const userInfo = useSelector(state => state.user.userInfo)
  useEffect(() => {
    // 权限判断
    if (!(userInfo && userInfo.name && userInfo.role === 1)) {
      navigator('/index')
    }
  }, [userInfo])
  return (
    <Layout className={Styles.adminContainer}>
      <Header className={Styles.adminHeader}>
        <AdminHeader ><div>test</div></AdminHeader>
      </Header>
      <Layout>
        <Sider width={200} className={Styles.layoutSider}>
          <AdminSideBar selectedKeys={[location.pathname]} theme='ligth' />
        </Sider>
        <Layout>
          {/* <Breadcrumb /> */}
          <Content className={Styles.adminContent}>
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
