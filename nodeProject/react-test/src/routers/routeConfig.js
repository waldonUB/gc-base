import App from '../App'
import Dashboard from '@/components/base/Dashboard'
import BaseDialog from '@/components/function/dialog/BaseDialog'
import TodoList from '@/components/function/todoList/index'
import VirtualScroll from '@/components/function/virtual-scroll/index'
import CustomerList from '@/components/function/customer-list/index'
import CustomerDetail from '@/components/function/customer-detail/index'
import SetStateTest from '@/components/test/setStateTest/index'
import Editor from '@/components/function/editor/index'
import Upload from '@/components/function/upload/index'

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
    key: 'VirtualScroll',
    icon: <PieChartOutlined />,
    path: '/VirtualScroll',
    element: <VirtualScroll />,
    title: '虚拟滚动',
  },
  {
    key: 'CustomerList',
    icon: <PieChartOutlined />,
    path: '/CustomerList',
    element: <CustomerList />,
    title: '客户列表',
  },
  {
    key: 'CustomerDetail',
    icon: <PieChartOutlined />,
    path: '/CustomerDetail',
    element: <CustomerDetail />,
    title: '客户详情',
    hide: true,
  },
  {
    key: 'Upload',
    icon: <DesktopOutlined />,
    path: '/Upload',
    element: <Upload />,
    title: '文件上传',
  },
  {
    key: 'Editor',
    icon: <ContainerOutlined />,
    path: '/Editor',
    element: <Editor />,
    title: '富文本编辑器',
  },
  {
    key: 'TodoList',
    icon: <PieChartOutlined />,
    path: '/TodoList',
    element: <TodoList />,
    title: 'TodoList',
  },
  {
    key: 'sub1',
    icon: <MailOutlined />,
    title: 'API测试',
    children: [
      {
        key: 'SetStateTest',
        icon: <PieChartOutlined />,
        path: '/SetStateTest',
        element: <SetStateTest />,
        title: 'SetState测试',
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

const convertTree = function (routes) {
  const children = []
  const res = []
  if (!routes.length) {
    return []
  }
  for (const item of routes) {
    res.push(item)
    if (item.children && item.children.length) {
      children.push(...item.children)
    }
  }
  res.push(...convertTree(children))
  return res
}

export { routeConfig, convertTree }
