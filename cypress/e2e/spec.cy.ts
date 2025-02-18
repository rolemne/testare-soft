describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  it('Visits the initial project page', () => {
    cy.visit('http://localhost:4200/')
    cy.contains('Calculate')
  });

  it('should change the language to German', () => {
    cy.get('mat-select').click();
    cy.get('mat-option[ng-reflect-value="de"]').click();
    cy.contains('Berechnen Sie Ihren BMI').should('exist');
  });

  it('should change the language to Romanian', () => {
    cy.get('mat-select').click();
    cy.get('mat-option[ng-reflect-value="ro"]').click();
    cy.contains('Calculare IMC').should('exist');
  });

  it('should allow the user to calculate BMI', () => {
    cy.get('mat-select').click();
    cy.get('mat-option[ng-reflect-value="fr"]').click();

    cy.get('input[ng-reflect-name="height"]').clear().type('180');
    cy.get('input[ng-reflect-name="weight"]').clear().type('75');

    cy.get('button').contains('Calculer').click();

    cy.contains('IMC').should('exist');
  });

  it('should disable the button if inputs are empty or zero', () => {
    cy.get('mat-select').click();
    cy.get('mat-option[ng-reflect-value="en"]').click();
    cy.get('button[mat-ripple-loader-class-name="mat-mdc-button-ripple"]').should('be.disabled');
  });

  it('should calculate the BMI correctly', () => {
    cy.get('mat-select').click();
    cy.get('mat-option[ng-reflect-value="fr"]').click();
    cy.get('input[ng-reflect-name="height"]').clear().type('183');
    cy.get('input[ng-reflect-name="weight"]').clear().type('89');
    cy.get('button').contains('Calculer').click();

    cy.contains('26.58').should('exist');
  });
})
