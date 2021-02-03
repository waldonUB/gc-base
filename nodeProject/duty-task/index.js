const axios = require('axios')
const path = require('path')
const fs = require('fs-extra')
const schedule = require('node-schedule');

const dutyPath = path.resolve(__dirname, 'mock/dutyData.json')
fs.readJson(dutyPath, (err, res) => {
  if (!err) {
    const dutyData = {...res}
    taskSchedule(dutyData)
  } else {
    console.log(`读取文件失败`)
  }
})

const taskSchedule = function (dutyData) {
  let rule = new schedule.RecurrenceRule();
  rule.hour = 9;
  rule.minute = 0;
  rule.second = 0;
  // rule.second = [0, 10, 20, 30, 40, 50]; // 每隔 10 秒执行一次
  let hooksData = {
    dutyIndex_web: 0, // 前端执行顺序
  }
  if (Array.isArray(dutyData.currentDutyList) && dutyData.currentDutyList.length) {
    dutyData.currentDutyList.forEach(item => {
      hooksData.dutyIndex_web = dutyData.memberList_web.findIndex(subItem => item.name === subItem.name)
    })
  }
  webHooks(dutyData, hooksData)
  if (new Date().getHours() > 9) { // 超过当天临界时间的，则放入第二天的数据
    // 超过遍历人数的则重头开始
    hooksData.dutyIndex_web = hooksData.dutyIndex_web >= dutyData.memberList_web.length - 1 ? 0 : hooksData.dutyIndex_web + 1
  }
  const job = schedule.scheduleJob(rule, () => {
    webHooks(dutyData, hooksData)
    let currentDuty_web = dutyData.memberList_web[hooksData.dutyIndex_web]
    dutyData.currentDutyList.splice(0, 1, currentDuty_web)
    fs.writeJson(dutyPath, dutyData, (err, res) => {
      if (!err) {
        // 超过遍历人数的则重头开始
        hooksData.dutyIndex_web = hooksData.dutyIndex_web >= dutyData.memberList_web.length - 1 ? 0 : hooksData.dutyIndex_web + 1
        console.log(`写入${currentDuty_web.name}，${new Date().toLocaleDateString()}`)
      } else {
        console.log(`写入文件失败，${new Date().toLocaleDateString()}`)
      }
    })
  });
}

const webHooks = function (dutyData, hooksData) {
  let currentDuty_web = dutyData.memberList_web[hooksData.dutyIndex_web]
  let sayTest = `今天值班人员为：${currentDuty_web.name}`
  dutyData.roomUrlList.forEach(item => {
    let option = {
      url: item.url,
      sayTest,
      mobiles: [currentDuty_web.mobile]
    }
    sendConfig(option)
  })
}

const sendConfig = function (option) {
  axios({
    method: 'post',
    url: option.url,
    data: {
      "msgtype": "text",
      "text": {
        "content": option.sayTest,
        "mentioned_mobile_list": option.mobiles
      }
    }
  });
}