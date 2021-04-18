let meets = ['蒜薹炒肉', '藕片炒肉', '莴笋炒肉', '番茄炒蛋', '土豆炒肉', '腊肠炒玉米', '玉米炒肉', '虾', '螺', '鸡翅', '菠萝炒鸡', '鱿鱼']
let vegetables = ['白菜', '蒲瓜', '南瓜', '空心菜', '油麦菜', '丝瓜']
let cookbook = []
function f() {
    for (let i = 0; i < 2; i++) {
        let ram = Math.floor(Math.random() * (meets.length))
        let flag = cookbook.find(item => {
            item.match(meets[ram])
        })
        if (flag) {
            i--
        } else {
            cookbook.push(meets[ram])
            console.log(meets[ram])
        }
    }
    let ram = Math.floor(Math.random() * (vegetables.length))
    console.log(vegetables[ram])
}
f()