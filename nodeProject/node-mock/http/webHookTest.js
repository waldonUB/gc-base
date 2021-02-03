const axios = require('axios')
const fs = require('fs-extra')

const memberList = [
  {
    name: '吴德钦',
    mobile: '13724065743'
  },
  {
    name: '陈烁峰',
    mobile: '13602890526'
  },
  {
    name: '廖敏铃',
    mobile: '13533292441'
  },
  {
    name: '郭依洁',
    mobile: '13660366211'
  },
  {
    name: '张虹婷',
    mobile: '15218537350'
  },
]

const urlList = [
  'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=dbb111ef-2e6b-4073-8e5c-6ae614762d3d', // 测试企微
  'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=429e0737-fb29-4952-a0ca-3a91a684ab24', // 小白屋
  'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=81af6f01-46cb-49d9-9893-c51d8c9f4bf5', // 值班群
]


// let sayTest = `今天前端值班人员为：${memberList[0].name}`
let sayTest = `${memberList[4].name}，准备过年了`

setInterval(() => {
  axios({
    method: 'post',
    url: urlList[1],
    data: {
      "msgtype": "text",
      "text": {
        "content": sayTest,
        "mentioned_mobile_list": [memberList[0].mobile]
      }
    }
  });
}, 10000)
