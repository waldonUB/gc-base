// import testImg from '../assets/测试图片.png'
import testJpg from "../assets/测试图片.jpg"
export async function getRouterName() {
  const a = await Promise.resolve(1)
  const imgNode = document.createElement("img")
  imgNode.src = testJpg
  document.body.appendChild(imgNode)
  return a
}
getRouterName()
