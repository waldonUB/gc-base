import 'ant-design-vue/dist/antd.variable.less'
import '@/assets/styles/base.less'
import {
  Layout,
  Menu,
  Row,
  Col,
  Card,
  Form,
  Dropdown,
  Select,
  Button,
  Checkbox,
  Tabs,
  Tag,
  Input,
  DatePicker,
  TimePicker,
  Radio,
  Tooltip,
  Space,
  Steps,
  Divider,
  Descriptions,
  Alert,
  Result,
  Statistic,
  Popconfirm,
  Popover,
  Table,
  Avatar,
  List,
  Progress,
  Switch,
  Modal,
  Rate,
  ConfigProvider,
  Empty,
  Spin,
  Drawer,
  PageHeader,
  Carousel,
  BackTop,
  Upload,
  Badge,
} from 'ant-design-vue'
import { createApp } from 'vue'
import { router } from './routers'
import App from './App.vue'

const app = createApp(App)

app
  .use(router)
  .use(Layout)
  .use(Menu)
  .use(Row)
  .use(Col)
  .use(Card)
  .use(Form)
  .use(Dropdown)
  .use(Select)
  .use(Button)
  .use(Checkbox)
  .use(Tabs)
  .use(Tag)
  .use(Input)
  .use(DatePicker)
  .use(TimePicker)
  .use(Radio)
  .use(Tooltip)
  .use(Space)
  .use(Steps)
  .use(Divider)
  .use(Descriptions)
  .use(Alert)
  .use(Result)
  .use(Statistic)
  .use(Popconfirm)
  .use(Popover)
  .use(Table)
  .use(Avatar)
  .use(List)
  .use(Progress)
  .use(Switch)
  .use(Modal)
  .use(Rate)
  .use(ConfigProvider)
  .use(Empty)
  .use(Spin)
  .use(Drawer)
  .use(PageHeader)
  .use(Badge)
  .use(Carousel)
  .use(BackTop)
  .use(Upload)

app.mount('#app')
