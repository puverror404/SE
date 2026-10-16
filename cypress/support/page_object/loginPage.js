// Page Object (practicetestautomation)
class loginPage {
  verifyLoginSuccessText() {
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/logged-in-successfully/')
      expect(location.protocol).to.eq('https:')
    })
  }
  verifyLoginErrorUsername() {
    cy.get('#error').contains('Your username is invalid!')
    cy.get('#error').should('have.text', 'Your username is invalid!')
  }
  verifyloginErrorPassword(text) {
    cy.get('#error').contains(text)
    cy.get('#error').should('have.text', text)
  }
}
export default new loginPage()
