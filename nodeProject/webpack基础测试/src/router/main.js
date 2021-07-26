import testImg from '../assets/测试图片.png'
export async function getRouterName() {
  console.log(`getRouterName执行`)
  const a = await Promise.resolve(1)
  const imgNode = document.createElement('img')
  imgNode.src = testImg
  document.body.appendChild(imgNode)
  return a
}
getRouterName()
