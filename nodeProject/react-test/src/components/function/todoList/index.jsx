import { List, Typography, Divider } from 'antd'
import { Button } from 'antd'
import { useState } from 'react'

let initData = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]

function testClick(rowData) {
  console.log('click: ', rowData)
}

// todo waldon 写法感觉有点冗余
function delItem(e, rowData, setData) {
  e.stopPropagation()
  initData = initData.filter((item) => item !== rowData)
  setData(initData)
}

function TodoList() {
  const [data, setData] = useState(initData)
  return (
    <div className="todoList">
      <Divider orientation="left">Default Size</Divider>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item onClick={testClick.bind(this, item)}>
            <Typography.Text mark>[ITEM]</Typography.Text> {item}
            <Button
              type="primary"
              danger
              onClick={(e) => {
                delItem(e, item, setData)
              }}
            >
              删除
            </Button>
          </List.Item>
        )}
      />
    </div>
  )
}

export default TodoList
