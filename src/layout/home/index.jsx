import React from 'react'
import { Layout, Row, Col, BackTop } from 'antd'

import Header from './header'
import { Outlet } from 'react-router-dom'
import Styles from './index.module.scss'

// 响应式
// const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 }
// const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 }

const HomeLayout = props => {
  return (
    <Layout style={{backgroundColor:'var(--bg-color'}}>
      <Header />
      <div className={Styles.contentWrap}>
        <Outlet className='asas' />
      </div>
      <BackTop target={() => document.querySelector('#root')} />
    </Layout>
  )
}

export default HomeLayout
