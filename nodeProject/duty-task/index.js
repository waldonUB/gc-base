const axios = require('axios')
const path = require('path')
const fs = require('fs-extra')
const schedule = require('node-schedule')

const dutyPath = path.resolve(__dirname, 'mock/dutyData.json')
fs.readJson(dutyPath, (err, res) => {
  if (!err) {
    const dutyData = { ...res }
    taskSchedule(dutyData)
  } else {
    console.log(`读取文件失败`)
  }
})

/**
 * 超过遍历人数的则重头开始
 * @author waldon
 * @date 2021-01-24
 * @param {Object} dutyData - param
 */
const setCurrentData = (dutyData) => {
  let { memberList_web, memberList_backend, hooksData } = dutyData
  const webIndex = memberList_web.findIndex((item) => item.name === hooksData.web.name)
  const backEndIndex = memberList_backend.findIndex((item) => item.name === hooksData.backend.name)
  hooksData.web =
    webIndex >= memberList_web.length - 1 ? memberList_web[0] : memberList_web[webIndex + 1]
  hooksData.backend =
    backEndIndex >= memberList_backend.length - 1
      ? memberList_backend[0]
      : memberList_backend[backEndIndex + 1]
}
const sendConfig = (option) => {
  axios({
    method: 'post',
    url: option.url,
    data: {
      msgtype: 'text',
      text: {
        content: option.sayTest,
        mentioned_mobile_list: option.mobiles
      }
    }
  })
}
const webHooks = (dutyData) => {
  const { hooksData } = dutyData
  const { web, backend } = hooksData
  const sayTest = `今天值班前端为：${web.name}，后端为：${backend.name}`
  console.log(sayTest)
  dutyData.roomUrlList.forEach((item) => {
    let option = {
      url: item.url,
      sayTest,
      mobiles: [web.mobile, backend.mobile]
    }
    sendConfig(option)
  })
}
/**
 * 定时任务job
 * @author waldon
 * @date 2021-01-24
 * @param {Object} dutyData - param
 */
const cornJob = (dutyData) => {
  const { hooksData } = dutyData
  webHooks(dutyData)
  setCurrentData(dutyData)
  fs.writeJson(dutyPath, dutyData, (err, res) => {
    if (!err) {
      console.log(
        `写入${hooksData.web.name}，${hooksData.backend.name}，${new Date().toLocaleDateString()}`
      )
    } else {
      console.log(`写入文件失败，${new Date().toLocaleDateString()}`)
    }
  })
}
const taskSchedule = (dutyData) => {
  const cornStr = '0 0 9 * * *'
  // const cornStr = "*/5 * * * * *";
  console.log(`*****定时任务开启*****`)
  if (process.env.TASK_NOW === 'true') {
    console.log(`*****执行立即写入*****`)
    cornJob(dutyData)
  }
  const job = schedule.scheduleJob(cornStr, () => {
    cornJob(dutyData)
  })
}
