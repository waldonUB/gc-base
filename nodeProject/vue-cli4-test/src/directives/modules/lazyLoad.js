// 懒加载示例

const lazyLoad = {
  // 初始化设置
  bind: (el, binding, vNode) => {
    console.log('bind el parent: ', el.parentNode) // 预期：null
  },
  // 插入父节点
  inserted: (el, binding, vNode) => {
    console.log('inserted el parent: ', el.parentNode)
    var observer = new IntersectionObserver(function (changes) {
      if (changes[0].isIntersecting) {
        console.log('binding.value: ', binding.value)
        el.src = binding.value
        // 加载一次就够了
        observer.unobserve(el)
      } else {
      }
    })
    observer.observe(el)
  },
  // 可能发生在其子VNode更新之前
  update: () => {},
  // 所在组件VNode和子VNode更新后
  componentUpdated: () => {},
  unbind: () => {},
}
export default lazyLoad
