describe('Counter', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('has the correct title', () => {
    console.log('cy.title()', cy.title());
    cy.title().should('equal', 'Angular Workshop: Counters');
  });

  it('increments the count', () => {
    cy.get('[data-testid="count"]').first().should('have.text', '5');
    cy.get('[data-testid="increment-button"]').first().click();
    cy.get('[data-testid="count"]').first().should('have.text', '6');
  });
});
