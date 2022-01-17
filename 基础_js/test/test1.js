const data = {
  memberList_web: [
    { name: '陈烁峰', mobile: '13602890526', work: 'web' },
    { name: '廖敏铃', mobile: '13533292441', work: 'web' },
    { name: '郭依洁', mobile: '13660366211', work: 'web' },
    { name: '吴德钦', mobile: '13724065743', work: 'web' },
  ],
  memberList_backend: [
    { name: '陈楚东', mobile: '15625550410', work: 'backend' },
    { name: '张子军', mobile: '15660120372', work: 'backend' },
    { name: '王泓彬', mobile: '18559828005', work: 'backend' },
    { name: '谢飞龙', mobile: '13060856548', work: 'backend' },
  ],
  hooksData: {
    web: { name: '吴德钦', mobile: '13724065743', work: 'web' },
    backend: { name: '谢飞龙', mobile: '13060856548', work: 'backend' },
  },
  roomUrlList: [
    {
      id: 3,
      name: '开发易销',
      url: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=0f1afab6-8bb9-4ced-bd06-acd13a9d4bc1',
    },
  ],
}
const date = new Date()
const { memberList_web, memberList_backend } = data
for (let i = 0; i < 30; i++) {
  const _i = i % 4
  console.log(
    `值班：前端-${memberList_web[_i].name}，后端-${
      memberList_backend[_i].name
    }，${date.toLocaleDateString()}`,
  )
  let date2 = date.getDate() + 1
  date.setDate(date2)
}
