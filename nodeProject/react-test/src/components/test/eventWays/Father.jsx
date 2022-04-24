import { useState } from 'react'
import Child from './child.jsx'
function Father() {
  const [userName, setUserName] = useState('waldon')
  return (
    <div className="father">
      <p>这里是节点</p>
      <Child userName={userName} setUserName={setUserName} />
    </div>
  )
}
export default Father
