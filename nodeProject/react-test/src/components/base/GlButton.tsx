import { Button } from 'antd'

// todo waldon 如何进行插槽的传出
// todo waldon 如何使用v:bind="attrs"
interface propsDef {
  type: 'link' | 'primary'
  children: any
}
function GlButton(props: propsDef) {
  const { type, children } = props
  console.log('gl-button render')
  return <Button type={type}>{children}</Button>
}

export default GlButton
