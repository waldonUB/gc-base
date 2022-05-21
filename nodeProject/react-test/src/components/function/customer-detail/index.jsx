import { Form, Input, InputNumber, Button } from 'antd'
import './index.scss'
import store from '@/stores/index'
import { addCustomer } from '@/stores/customer/index'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}

function CustomerDetail() {
  const [form] = Form.useForm()
  /**
   * 保存用户
   * @author waldon
   * @date 2022-05-18
   */
  const saveCustomer = () => {
    store.dispatch(addCustomer(form.getFieldValue()))
  }
  return (
    <div className="customer-detail">
      <div className="page-header">
        <div className="left-part">
          <div className="page-title">录入客户</div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="info-part">
          <div className="left-wrapper">
            <div className="left-title">个人信息</div>
          </div>
          <div className="right-wrapper">
            <Form form={form} {...layout} name="nest-messages" validateMessages={validateMessages}>
              <Form.Item name="contacts" label="姓名" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="dataSourceName" label="来源">
                <Input />
              </Form.Item>
            </Form>
            <Button type="primary" onClick={saveCustomer}>
              保存
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CustomerDetail
