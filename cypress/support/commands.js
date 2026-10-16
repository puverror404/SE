// custom command: cy.login1(username, password)  (practicetestautomation)
Cypress.Commands.add('login1', (username, password) => {
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#submit').click()
})

// custom command: cy.loginSauce(username, password)  (saucedemo)
Cypress.Commands.add('loginSauce', (username, password) => {
  cy.visit('https://www.saucedemo.com/')
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
})
