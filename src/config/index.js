import { FolderAddOutlined, FolderOutlined, HomeOutlined, SwitcherOutlined, UserOutlined } from "@ant-design/icons"

// 用户权限类型
export const USER_ROLE_TYPES = {
  TOURIST: 0,// 游客
  ADMIN: 1,// 管理员
  ORDINARY: 2,// 普通用户
}

// 前台菜单列表
export const HOME_MENU = [
  {
    label: '首页',
    key:'/index',
    icon:<HomeOutlined/>
  }, {
    label: '分类',
    key:'/categories',
    icon:<FolderOutlined/>
  }
]

// 后台管理菜单列表
export const ADMIN_MENU = [
  {
    icon: <HomeOutlined/>,
    label: '首页',
    key: '/admin/index'
  },
  {
    key: '/admin/article',
    icon: <SwitcherOutlined/>,
    label: '文章',
    children: [
      {
        key: '/admin/article/manager',
        icon: <FolderOutlined/>,
        label: '管理'
      },
      {
        key: '/admin/article/add',
        icon: <FolderAddOutlined/>,
        label: '新增'
      }
    ]
  },
  {
    key: '/admin/user/manager',
    icon: <UserOutlined/>,
    label: '用户管理'
  }
]

// 请求基础地址
export const BASE_URL = 'http://127.0.0.1:3001'
