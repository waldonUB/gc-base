let handleList = []

var httpRequest = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('请求成功')
        }, 1000)
    })
}
/**
 * 
 * @author waldon
 * @date 2020/6/9
 * @param {*} url - 
 * @param {*} requestObj - 请求参数
 * @returns {*}
 */
function requestTest(url, requestObj) {
    let sameHandle = handleList.find(item => item.url === url) // 这里也要考虑请求参数相同的情况
    if (sameHandle) {
        return sameHandle.handle
    }
    let handle = new Promise(resolve => {
        httpRequest().then(res => {
            handleList = handleList.filter(item => item.url !== url)
            resolve(res)
        })
    })
    handleList.push({url, handle})
    return handle
}

requestTest('1').then(res => {
    console.log(`res`, res)
    console.log(`res`, handleList)
})
requestTest('1').then(res => {
    console.log(`res`, res)
})
setTimeout(() => {
    console.log(`handleList`, handleList)
}, 5000)
