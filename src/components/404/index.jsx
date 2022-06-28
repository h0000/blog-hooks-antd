import { Button, Result } from "antd"
import { Link } from "react-router-dom"

export default function ErrorPage (props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
      <Result
        status="404"
        title="404"
        subTitle="很抱歉，您访问的页面不存在。"
        extra={<Button type="primary"><Link to='/'>返回主页</Link></Button>}
      />
    </div>
  )
}