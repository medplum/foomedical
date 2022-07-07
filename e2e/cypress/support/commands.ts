/// <reference types="cypress" />

Cypress.Commands.add('fillUpForm', ({ email, password }: { email?: string; password?: string }) => {
  cy.visit('/');
  cy.get('a').contains('Sign in').click();
  if (email) {
    cy.get('label').contains('Email').next().type(email);
  }
  if (password) {
    cy.get('label').contains('Password').next().type(password);
  }
  cy.get('button').contains('Sign in').click();
});
