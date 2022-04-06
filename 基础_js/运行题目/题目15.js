// 对比输出结果
function wait1() {
  return new Promise((resolve) => setTimeout(resolve, 10 * 1000))
}

async function main1() {
  console.time()
  const x = wait1()
  const y = wait1()
  const z = wait1()
  await x
  await y
  await z
  console.timeEnd()
}
wait1()

function wait() {
  return new Promise((resolve) => setTimeout(resolve, 10 * 1000))
}

async function main() {
  console.time()
  await wait()
  await wait()
  await wait()
  console.timeEnd()
}
main()
