import "@testing-library/cypress/add-commands";

/// <reference types="cypress" />

describe("Youtube App", () => {
  beforeEach(() => {
    cy.intercept("GET", /(mostPopular)/g, {
      fixture: "popular.json",
    });
    cy.intercept("GET", /(search)/g, {
      fixture: "search.json",
    });
    cy.intercept("GET", /(relatedToVideoId)/g, {
      fixture: "related.json",
    });
    cy.intercept("GET", /(channels)/g, {
      fixture: "channel.json",
    });
    cy.viewport(1200, 800);
    cy.visit("/");
  });

  it("renders", () => {
    cy.findByText("Youtube").should("exist");
  });

  it("shows popular video first", () => {
    cy.findByText("Popular Video").should("exist");
  });

  it("searches by keyword", () => {
    cy.findByPlaceholderText("Search...").type("bts");
    cy.findByRole("button").click();
    cy.findByText("Searched Video").should("exist");
  });

  it("goes to detail page", () => {
    cy.findAllByRole("listitem").first().click();
    cy.findByTitle("Popular Video");
    cy.findByText("Popular Video").should("exist");
    cy.findByText("Related Video").should("exist");
  });
});
