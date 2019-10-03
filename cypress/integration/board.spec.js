function addCard(title) {
  cy.get('.fa-plus')
    .first()
    .click();
  cy.get('label')
    .contains('Title')
    .next()
    .type(title);
  cy.get('label')
    .contains('Email')
    .next()
    .type('a@b.com');
  cy.get('label')
    .contains('Description')
    .next()
    .type('Something');

  cy.get('input[type="submit"]').click();
}

describe('Board', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('http://localhost:3000');
  });

  afterEach(() => {
    cy.clearLocalStorage();
  });

  it('should load without errors', () => {
    cy.get('#board').should('contain', 'To do');
  });

  it('should be possible to add a card', () => {
    addCard('First');
    cy.get('[data-component="Card"]').should('have.length', 1);
    cy.get('h3').contains('First');
  });

  it('should be possible to drag a card to another column', () => {
    addCard('First');
    {
      const dataTransfer = new DataTransfer();

      cy.get('[data-component="Card"]')
        .first()
        .trigger('dragstart', { dataTransfer });

      cy.get('[data-component="Column"]')
        .first()
        .next()
        .trigger('drop', { dataTransfer });

      cy.get('[data-component="Column"]')
        .first()
        .next()
        .get('[data-component="Card"]')
        .should('have.length', 1);
    }

    {
      const dataTransfer = new DataTransfer();

      cy.get('[data-component="Card"]')
        .first()
        .trigger('dragstart', { dataTransfer });
      cy.get('[data-component="Column"]')
        .first()
        .next()
        .next()
        .trigger('drop', { dataTransfer });
      cy.get('[data-component="Column"]')
        .first()
        .next()
        .next()
        .get('[data-component="Card"]')
        .should('have.length', 1);
    }
  });

  it('should not be possible to add more than 100 cards to a column', () => {
    for (let x = 0; x < 100; x = x + 1) {
      addCard(`Card`);
    }

    cy.get('[data-component="Column"]')
      .first()
      .find('.fa-plus')
      .should('have.length', 0);
  });
});
