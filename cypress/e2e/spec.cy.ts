describe('App', () => {
  it('should provide the forecast of a valid location', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input').type('220 Highland Ave Philadelphia');
    cy.get('button').click();
    cy.get('.MuiAccordionSummary-root', { timeout: 10000 }).should(
      'have.length',
      14
    );
  });

  it('should display an error message when address field is empty', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input').focus();
    cy.get('input').blur();
    cy.get('.MuiFormHelperText-root').should('exist');
  });

  it('should display an error message when no results are found', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input').type('abcd');
    cy.get('button').click();
    cy.get('.MuiAccordionSummary-root').should('not.exist');
    cy.get('.MuiAlert-root').should('exist');
  });
});
