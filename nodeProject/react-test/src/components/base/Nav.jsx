import { Menu, Button } from 'antd'
import { routeConfig, convertTree } from '../../routers/routeConfig.js'
import { useNavigate } from 'react-router-dom'

const { SubMenu } = Menu

const routeArr = convertTree(routeConfig)

function Nav() {
  const navigate = useNavigate()
  const handleClick = function ({ key }) {
    const route = routeArr.find((item) => item.key === key)
    const { path } = route
    navigate(path)
  }

  const dfsDom = function (rowData) {
    const { children } = rowData
    const elements = []
    for (const item of children) {
      if (item.children && item.children.length) {
        elements.push(dfsDom(item))
      } else {
        if (item.hide) {
          continue
        }
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
        {routeConfig
          .filter((item) => !item.hide)
          .map((item) => {
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
