var game = {
  result: 1,
  msg: 'success',
  val: {
    name: '王城霸主',
    department_name: '37网游',
    project_name: '页游组',
    project_manager: '运营1',
    theme: '',
    single: '',
    state: '运营中',
    type: 1,
    children: [
      {
        name: '报审',
        type: 1,
        children: [
          {
            type: 2,
            name: '研发公司',
            val: '广州极尚网络技术有限公司',
          },
          {
            type: 2,
            name: '运营公司',
            val: '广州极尚网络技术有限公司',
          },
          {
            type: 2,
            name: '出版公司',
            val: '广州极尚网络技术有限公司',
          },
          {
            type: 2,
            name: '软著公司',
            val: '广州极尚网络技术有限公司',
          },
          {
            type: 2,
            name: '审批文号',
            val: '无',
          },
          {
            type: 2,
            name: '版号',
            val: '无',
          },
          {
            type: 2,
            name: '报审进度',
            val: null,
          },
          {
            type: 2,
            name: '报审耗时',
            val: '无',
          },
          {
            type: 2,
            name: '报审负责人',
            val: '无',
          },
        ],
      },
      {
        name: '风控',
        type: 1,
        children: [
          {
            type: 2,
            name: '上线时间',
            val: '2023-01-10',
          },
          {
            type: 2,
            name: '风险评估',
            val: '合规',
          },
          {
            type: 2,
            name: '风险等级',
            val: '无',
            reason: '',
          },
          {
            type: 2,
            name: '防沉迷',
            val: '合规',
            name2: '检查次数',
            count: 1,
          },
          {
            type: 2,
            name: '个人隐私安全',
            val: '合规',
          },
          {
            type: 2,
            name: '收款公司',
            val: '无',
          },
        ],
      },
      {
        name: '投诉',
        type: 1,
        children: [
          {
            type: 2,
            name: '投诉总量',
            val: 0,
          },
          {
            type: 2,
            name: '处理中',
            val: 0,
          },
          {
            type: 2,
            name: '投诉类型',
            val: 0,
          },
          {
            type: 2,
            name: '重大投诉',
            val: 0,
          },
          {
            type: 2,
            name: '退款单数',
            val: 0,
          },
          {
            type: 2,
            name: '退款金额',
            val: 0,
          },
        ],
      },
    ],
  },
  list: null,
}
