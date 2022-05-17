import './index.scss'
import { Button, Tabs, Input } from 'antd'
import PageTab from './components/Tabs'
import PageTable from './components/Table'
import { useEffect, useState } from 'react'
import { service } from '@/config/http'
import { useNavigate } from 'react-router-dom'

const tabList = [
  {
    key: 'all',
    value: '全部',
  },
  {
    key: 'wxWork',
    value: '企微客户',
  },
  {
    key: 'normal',
    value: '普通客户',
  },
]

let initPage = false

function CustomerList(props) {
  const [curTab, setCurTab] = useState('all')
  let [tableList, setTableList] = useState([])
  useEffect(() => {
    if (!initPage) {
      service.get('http://127.0.0.1:4523/mock/909743/getCustomerList').then((res) => {
        setTableList(res.data.data)
      })
      initPage = true
    }
    return function () {
      // 需要在 componentWillUnmount 执行的内容
    }
  }, [curTab])
  const changeInput = (e) => {
    console.log('changeInput: ', e.target.value)
  }
  /**
   * 更改tab
   * @author waldon
   * @date 2022-05-17
   * @param {*} key - param
   */
  const changeTab = (key) => {
    console.log('changeTab: ', key)
    setCurTab(key)
  }

  /**
   * 删除行
   * @author waldon
   * @date 2022-05-17
   * @param {*} rowData - param
   */
  const delRow = (rowData) => {
    tableList = tableList.filter((item) => item.id !== rowData.id)
    setTableList(tableList)
  }

  const navigate = useNavigate()
  /**
   * 进入详情
   * @author waldon
   * @date 2022-05-17
   */
  const gotoDetail = () => {
    console.log('进入详情')
    console.log(`useLocation`, navigate)
    navigate('/CustomerDetail')
  }

  return (
    <div className="customer-list">
      <div className="page-header">
        <div className="left-part">
          <div className="page-title">客户列表</div>
        </div>
        <div className="right-part">
          <div className="button-operate">
            <Button type="primary" className="btn" onClick={gotoDetail}>
              录入客户
            </Button>
            <Button type="primary" className="btn">
              批量导入
            </Button>
            <Button type="primary" className="btn">
              同步企微客户
            </Button>
            <Button type="primary" className="btn">
              客户查重
            </Button>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="tab-wrapper">
          <PageTab tabList={tabList} changeTab={changeTab} />
        </div>
        <div className="filter-wrapper">
          <Input className="ft-child filter-input" placeholder="输入内容" onChange={changeInput} />
          <Button type="primary" className="btn">
            搜索
          </Button>
        </div>
        <div className="table-wrapper">
          <PageTable tableList={tableList} delRow={delRow} />
        </div>
      </div>
    </div>
  )
}
export default CustomerList
