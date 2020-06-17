

function getDate(month, date) {
    var maxDate = 0
    if (month > 12) {
        return 'Month超出边界'
    }
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            maxDate = 31
            break
        case 2:
        case 4:
        case 6:
        case 9:
        case 11:
            maxDate = 30
            break
    }
    if (date > maxDate) {
        return 'date超出边界'
    }
    var currentDay = 2018 + '-' + month + '-' + date
    currentDay = new Date(currentDay)
    if (currentDay.getDay() === 0) {
        return '7'
    } else {
        return currentDay.getDay() + ''
    }
}

console.log(`getDate(12, 9)`, getDate(12, 30))
