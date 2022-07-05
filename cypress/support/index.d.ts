declare namespace Cypress {
  interface Chainable {
    fillUpForm(values: { email?: string; password?: string }): Chainable<Element>;
  }
}
