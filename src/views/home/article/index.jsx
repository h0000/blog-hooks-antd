import { EyeOutlined, FolderOutlined } from "@ant-design/icons"
import { message, Skeleton, Space } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getArticleById } from "../../../api"
import { formatTime } from "../../../utils"
import Styles from './index.module.scss'

export default function Article (props) {
  const articleId = useParams().id
  const [article, setArticle] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getArticleById(articleId).then(res => {
      if (res.flag && res.data) {
        setArticle(res.data)
      } else {
        message.error('没有找到文章。')
      }
    }).finally(() => {
      setLoading(false)
    })
  }, [articleId])
  return (
    <Skeleton active loading={loading}>
      <h1 style={{ textAlign: 'center' }}>{article.title}</h1>
      <ul className={Styles.infoWrap} >
        <li><Space><EyeOutlined />{article.viewCount}</Space></li>
        <li><Space><FolderOutlined />{article.category?.name}</Space></li>
        <li><Space>{formatTime(article.createdAt)}</Space></li>
      </ul>
      <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
    </Skeleton>
  )
}