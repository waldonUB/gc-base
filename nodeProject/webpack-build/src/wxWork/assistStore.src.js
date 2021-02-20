if (typeof timeInfo === "undefined") {
  var timeInfo = {};
}
(() => {
  const STORE = {
    cacheSidHeadList: {},//缓存的imgList
    sidArr: [],
    depIdArr: [],
    delSidArr: [],
    tempSidArr: [],//选中的员工的sidList
    tempDepIdArr: [],//选中的部门idList
    tempDelSidArr: [],
    currentDepartment: {},//当前部门
    externalUserId: "",
    fromAdd: false,//是否来自addAssist页面
    fromSet: false,//是否来自setAssist页面
    selectPages: [],//套娃pages的页面栈
    isDisabledSelect: false,//是否可以被选中
    currentSelectSid: {//当前选中的sid
      sid: -1,
      name: "",
    },
    staffInfo: {//员工信息
      sid: "",
      name: "",
    },
    assistNames: "",//协助人全部名单。以,分割
    isSalesCustomer: false
  };

  timeInfo.state = Object.assign({}, STORE);

  timeInfo.commit = (setAttr, info) => {
    timeInfo[setAttr](timeInfo.state, info);
  };
    timeInfo.setStaffInfo = (state, info) => {
      state.staffInfo = info;
    };
    timeInfo.setSidArr = (state, info) => {
      state.sidArr = [].concat(info);
    },
    timeInfo.setDelSidArr = (state, info) => {
      state.delSidArr = [].concat(info);
    },
    timeInfo.setDepIdArr = (state, info) => {
      state.depIdArr = [].concat(info);
    },
    timeInfo.setTempSidArr = (state, info) => {
      state.tempSidArr = [].concat(info);
    },
    timeInfo.setTempDepIdArr = (state, info) => {
      state.tempDepIdArr = [].concat(info);
    },
    timeInfo.setIsDisabledSelect = (state, isDisabledSelect) => {
      state.isDisabledSelect = isDisabledSelect;
    },
    timeInfo.setCurrentDepartment = (state, info) => {
      state.currentDepartment = Object.assign({}, info);
    },
    timeInfo.setCurrentSelectSid = (state, info) => {
      state.currentSelectSid = info;
    },
    timeInfo.setTempDelSidArr = (state, info) => {
      state.tempDelSidArr = [].concat(info);
    };
  timeInfo.setAssistNames = (state, info) => {
    state.assistNames = info;
  };
  timeInfo.setDefault = (state, info) => {
    let staffInfo = {
      staffInfo: state.staffInfo,
      externalUserId: timeInfo.state.externalUserId,
    };
    timeInfo.state = Object.assign(STORE, staffInfo);
  };
})();
