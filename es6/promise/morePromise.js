let handleList = []
function requestTest(url, requestObj) {
    let sameHandle = handleList.find(item => item.url === url) // 这里也要考虑请求参数相同的情况
    if (sameHandle) {
        handleList = handleList.filter(item => item.url !== url)
        return sameHandle.handle
    }
    let handle = new Promise(resolve => {
        setTimeout(() => {
            console.log(`只会请求一次`)
            resolve(2)
        }, 1000)
        
    })
    handleList.push({url, handle})
    return handle
}

requestTest('1').then(res => {
    console.log(`res`, res)
})
requestTest('1').then(res => {
    console.log(`res`, res)
})
