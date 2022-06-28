import { Form, Input, Button } from "antd"
import { useDispatch } from 'react-redux'
import { register } from '../../../store/features/userSlice'

export default function LoginForm (props) {
  // 获取form实例
  const [form] = Form.useForm()
  // redux
  const dispatch = useDispatch()
  const handleFinish = (form) => {
    dispatch(register(form))
  }
  return (
    <Form
      onFinish={handleFinish}
      form={form}
      name="login"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 20,
      }}
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        label="用户名"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="pwd"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          注册
        </Button>
        <Button>
          取消
        </Button>
      </Form.Item>
    </Form>
  )
}