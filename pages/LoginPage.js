const BasePage =require('./basePage');
require('dotenv').config

class LoginPage extends BasePage{
      constructor(page){
        super(page)

        this.usernameInput =page.locator('#username')
        this.passwordInput =page.locator('#password')
        this.loginBtn =page.locator('#login')
      }

      async launchApplication(url){
        await this.openUrl(process.env.BASE_URL)
   }

     async login(username, password) {
       await this.usernameInput.fill(username);
       await this.passwordInput.fill(password);
       await this.loginBtn.click()
  }


       async login_user(username){
        await this.enterText(this.usernameInput, username);
    }

       async login_pass(password){
        await this.enterText(this.passwordInput, password);
    }

       async login_button(){
        await this.clickElement(this.loginButton)

}
}

module.exports =LoginPage;