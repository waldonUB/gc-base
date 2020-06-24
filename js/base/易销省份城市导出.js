// exportTest () {
//     Ts_util.Res.loadg("city").then(() => {
//         var excelList = []
//         let provinceList = site_cityUtil.getProvince();
//         provinceList.forEach(item => {
//             let cityList = site_cityUtil.getCities(item.id)
//             cityList.forEach(subItem => {
//                 excelList.push({
//                     province: item.name,
//                     city: subItem.name
//                 })
//             })
//         })
//         var keyJson = {
//             province: '省份',
//             city: '城市',
//         }
//         $.exportExcel(excelList, '省份城市表', keyJson);
//     })
// }
