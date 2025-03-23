import type {} from 'cypress'
import type {} from '../support/cypress'

describe('Home page', () => {
  // ############################################ ONE TEST ############################################
  it('Test 1: DnD ingredients', function () {
    cy.prepare()

    cy.get('[data-testid="cy-ingredient-bun"]').should('exist').as('dragBun')
    cy.get('[data-testid="cy-ingredient-card"]')
      .should('exist')
      .as('dragIngredient')
    cy.get('[data-testid="cy-constructor-drop-area"]')
      .should('exist')
      .as('dropConstructor')

    cy.get('@dragBun').first().trigger('dragstart')
    cy.get('@dropConstructor').trigger('dragenter').trigger('drop')

    cy.get('@dragIngredient').eq(2).trigger('dragstart')
    cy.get('@dropConstructor').trigger('dragenter').trigger('drop')

    cy.get('[data-testid="cy-constructor-bun-top"]').should(
      'contain',
      'Флюоресцентная булка R2-D3 верх',
    )
    cy.get('[data-testid="cy-constructor-bun-bottom"]').should(
      'contain',
      'Флюоресцентная булка R2-D3 низ',
    )
    cy.get('[data-testid="cy-ingredient-card"]').should(
      'contain',
      'Соус фирменный Space Sauce',
    )
  })

  // ############################################ TWO TEST ############################################
  it('Test 2: Make order', function () {
    cy.prepare()

    cy.get('[data-testid="cy-ingredient-bun"]').should('exist').as('dragBun')
    cy.get('[data-testid="cy-ingredient-card"]')
      .should('exist')
      .as('dragIngredient')
    cy.get('[data-testid="cy-constructor-drop-area"]')
      .should('exist')
      .as('dropConstructor')

    cy.get('@dragBun').first().trigger('dragstart')
    cy.get('@dropConstructor').trigger('dragenter').trigger('drop')

    cy.get('@dragIngredient').eq(3).trigger('dragstart')
    cy.get('@dropConstructor').trigger('dragenter').trigger('drop')

    cy.get('[data-testid="cy-constructor-bun-top"]').should(
      'contain',
      'Флюоресцентная булка R2-D3 верх',
    )
    cy.get('[data-testid="cy-constructor-bun-bottom"]').should(
      'contain',
      'Флюоресцентная булка R2-D3 низ',
    )
    cy.get('[data-testid="cy-ingredient-card"]').should(
      'contain',
      'Говяжий метеорит (отбивная)',
    )
    
    cy.get('[data-testid="cy-constructor-action-order"]')
      .should('exist')
      .click()

    cy.get('[data-testid="cy-order-number"]').contains('7777777').should('exist')
  })

// ############################################ THREE TEST ############################################
  it('Test 3: modal ingredient open/close actions', () => {
    cy.prepare()

    cy.get('[data-testid="cy-ingredient-bun"]').should('exist').as('bun')

    cy.get('@bun').first().should('exist').click()
    cy.get('[data-testid="cy-close-modal-button"]').should('exist').as('close')
    cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093d')
    cy.get('[data-testid="cy-ingredient-details-name"]')
      .should('exist')
      .contains('Флюоресцентная булка R2-D3')
    cy.get('@close').should('exist').click()
    cy.get('@close').should('not.exist')

    cy.get('@bun').first().should('exist').click()
    cy.get('[data-testid="cy-close-modal-button"]').should('exist').as('close')
    cy.get('[data-testid="cy-close-modal-ovl"]')
      .should('exist')
      .click({ force: true })
    cy.get('@close').should('not.exist')
  })
})