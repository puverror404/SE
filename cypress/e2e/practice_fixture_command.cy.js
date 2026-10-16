// แบบ Fixture (login1.json) + Custom Command (cy.login1)
const testDataLogin = require("../fixtures/login1.json")
describe('login (fixture + custom command)', () => {
  beforeEach(() => {
    cy.visit('https://practicetestautomation.com/practice-test-login/')
  })
  it('tc-01', () => {
    cy.login1(testDataLogin.username.positive, testDataLogin.password.positive)
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/logged-in-successfully/')
      expect(location.protocol).to.eq('https:')
    })
  })
  it('tc-02', () => {
    cy.login1(testDataLogin.username.negative, testDataLogin.password.positive)
    cy.get('#error').contains('Your username is invalid!')
    cy.get('#error').should('have.text', 'Your username is invalid!')
  })
  it('tc-03', () => {
    cy.login1(testDataLogin.username.positive, testDataLogin.password.negative)
    cy.get('#error').contains('Your password is invalid!')
    cy.get('#error').should('have.text', 'Your password is invalid!')
  })
})
