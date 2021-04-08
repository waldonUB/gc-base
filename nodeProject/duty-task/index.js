const axios = require("axios");
const path = require("path");
const fs = require("fs-extra");
const schedule = require("node-schedule");

const dutyPath = path.resolve(__dirname, "mock/dutyData.json");
fs.readJson(dutyPath, (err, res) => {
  if (!err) {
    const dutyData = { ...res };
    taskSchedule(dutyData);
  } else {
    console.log(`读取文件失败`);
  }
});

/**
 * 超过遍历人数的则重头开始
 * @author waldon
 * @date 2021-01-24
 * @param {Object} dutyData - param
 */
const setCurrentData = function (dutyData) {
  let { memberList_web, memberList_backend, hooksData } = dutyData;
  const webIndex = memberList_web.findIndex(
    (item) => item.name === hooksData.web.name
  );
  const backEndIndex = memberList_backend.findIndex(
    (item) => item.name === hooksData.backend.name
  );
  hooksData.web =
    webIndex >= memberList_web.length - 1
      ? memberList_web[0]
      : memberList_web[webIndex + 1];
  hooksData.backend =
    backEndIndex >= memberList_backend.length - 1
      ? memberList_backend[0]
      : memberList_backend[backEndIndex + 1];
};

const taskSchedule = function (dutyData) {
  let rule = new schedule.RecurrenceRule();
  rule.hour = 9;
  rule.minute = 0;
  rule.second = 0;
  // rule.second = [0, 10, 20, 30, 40, 50]; // 每隔 10 秒执行一次
  let { hooksData } = dutyData;
  webHooks(dutyData, hooksData);
  if (new Date().getHours() > 9) {
    // 超过当天临界时间的，则放入第二天的数据
    setCurrentData(dutyData);
  }
  const job = schedule.scheduleJob(rule, () => {
    webHooks(dutyData, hooksData);
    fs.writeJson(dutyPath, dutyData, (err, res) => {
      if (!err) {
        setCurrentData(dutyData);
        console.log(
          `写入${hooksData.web.name}，${
            hooksData.backend.name
          }，${new Date().toLocaleDateString()}`
        );
      } else {
        console.log(`写入文件失败，${new Date().toLocaleDateString()}`);
      }
    });
  });
};

const webHooks = function (dutyData, hooksData) {
  const { web, backend } = hooksData;
  let sayTest = `今天值班前端为：${web.name}，后端为：${backend.name}`;
  dutyData.roomUrlList.forEach((item) => {
    let option = {
      url: item.url,
      sayTest,
      mobiles: [web.mobile, backend.mobile],
    };
    sendConfig(option);
  });
};

const sendConfig = function (option) {
  axios({
    method: "post",
    url: option.url,
    data: {
      msgtype: "text",
      text: {
        content: option.sayTest,
        mentioned_mobile_list: option.mobiles,
      },
    },
  });
};
