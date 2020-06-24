let arr = [
    {
        field: 'name',
        name: '姓名',
        width: 150,
        isShow: false,
        defaultSort: 1, // 用于所有字段的初始排序
    },
    {
        field: 'sexName',
        name: '性别',
        width: 120,
        isShow: false,
        defaultSort: 2, // 用于所有字段的初始排序
    },
    {
        field: 'createTimeName',
        name: '创建时间',
        width: 180,
        isShow: false,
        defaultSort: 3, // 用于所有字段的初始排序
    },
    {
        field: 'qq',
        name: 'QQ',
        width: 120,
        isShow: false,
        defaultSort: 4, // 用于所有字段的初始排序
    },
    {
        field: 'company',
        name: '公司名称',
        width: 200,
        isShow: false,
        defaultSort: 5, // 用于所有字段的初始排序
    },
    {
        field: 'industryName',
        name: '行业',
        width: 120,
        isShow: false,
        defaultSort: 6, // 用于所有字段的初始排序
    },
    {
        field: 'wxProvince',
        name: '省份',
        width: 120,
        isShow: false,
        defaultSort: 7, // 用于所有字段的初始排序
    },
    {
        field: 'wxCity',
        name: '城市',
        width: 120,
        isShow: false,
        defaultSort: 8, // 用于所有字段的初始排序
    },
    {
        field: 'address',
        name: '地址',
        width: 200,
        isShow: false,
        defaultSort: 9, // 用于所有字段的初始排序
    },
    {
        field: 'isQualityName',
        name: '优质用户',
        width: 120,
        isShow: false,
        defaultSort: 10, // 用于所有字段的初始排序
    },
    {
        field: 'lastVisitTimeName',
        name: '最近访问时间',
        width: 180,
        isShow: false,
        defaultSort: 11, // 用于所有字段的初始排序
    },
    {
        field: 'todayClicks',
        name: '今日访问次数',
        width: 120,
        isShow: false,
        defaultSort: 12, // 用于所有字段的初始排序
    },
    {
        field: 'todayVisitTime',
        name: '今日访问时长',
        width: 120,
        isShow: false,
        defaultSort: 13, // 用于所有字段的初始排序
    },
    {
        field: 'clicks',
        name: '文章访问次数',
        width: 120,
        isShow: false,
        defaultSort: 14, // 用于所有字段的初始排序
    },
    {
        field: 'readTimesSecondName',
        name: '文章访问时长',
        width: 120,
        isShow: false,
        defaultSort: 15, // 用于所有字段的初始排序
    },
    {
        field: 'shares',
        name: '文章转发次数',
        width: 120,
        isShow: false,
        defaultSort: 16, // 用于所有字段的初始排序
    },
    {
        field: 'cardClicks',
        name: '名片访问次数',
        width: 120,
        isShow: false,
        defaultSort: 17, // 用于所有字段的初始排序
    },
    {
        field: 'cardShares',
        name: '名片转发次数',
        width: 120,
        isShow: false,
        defaultSort: 18, // 用于所有字段的初始排序
    },
    {
        field: 'formClicks',
        name: '表单访问次数',
        width: 120,
        isShow: false,
        defaultSort: 19, // 用于所有字段的初始排序
    },
    {
        field: 'formSubmit',
        name: '表单提交次数',
        width: 120,
        isShow: false,
        defaultSort: 20, // 用于所有字段的初始排序
    },
    {
        field: 'materialClicks',
        name: '文件访问次数',
        width: 120,
        isShow: false,
        defaultSort: 21, // 用于所有字段的初始排序
    },
    {
        field: 'materialVisitTimeName',
        name: '文件访问时长',
        width: 120,
        isShow: false,
        defaultSort: 22, // 用于所有字段的初始排序
    },
    {
        field: 'sourceName',
        name: '来源',
        width: 120,
        isShow: true,
        defaultSort: 23, // 用于所有字段的初始排序
    },
    {
        field: 'staffName', // 管理员才显示
        name: '业务员',
        width: 120,
        isShow: true,
        defaultSort: 24, // 用于所有字段的初始排序
    },
    {
        field: 'wxMobile',
        name: '手机号码',
        width: 120,
        isShow: true,
        defaultSort: 25, // 用于所有字段的初始排序
    },
    {
        field: 'lastUpdateTimeName',
        name: '最近更新时间',
        width: 180,
        isShow: true,
        defaultSort: 26, // 用于所有字段的初始排序
    },
    {
        field: 'allVisitClicks',
        name: '总访问次数',
        width: 120,
        isShow: true,
        defaultSort: 27, // 用于所有字段的初始排序
    },
    {
        field: 'allVisitTimeName',
        name: '总访问时长',
        width: 180,
        isShow: true,
        defaultSort: 28, // 用于所有字段的初始排序
    },

]
let keyObj = {}
arr.forEach(item => {
    keyObj[item.field] = item.name
})
console.log(keyObj)
