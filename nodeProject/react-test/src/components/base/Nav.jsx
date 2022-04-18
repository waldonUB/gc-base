import { Menu, Button } from 'antd'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons'

const { SubMenu } = Menu

function Nav() {
  const routeConfig = [
    {
      key: '1',
      icon: <PieChartOutlined />,
      title: '对话框',
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      title: '文件上传',
    },
    {
      key: '3',
      icon: <ContainerOutlined />,
      title: '树形控件',
    },
    {
      key: 'sub1',
      icon: <MailOutlined />,
      title: 'API测试',
      children: [
        {
          key: '5',
          title: 'Option 5',
        },
        {
          key: '6',
          title: 'Option 6',
        },
        {
          key: '7',
          title: 'Option 7',
        },
        {
          key: '8',
          title: 'Option 8',
        },
      ],
    },
    {
      key: 'sub2',
      icon: <MailOutlined />,
      title: 'Navigation Two',
      children: [
        {
          key: '9',
          title: 'Option 9',
        },
        {
          key: '10',
          title: 'Option 10',
        },
        {
          key: 'sub3',
          icon: <MailOutlined />,
          title: 'Navigation Three',
          children: [
            {
              key: '2-1',
              title: 'Option 2-1',
            },
            {
              key: '2-2',
              title: 'Option 2-2',
            },
          ],
        },
      ],
    },
  ]

  const dfsDom = function(rowData) {
    const { children } = rowData
    const elements = []
    for(const item of children) {
      if (item.children && item.children.length) {
        elements.push(dfsDom(item))
      } else {
        elements.push(
          <Menu.Item key={item.key}>{item.title}</Menu.Item>
        )
      }
    }
    return (
      <SubMenu key={rowData.key} icon={rowData.icon} title={rowData.title}>
        { elements }
      </SubMenu>
    )
  }
  // todo waldon findDOMNode is deprecated in StrictMode

  return (
    <div style={{ width: 256 }}>
      <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1', 'sub2']} mode="inline" theme="dark">
        {routeConfig.map((item) => {
          if (item.children && item.children.length) {
            return dfsDom(item)
          } else {
            return (
              <Menu.Item key={item.key} icon={item.icon}>
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
