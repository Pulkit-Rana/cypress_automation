// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('loingFunc', (email, password) => {
//     // you code
// })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", () => {
  cy.visit("https://opensource-demo.orangehrmlive.com/")
  cy.get('[class="orangehrm-login-branding"]')
    .should("be.visible")
    .and("have.class", "orangehrm-login-branding")
  cy.get('[placeholder="Username"]').type("Admin")
  cy.get('[placeholder="Password"]').type("admin123")
  cy.get(".oxd-button").click()
  cy.get(".oxd-main-menu-item-wrapper")
    .contains("Dashboard")
    .should("have.class", "oxd-main-menu-item active")
})
