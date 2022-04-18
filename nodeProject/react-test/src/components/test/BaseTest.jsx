import React from "react";

class Component extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'waldon',
      age: 18
    }
  }
  render() {
    const baseNode = document.getElementsByClassName('base-root')
    console.log('测试没渲染的时候', baseNode);
    return (
      <div className="base-root">
        <h5>my age is {this.state.age}</h5>
        <button onClick={this.addAge.bind(this)}>添加岁数</button>
      </div>
    )
  }
  addAge() {
    this.setState({
      age: this.state.age + 1
    })
  }
  componentDidMount() {
    console.log('渲染的');
  }
}
export default Component
