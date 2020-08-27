let testData = '10 20 30 40 50 60'

function f(inputParams) {
    let inputArr = inputParams.split(' ')
    for (let i = 0; i < inputArr.length; i++) {
        let a = ''
        inputArr[i] = Number.parseInt(inputArr[i]).toString(2)
        for (let j = 0; j < inputArr[i].length; j++) {
            if (j % 2 === 0) {
                a += inputArr[i].charAt(j + 1)
                a += inputArr[i].charAt(j)
            }
        }
        inputArr[i] = a
    }
    console.log(inputArr)
}
f(testData)
