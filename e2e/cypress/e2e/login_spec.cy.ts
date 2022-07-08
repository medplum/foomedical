describe('The Home Page', () => {
  it('Successful login test', () => {
    cy.fillUpForm({ email: Cypress.env('EMAIL'), password: Cypress.env('PASSWORD') });
    cy.url().should('contain', '/signin');
  });
  it('Failed login test', () => {
    cy.fillUpForm({ email: 'test@mail.com', password: '1234567890' });
    cy.get('div').contains('Email or password is invalid');
  });
  it('Invalid email test', () => {
    cy.fillUpForm({ email: 'test', password: '1234567890' });
    cy.get('label').contains('Email').next().invoke('prop', 'validationMessage').should('not.eq', '');
  });
  it('Invalid password test', () => {
    cy.fillUpForm({ email: 'test@mail.com', password: '1234' });
    cy.get('div').contains('Invalid password, must be at least 5 characters');
  });
  it('Empty email test', () => {
    cy.fillUpForm({ password: '1234567890' });
    cy.get('label').contains('Email').next().invoke('prop', 'validationMessage').should('not.eq', '');
  });
  it('Empty password test', () => {
    cy.fillUpForm({ email: 'test@mail.com' });
    cy.get('label').contains('Password').next().invoke('prop', 'validationMessage').should('not.eq', '');
  });
});
