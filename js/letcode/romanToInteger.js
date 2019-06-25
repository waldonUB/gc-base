/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    var arr = s.split("")
    let sum = 0
    for(var i = 0; i < arr.length; i++) {
        if (arr[i] === 'I' && (arr[i+1] === 'V' || arr[i+1] === 'X')) {
            switch(arr[i+1]){
                case "V":
                    sum += 4
                    break;
                case "X":
                    sum += 9
                    break;
            }
            i++;
        }else if (arr[i] === 'X' && (arr[i+1] === 'L' || arr[i+1] === 'C')) {
            switch(arr[i+1]){
                case "L":
                    sum += 40
                    break;
                case "C":
                    sum += 90
                    break;
            }
            i++;
        }else if (arr[i] === 'C' && (arr[i+1] === 'D' || arr[i+1] === 'M')) {
            switch(arr[i+1]){
                case "D":
                    sum += 400
                    break;
                case "M":
                    sum += 900
                    break;
            }
            i++;
        }else {
            switch(arr[i]){
                case "I":
                    sum += 1
                    break;
                case "V":
                    sum += 5
                    break;
                case "X":
                    sum += 10
                    break;
                case "L":
                    sum += 50
                    break;
                case "C":
                    sum += 100
                    break;
                case "D":
                    sum += 500
                    break;
                case "M":
                    sum += 1000
                    break;
            }
        }
    }
    return sum
};
