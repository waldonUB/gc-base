import { useState } from 'react'
import { Button } from 'antd'


function FcTest() {
  const [info, setInfo] = useState('init info')
  const changeInfo = function() {
    setInfo('info: '+Math.random())
  }
  return (
    <div className="fc-test">
      这里测试一些hooks相关的, {info}
      <Button type="primary" onClick={changeInfo}>changeInfo</Button>
    </div>
  )
}
export default FcTest
