import App from '../App'
import Dashboard from '../components/base/Dashboard'
import BaseDialog from '../components/function/dialog/BaseDialog'
import SingleUpload from '../components/function/upload/SingleUpload'

import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons'

const routeConfig = [
  {
    key: 'Dashboard',
    path: '/',
    element: <Dashboard />,
    icon: <DesktopOutlined />,
    title: '首页',
  },
  {
    key: 'BaseDialog',
    icon: <PieChartOutlined />,
    path: '/dialog/BaseDialog',
    element: <BaseDialog />,
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

export default routeConfig
