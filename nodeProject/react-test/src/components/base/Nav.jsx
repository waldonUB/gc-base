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
      title: 'Option 1',
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      title: 'Option 2',
    },
    {
      key: '3',
      icon: <ContainerOutlined />,
      title: 'Option 3',
    },
    {
      key: 'sub1',
      icon: <MailOutlined />,
      title: 'Navigation One',
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
  return (
    <div style={{ width: 256 }}>
      <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="dark">
        {routeConfig.map((item) => (
          <Menu.Item key="{item.key}" icon={item.icon}>
            {item.title}
          </Menu.Item>
        ))}

        {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined />}>
          Option 3
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu> */}
      </Menu>
    </div>
  )
}
export default Nav
