import { Badge, Tag } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCategoryList } from "../../../api"

const colors = ['magenta', 'red', 'blue', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'geekblue', 'purple', 'pink']
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

export default function Categories (props) {
  // 分类列表
  const [categoryList, setCategoryList] = useState([])
  // 获取分类列表
  useEffect(() => {
    (async () => {
      const res = await getCategoryList()
      setCategoryList(res)
    })()
  }, [])
  return (
    <div style={{ textAlign: 'center', lineHeight: '5em' }}>
      <h2 className='title'>{`分类一共有${categoryList.length}种`}</h2>
      <div className='categories-list'>
        {categoryList.map((item, i) => (
          <span style={{ marginRight: '20px' }} key={item.id}>
            <Badge count={item.count}>
              <Tag color={getRandomColor()}>
                <Link to={`/categories/${item.id}`}>{item.name}</Link>
              </Tag>
            </Badge>
          </span>
        ))}
      </div>
    </div>
  )
}