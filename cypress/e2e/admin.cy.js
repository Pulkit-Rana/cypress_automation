/// <reference types="Cypress" />

import { CommonPage } from "../support/commonPage"

const commonPage = new CommonPage()

describe("Validating the admin tab", () => {
  beforeEach(() => {
    cy.login()
    commonPage.navigateToSdideMenuTabs("Admin")
    cy.intercept("GET", "/web/index.php/api/**/pim/employees?**").as("abc")
    cy.fixture("admin.json").as("admin")
  })

  it("Pre-req Writing the EmpName into the fixture", () => {
    cy.get("@admin").then(admin => {
      cy.get(".oxd-table-body > div:nth-child(n+1) > div > div:nth-child(2) > div")
        .contains(admin.username)
        .parents(".oxd-table-card")
        .find("div:nth-child(n+1) div:nth-child(4) > div")
        .invoke("text")
        .as("empName")
        .then($empName => {
          let empName = $empName.split(" ")[0]
          cy.log(empName)
          cy.readFile("cypress/fixtures/admin.json", err => {
            if (err) {
              return cy.log(err)
            }
          }).then(text => {
            text.empname = empName //fixture file's empName =  CgZJZaSlSB
            cy.writeFile("cypress/fixtures/admin.json", JSON.stringify(text))
          })
        })
    })
  })

  it("Validate the Admin Page", () => {
    cy.intercept("GET", "/web/index.php/api/**/pim/employees?**").as("abc")
    cy.get("@admin").then(admin => {
      // we change the name in fixture
      cy.get(".oxd-topbar-header-breadcrumb")
        .find("h6")
        .should("contain", "Admin")
        .and("contain", admin.heading2)
      cy.get(".oxd-table-filter").should("be.visible")
      cy.get(".orangehrm-header-container button").contains("Add").should("be.visible")
      cy.get(".orangehrm-container").should("be.visible")
    })
  })

  it("Validate the Search Functionality", () => {
    cy.get("@admin").then(admin => {
      cy.intercept("GET", "/web/index.php/api/**/admin/users?**").as("admin")
      cy.get(".oxd-table-filter").should("be.visible")
      cy.get(".oxd-input.oxd-input--active").last().type(admin.username)
      cy.get(".oxd-select-text--after").first().click()
      cy.get('[role="listbox"]').should("contain", admin.username).click()
      cy.get(".oxd-autocomplete-text-input > input").type(admin.empname)
      cy.get('[role="listbox"]')
        .contains("Searching...")
        .then(() => {
          cy.get('[role="listbox"]').contains(admin.empname).click()
          cy.wait("@abc")
        })
      cy.get(".oxd-form-actions > .oxd-button--secondary").click()
      cy.wait("@admin")
      cy.get(".oxd-table-card > .oxd-table-row").should("have.length", 1)
      cy.get(".oxd-table-card .oxd-table-cell").then(ele => {
        expect(ele.text())
          .include(admin.username)
          .and.include(admin.username)
          .and.include(admin.empname)
          .and.include("Enabled")
      })
    })
  })
})
