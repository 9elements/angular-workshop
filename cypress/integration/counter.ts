describe('Counter', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has the correct title', () => {
    cy.title().should('equal', 'Angular Workshop: Counters');
  });

  it('increments the count', () => {
    cy.get('[data-testid="count"]').first().should('have.text', '5');
    cy.get('[data-testid="increment-button"]').first().click();
    cy.get('[data-testid="count"]').first().should('have.text', '6');
  });

  it('decrements the count', () => {
    cy.get('[data-testid="decrement-button"]').first().click();
    cy.get('[data-testid="count"]').first().should('have.text', '4');
  });

  it('resets the count', () => {
    cy.get('[data-testid="reset-input"]').first().type('123');
    cy.get('[data-testid="reset-button"]').first().click();
    cy.get('[data-testid="count"]').first().should('have.text', '123');
  });
});
