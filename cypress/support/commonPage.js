export class CommonPage {
  navigateToSdideMenuTabs(tabName) {
    cy.intercept("GET", "/web/index.php/api/**/dashboard/employees/**").as("dashbord")
    cy.get(".oxd-main-menu-item-wrapper").contains(tabName).click()
    cy.wait("@dashbord")
    cy.wait("@dashbord")
    cy.get(".oxd-main-menu-item-wrapper")
      .contains(tabName)
      .should("have.class", "oxd-main-menu-item active")
  }
}
