import { Button, Form, Input, message } from 'antd'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { addArticle, getArticleById, getCategoryList, updateArticle } from '../../../../api'
import CategoryTags from '../../../../components/CategoryTags'
import Editor from '../../../../components/Editor'

// 包裹编辑器，使得Form.item能够监听值变化
const FormEditor = ({ initialValue, value, onChange }) => {
  return (
    <Editor initialValue={initialValue} onEditorChange={onChange}></Editor>
  )
}

// 包裹分类组件，使得Form.item能够监听值变化
const FormCategoryTags = ({ value, onChange }) => {
  // 获取分类列表
  useEffect(() => {
    (async () => {
      const res = await getCategoryList()
      setCategoryList(res.map(item => item.name))
    })()
  }, [])

  // 分类列表
  const [categoryList, setCategoryList] = useState([])

  return (
    <CategoryTags categoryList={categoryList} changeCategoryList={setCategoryList} checked={value} checkedChange={onChange} />
  )
}
// 文章初始状态
const articleInit = {
  id: null,
  title: '',
  categoryName: '',
  content: ''
}

export default function EditArticle () {
  // 文章表单
  const [form] = Form.useForm()
  // 表单提交
  const onFinish = (formData) => {
    if (articleId || articleInitState.id) {
      // 更新
      updateArticle({ ...formData, id: articleId || articleInitState.id }).then(res => {
        if (res.flag) {
          message.success('文章更新成功！')
        } else {
          throw new Error('')
        }
      }).catch(err => {
        message.error('文章更新失败！')
      })
    } else {
      // 新增
      addArticle(formData).then(res => {
        if (res.flag && res.id) {
          message.success('新增文章成功！')
          setArticleInitState({ ...articleInitState, id: res.id })
        } else {
          message.error('文章标题重复！')
        }
      }).catch(err => {
        message.error('新增文章失败！')
      })
    }
  }
  // 获取文章信息
  const getArticle = (id) => {
    getArticleById(id).then(res => {
      if (res.flag && res.data) {
        const newArticle = {
          title: res.data.title,
          categoryName: res.data.category?.name,
          content: res.data.content
        }
        // initialValues 不能被 setState 动态更新,设置是为了更新富文本编辑器状态
        setArticleInitState(newArticle)
        // 设置form字段
        form.setFieldsValue(newArticle)
      } else {
        message.error('获取文章信息失败！')
      }
    })
  }
  // 文章初始状态
  const [articleInitState, setArticleInitState] = useState(JSON.parse(JSON.stringify(articleInit)))
  // 获取路由动态id
  const articleId = useParams().id
  useEffect(() => {
    initForm()
    if (articleId) {
      setArticleInitState({ ...articleInitState, id: articleId })
      getArticle(articleId)
    }
  }, [articleId])
  // 初始化
  const initForm = () => {
    setArticleInitState(JSON.parse(JSON.stringify(articleInit)))
    form.resetFields()
  }
  // 必选内容设置信息
  const requiredRules = (message) => [{ required: true, message }]


  return (
    <div className='edit_article'>
      <Form initialValues={articleInitState} form={form} name='article' onFinish={onFinish}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '5em' }}>
          <Button onClick={initForm}>重置</Button>
          <Button type="primary" htmlType="submit">保存</Button>
        </div>
        <Form.Item label='标题' name='title' rules={requiredRules('请输入标题！')}>
          <Input></Input>
        </Form.Item>
        <Form.Item label='分类' name='categoryName' rules={requiredRules('请选择分类！')}>
          <FormCategoryTags form={form} />
        </Form.Item>
        <Form.Item label='内容' name='content' rules={requiredRules('请输入文章内容！')}>
          <FormEditor initialValue={articleInitState.content} />
        </Form.Item>
      </Form>
    </div>
  )
}