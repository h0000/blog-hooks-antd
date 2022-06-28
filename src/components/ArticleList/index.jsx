   import React, { useEffect } from "react"
import { getArticleList } from "../../api"
import { List, Space, message, Skeleton } from 'antd'
import { useState } from "react"
import { ClockCircleOutlined, EyeOutlined, FolderOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)


export default function ArticleList (props) {
  const navigator = useNavigate()
  // 监听文章点击
  const handleItemClick = (id) => {
    navigator(`/article/${id}`)
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      {...props}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          onClick={() => handleItemClick(item.id)}
          style={{cursor:'pointer'}}
          actions={[
            <IconText icon={EyeOutlined} text={item.viewCount} key="viewCount" />,
            <IconText icon={FolderOutlined} text={item.category?.name} key="categoryName" />,
            <IconText icon={ClockCircleOutlined} text={item.createdAt} key="createdAt" />,
          ]}
        >
          <Skeleton loading={props.loading} active>
            <List.Item.Meta
              title={<h2>{item.title}</h2>}
            />
            <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
          </Skeleton>
        </List.Item>
      )}
    />
  )
}