class LoginForm {
    constructor() {
        this.state = 'hide'
    }
    show() {
        if (this.state === 'show') {
            return this.state
        }
        this.state = 'show'
        console.log('state :' + this.state);
    }
    hide() {
        if (this.state === 'hide') {
            return this.state
        }
        this.state = 'show'
        console.log('state :' + this.state);
    }
}
LoginForm.getInstance = (function () {
    let instance = null
    return function () {
        if (!instance) {
            instance = new LoginForm()
        }
        return instance
    }
}())

var instance1 = LoginForm.getInstance()
console.log('instance1.show() :' + instance1.show());