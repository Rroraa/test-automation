const { test, expect } = require('@playwright/test'); 
const { LoginPage } = require('../pages/LoginPage'); 
 
test.describe('Login tests', () => { 
  test('valid login redirects to inventory', async ({ page }) => { 
    const loginPage = new LoginPage(page); 
    await loginPage.goto(); 
    await loginPage.login('standard_user', 'secret_sauce'); 
 
    await expect(page).toHaveURL(/inventory.html/); 
    await expect(page.locator('.title')).toHaveText('Products'); 
  }); 
 
  test('invalid login shows error message', async ({ page }) => { 
    const loginPage = new LoginPage(page); 
    await loginPage.goto(); 
    await loginPage.login('invalid_user', 'wrong_password'); 
 
    await expect(await loginPage.getError()).toContainText('Epic sadface'); 
  }); 
}); 