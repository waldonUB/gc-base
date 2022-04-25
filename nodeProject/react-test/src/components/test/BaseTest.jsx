import React from 'react'

class BaseTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'waldon',
      age: 18,
    }
  }
  render() {
    // todo waldon 测试setState是否会重新执行这个；还有函数组件里面的
    const baseNode = document.getElementsByClassName('base-root')
    console.log('测试没渲染的时候', baseNode)
    function changeInput(value) {
      console.log(value)
    }
    return (
      <div className="base-root">
        <h5>my age is {this.state.age}</h5>
        <button onClick={this.addAge.bind(this)}>添加岁数</button>
        <div>输入改变的值：</div>
        <input type="text" onChange={changeInput} />
      </div>
    )
  }

  addAge() {
    this.setState({
      age: this.state.age + 1,
    })
  }
  componentDidMount() {
    console.log('渲染的')
  }
}
export default BaseTest
