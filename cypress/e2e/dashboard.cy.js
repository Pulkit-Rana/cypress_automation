/// <reference types="Cypress" /> 

import { CommonPage } from "../support/commonPage"
import { DashboardPage } from "../support/pageobjects/dashboard"

const dshbord = new DashboardPage()
const common = new CommonPage()
describe('Validating the dashboard functionality', () => {

  beforeEach(() => {
    cy.login()
  })

  it('Valiodate the dashboard page', () => {
   common.navigateToSdideMenuTabs("Dashboard")
    dshbord.getPageHeading().should("have.text", "Dashboard")
    cy.get(".oxd-grid-item.oxd-grid-item--gutters.orangehrm-dashboard-widget").should("be.visible").and("have.length", 7)
  })

  it('Validating the headers of the tiles', () => {
    cy.get(".orangehrm-dashboard-widget-name").find(".oxd-text.oxd-text--p").then((ele) => {
      expect(ele.text())
        .include("My Actions")
        .and.include("Quick Launch")
        .and.include("Buzz Latest Posts")
        .and.include("Employees on Leave Today")
        .and.include("Employee Distribution by Sub Unit")
        .and.include("Employee Distribution by Location")
    })
  })
})