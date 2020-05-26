
const obj = {
    f1: function f() {
        const one = async () => {
            await this.f2()
            console.log(`one`)
        }
        one()
    },
    async f2 () {
        await this.f3()
        console.log(`f2`)
    },
    f3 () {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })
    }
}
obj.f1()
