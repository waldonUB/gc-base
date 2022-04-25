function Child(props) {
  const setUserName = props.setUserName
  return (
    <div className="child">
      <p>显示父级名称：{props.userName}</p>
      <button onClick={setUserName.bind(this, Math.random())}>改变父级名称</button>
    </div>
  )
}
export default Child
