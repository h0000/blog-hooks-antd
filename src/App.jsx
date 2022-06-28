import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './components/Router'
import './App.css'
// import NProgress from './components/NProgress'

function App () {

  return (
    // <Suspense fallback={<NProgress />}> 懒加载导致路由切换后头部菜单不显示，暂时不使用懒加载
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    // </Suspense>
  )
}

export default App
