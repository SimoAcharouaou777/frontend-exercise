describe('Pokemons E2E', () => {
    it ('loads first page and opens a modal', () => {
        cy.visit('http://localhost:3000');
        cy.findByText(/pokemons/i).should('exist');
        cy.get('[data-testid="grid"]').find('.card').should('have.length.at.least',1);
        cy.get('.card').first().click();
        cy.findByText(/close/i).should('exist');
    });
});