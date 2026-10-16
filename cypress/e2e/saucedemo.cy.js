// SauceDemo: login / error / logout / cart / checkout / sort
// NOTE: ถ้าใส่ it.only จะรันแค่เคสนั้นเคสเดียว -> ลบออกถ้าอยากรันทั้งหมด
describe('SauceDemo Testing', () => {

  it('TC01-open website & login', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').should('be.visible')
    cy.get('[data-test="password"]').should('be.visible')
    cy.get('[data-test="login-button"]').should('be.visible')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
  })

  it('TC02-wrong username', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('be.visible')
    cy.get('[data-test="error"]').should('contain', 'do not match')
  })

  it('TC03-wrong username&password', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard')
    cy.get('[data-test="password"]').type('secret')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('be.visible')
    cy.get('[data-test="error"]').should('contain', 'do not match')
  })

  it('TC04-empty username', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('be.visible')
    cy.get('[data-test="error"]').should('contain', 'Username is required')
  })

  it('TC05-empty password', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('be.visible')
    cy.get('[data-test="error"]').should('contain', 'Password is required')
  })

  it('TC06-logout', () => {
    cy.loginSauce('standard_user', 'secret_sauce')
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    cy.get('#react-burger-menu-btn').click()
    cy.get('[data-test="logout-sidebar-link"]').should('be.visible').click()
    cy.url().should('eq', 'https://www.saucedemo.com/')
    cy.get('[data-test="login-button"]').should('be.visible')
  })

  it('TC07-add to cart', () => {
    cy.loginSauce('standard_user', 'secret_sauce')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2')
  })

  it('TC08-remove cart item', () => {
    cy.loginSauce('standard_user', 'secret_sauce')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('.shopping_cart_link').click()
    cy.contains('Your Cart').should('be.visible')
    cy.get('[data-test="remove-sauce-labs-bike-light"]').click()
    cy.contains('Sauce Labs Bike Light').should('not.exist')
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
  })

  it('TC09-checkout', () => {
    cy.loginSauce('standard_user', 'secret_sauce')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html')
    cy.contains('Checkout: Your Information').should('be.visible')
    cy.get('[data-test="firstName"]').type('Puv')
    cy.get('[data-test="lastName"]').type('Lim')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    cy.contains('Checkout: Overview').should('be.visible')
    cy.get('[data-test="finish"]').click()
    cy.contains('Checkout: Complete!').should('be.visible')
    cy.get('.complete-header').should('contain', 'Thank you for your order!')
  })

  it('TC10-sort price low to high', () => {
    cy.loginSauce('standard_user', 'secret_sauce')
    cy.get('[data-test="product-sort-container"]').select('lohi')
    cy.get('.inventory_item_price').first().should('have.text', '$7.99')
  })

  it('TC11-sort name Z to A', () => {
    cy.loginSauce('standard_user', 'secret_sauce')
    cy.get('[data-test="product-sort-container"]').select('za')
    cy.get('.inventory_item_name').first().should('have.text', 'Test.allTheThings() T-Shirt (Red)')
  })
})
