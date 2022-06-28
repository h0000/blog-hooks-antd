import { Input, Tag } from "antd"
import { useState, useRef, useEffect } from "react"
import { PlusOutlined } from '@ant-design/icons'
const { CheckableTag } = Tag

export default function CategoryTags (props) {
  const inputRef = useRef()
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  // 监听添加tag输入框，值改变
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  // 监听添加tag输入框，提交
  const handleInputConfirm = () => {
    if (inputValue.trim()) {
      const newList = new Set([...props.categoryList, inputValue])
      props.changeCategoryList?.([...newList])
      props.checkedChange?.(inputValue)
      setInputValue('')
    }
    setInputVisible(false)
  }
  // 监听新增标签点击
  const handleNewTagClick = () => {
    setInputVisible(true)
  }
  // 监听tag选中改变
  const handleTagChange = (checked, category) => {
    category = checked ? category : ''
    props.checkedChange?.(category)
  }
  // 输入框显示时聚焦
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [inputVisible])

  return (<div>
    {props.categoryList?.map(category =>
      (<CheckableTag key={category} checked={props.checked === category} onChange={(checked) => handleTagChange(checked, category)}>{category}</CheckableTag>)
    )}
    {inputVisible ?
      <Input
        ref={inputRef}
        type="text"
        size="small"
        style={{ width: 78 }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      /> :
      <Tag key="" onClick={handleNewTagClick}>
        <PlusOutlined /> New Tag
      </Tag>}
  </div>)
}