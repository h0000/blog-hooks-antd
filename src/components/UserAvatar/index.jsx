import { Menu,Dropdown, Avatar } from "antd"
import { useSelector } from "react-redux"

export default function UserAvatar (props) {

  const userInfo = useSelector(state => state.user.userInfo)

  const menu = (<Menu className='menu' items={props.menuItems} onClick={props.handleMenuClick}></Menu>)
  return (<>
    {userInfo?.name && <Dropdown overlay={menu}>
      <Avatar style={{backgroundColor: '#1e80ff',verticalAlign: 'middle',}} size="large">{userInfo.name}</Avatar>
    </Dropdown>}
  </>
  )
}