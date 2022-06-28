
import { Table, Tag, message, Popconfirm } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { delArticleById, getArticleList } from '../../../../api'
import Styles from './index.module.scss'




export default function ArticleManager (props) {
  // 删除文章
  const handleDelConfirm = (id) => {
    delArticleById(id).then(res => {
      if (res.flag) {
        message.success('该文章删除成功！')
        // 刷新数据
        getArticles(pagination)
      } else {
        message.error('该文章删除失败！')
      }
    })
  }

  // 设置表格列
  const columns = [
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '分类',
      dataIndex: 'category',
      render: (text, record) => (
        <Tag color='blue' key={text.name}>
          <Link to={`/categories/${text.id}`}>{text.name}</Link>
        </Tag>
      )
    },
    {
      title: '浏览数',
      dataIndex: 'viewCount'
    },
    {
      title: '发布时间',
      dataIndex: 'createdAt'
    },
    {
      title: '修改时间',
      dataIndex: 'updatedAt'
    },
    {
      dataIndex: 'id',
      title: '操作',
      render: (articleId, record) => {
        return (
          <ul className={Styles.actions}>
            <li>
              <Link to={`/article/${articleId}`}>查看</Link>
            </li>
            <li>
              <Link to={`/admin/article/edit/${articleId}`}>编辑</Link>
            </li>
            <li>
              <Popconfirm title='确定删除吗？' cancelText='取消' okText='确认' onConfirm={() => handleDelConfirm(articleId)}>
                <a>删除</a>
              </Popconfirm>
            </li>
          </ul>
        )
      }
    }
  ]
  // 分页
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0
  })
  //加载状态
  const [loading, setLoading] = useState(true)
  // 文章
  const [artiles, setArticles] = useState([])
  // 开始获取数据
  useEffect(() => {
    getArticles(pagination)
  }, [])
  // 分页改变
  const onChange = (current) => {
    const newPagination = { ...pagination, current }
    setPagination(newPagination)
    getArticles(newPagination)
  }
  // 获取文章数据
  const getArticles = (query) => {
    setLoading(true)
    // preview表示预览，会对内容长度进行限制
    getArticleList({ ...query, preview: 1 }).then(res => {
      const { count, rows } = res
      count && setPagination({ ...pagination, total: count })
      rows && setArticles(rows)
    }).catch(() => {
      message.error('获取文章数据失败！')
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <div>
      <Table
        rowKey='id'
        columns={columns}
        dataSource={artiles}
        pagination={{
          onChange,
          ...pagination
        }}
      />
    </div>
  )
}