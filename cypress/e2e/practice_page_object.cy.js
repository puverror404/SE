// แบบ Page Object Model (support/page_object/loginPage.js)
const testDataLogin = require("../fixtures/login1.json")
import loginPage from "../support/page_object/loginPage"
describe('login (page object)', () => {
  beforeEach(() => {
    cy.visit('https://practicetestautomation.com/practice-test-login/')
  })
  it('tc-01', () => {
    cy.login1(testDataLogin.username.positive, testDataLogin.password.positive)
    loginPage.verifyLoginSuccessText()
  })
  it('tc-02', () => {
    cy.login1(testDataLogin.username.negative, testDataLogin.password.positive)
    loginPage.verifyLoginErrorUsername()
  })
  it('tc-03', () => {
    cy.login1(testDataLogin.username.positive, testDataLogin.password.negative)
    loginPage.verifyloginErrorPassword('Your password is invalid!')
  })
})
