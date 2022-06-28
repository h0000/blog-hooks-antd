import { message, Popconfirm, Switch, Table } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import { delUser, getUsers, updateUserRole } from '../../../../api'

export default function UserManager (props) {

  const [users, setUsers] = useState([])

  // 获取用户
  const getAllUsers = (query) => {
    getUsers(query).then(res => {
      const {count} = res
      setPagination({...query,total:count})
      const users = res.rows.map(item => {
        item.loading = false
        return item
      })
      setUsers(users)
    })
  }
  // 监听管理员状态开关切换
  const handleRoleSwtichChange = async (userId, value) => {
    // 设置开关loading状态
    setUsers(users.map(item => item.id === userId ? { ...item, loading: true } : item))
    // 发起请求
    const res = await updateUserRole({ id: userId, role: value === true ? 1 : 2 })
    if (res.flag) {
      setUsers(users.map(item => item.id === userId ? { ...item, loading: false, role: value === true ? 1 : 2 } : item))
      message.success('设置成功！')
    } else {
      setUsers(users.map(item => item.id === userId ? { ...item, loading: false } : item))
      message.error('设置失败！')
    }
  }
  // 监听删除用户按钮确认
  const handleDelConfirm = async (userId) => {
    const res = await delUser(userId)
    if (res.flag) {
      message.success('删除成功！')
      getAllUsers(pagination)
    } else {
      message.error('删除失败！')
    }
  }

  //分页
  const [pagination, setPagination] = useState({
    pageSize: 1,
    current: 1,
    total: 0
  })
  const handlePageChnage = (page) => {
    const newPagination = { ...pagination, current: page }
    getAllUsers(newPagination)
  }
  // 初始化
  useEffect(() => {
    getAllUsers(pagination)
  }, [])



  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '昵称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
    },
    {
      title: '是否管理员',
      dataIndex: 'role',
      render: (text, record) => <Switch loading={record.loading} checked={text === 1} onChange={(checked) => { handleRoleSwtichChange(record.id, checked) }} />
    },
    {
      dataIndex: 'id',
      title: '操作',
      render: (userId, record) => (
        <Popconfirm title='确定删除吗？' cancelText='取消' okText='确认' onConfirm={() => handleDelConfirm(userId)}>
          <a>删除</a>
        </Popconfirm>
      )
    }
  ]

  return (
    <Table
      dataSource={users}
      columns={columns}
      pagination={{
        ...pagination,
        onChange: handlePageChnage
      }}
      rowKey='id'
    />
  )
}