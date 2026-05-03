const{Given,When,Then} =require('@cucumber/cucumber');
const LoginPage =require('../pages/LoginPage');
 
Given('user opens the application',async function() {
    this.loginPage =new LoginPage(this.page);
    await this.loginPage.launchApplication()  
});
       
       
When('enter the details for form',async function (dataTable) {
    const data = dataTable.rowsHash();   
    
    console.log(data.username);
    console.log(data.password);

    await this.loginPage.login(data.username, data.password);


});
       