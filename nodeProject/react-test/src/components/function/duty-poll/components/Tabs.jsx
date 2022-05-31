import { Button, Tabs, Input } from 'antd'

const { TabPane } = Tabs

function PageTab(props) {
  const { tabList, changeTab } = props
  return (
    <Tabs defaultActiveKey="1" onChange={changeTab}>
      {tabList.map((item) => (
        <TabPane tab={item.value} key={item.key}></TabPane>
      ))}
    </Tabs>
  )
}
export default PageTab
