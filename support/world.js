const {setWorldConstructor} = require('@cucumber/cucumber')

class CustomWorld{
    constructor(page){
    this.page =null;
    this.context =null;
    this.browser =null
    }
}
setWorldConstructor(CustomWorld);