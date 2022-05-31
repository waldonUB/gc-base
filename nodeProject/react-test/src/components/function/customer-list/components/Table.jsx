import PropTypes from 'prop-types'
import { FaTrashAlt } from 'react-icons/fa'
import { Table, Button } from 'antd'

const PageTable = function (props) {
  const { tableList, delRow } = props
  const columns = [
    {
      title: '用户名',
      dataIndex: 'contacts',
    },
    {
      title: '性别',
      dataIndex: 'sexName',
    },
    {
      title: '来源',
      dataIndex: 'dataSourceName',
    },
    {
      title: '业务员',
      dataIndex: 'staffName',
    },
    {
      title: '操作',
      render: (rowData) => (
        <div className="operate-box">
          <Button type="link" onClick={delRow.bind(this, rowData)}>
            删除 <FaTrashAlt />
          </Button>
        </div>
      ),
    },
  ]
  return (
    <div>
      <Table rowKey="id" columns={columns} dataSource={tableList} />
    </div>
  )
}

PageTable.defaultProps = {
  tableList: [],
}

export default PageTable
