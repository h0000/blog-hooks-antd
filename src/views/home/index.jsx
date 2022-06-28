import { useEffect, useState } from "react"
import { message } from 'antd'
import ArticleList from "../../components/ArticleList"
import { useParams } from "react-router-dom"
import { getArticleList } from "../../api"
// 模拟数据给骨架屏使用
const data = Array.from({
  length: 6,
}).map((_, i) => ({
  title: `ant design part ${i}`,
  // content:
    // 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}))

export default function Home (props) {
 
  // 获取分类id
  const categoryId = useParams().id
  // 搜索关键词
  const keyword = useParams().keyword

   //加载状态
   const [loading, setLoading] = useState(true)
   // 文章数据
   const [articles, setArticles] = useState(data)

  // 获取文章数据
  const getArticles = (query) => {
    setLoading(true)
    const fullQuery = { ...query, preview: 1, categoryId, keyword }
    // preview表示预览，会对内容长度进行限制
    getArticleList(fullQuery).then(res => {
      const { count, rows } = res
      count && setPagination({ current: fullQuery.current, pageSize: fullQuery.pageSize, total: count })
      rows && setArticles(rows)
    }).catch(() => {
      message.error('获取文章数据失败！')
    }).finally(() => {
      setLoading(false)
    })
  }

  // 分页
  const [pagination, setPagination] = useState({
    pageSize: 4,
    current: 1,
    total: 0
  })
  // 获取数据
  useEffect(() => {
    getArticles(pagination)
  }, [categoryId, keyword])
  // 监听分页改变
  const onChange = (current) => {
    const newPagination = { ...pagination, current }
    setPagination(newPagination)
    getArticles(newPagination)
  }

  return (
    <ArticleList
      pagination={{
        onChange,
        ...pagination
      }}
      dataSource={articles}
      loading={loading}
    />
  )
}