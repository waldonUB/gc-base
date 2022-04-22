import { Menu, Button } from 'antd'
import routeConfig from '../../routers/routeConfig.js'
import { useNavigate } from 'react-router-dom'

const { SubMenu } = Menu

function Nav() {
  const handleClick = function ({ key }) {
    console.log('key: ', key)
  }

  const dfsDom = function (rowData) {
    const { children } = rowData
    const elements = []
    for (const item of children) {
      if (item.children && item.children.length) {
        elements.push(dfsDom(item))
      } else {
        elements.push(
          <Menu.Item key={item.key} onClick={handleClick}>
            {item.title}
          </Menu.Item>,
        )
      }
    }
    return (
      <SubMenu key={rowData.key} icon={rowData.icon} title={rowData.title}>
        {elements}
      </SubMenu>
    )
  }
  // todo waldon findDOMNode is deprecated in StrictMode

  return (
    <div style={{ width: 256 }}>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1', 'sub2']}
        mode="inline"
        theme="dark"
      >
        {routeConfig.map((item) => {
          if (item.children && item.children.length) {
            return dfsDom(item)
          } else {
            return (
              <Menu.Item key={item.key} icon={item.icon} onClick={handleClick}>
                {item.title}
              </Menu.Item>
            )
          }
        })}
      </Menu>
    </div>
  )
}
export default Nav
