// https://docs.cypress.io/api/introduction/api.html

describe('E2E Secondo esercizio', () => {

  beforeEach(() => {
    cy.viewport(1280, 900)
  })

  it('Monta lo stepper', () => {
    cy.visit('/')
    cy.get('#multistepper').should('be.visible')
    cy.get('#next.not-ready').should('be.visible')
  })
  
  it('Compila il primo step', () => {
    cy.visit('/')

    // Compilo il primo step
    cy.get('#Nome').type('Christian')
    cy.get('#Cognome').type('Bale')
    cy.get('#Email').type('cb@mymail.com')

    // Verifico che il btn per proseguire sia abilitato e lo clicco
    cy.get('#next').should('not.have.class', 'not-ready')
    cy.get('#next').click()


    // Compilo il secondo step scegliendo opzioni casuali escludendo il placeholder
    // Sfrutto un metodo custom che esegue 
    selectRandomOption('Città')
    selectRandomOption('Regione')
    selectRandomOption('Nazione')

    // Verifico che il btn di submit sia abilitato e lo clicco
    cy.get('#submit').should('not.have.class', 'not-ready')
    cy.get('#submit').click()

    // Verifico che nell'alert lanciata i risultati siano
    // conformi alla specifica aspettata
    cy.on('window:alert', (str) => {
        const alertData = JSON.parse(str)
        expect(alertData).to.be.an('array')

        alertData.forEach( (input: any) => {
          expect(input).to.have.property('label')
          expect(input).to.have.property('value')
        });

    })

  })
})


function selectRandomOption(selectId: string) {
  // Seleziona un opzione random (escludendo la prima, il placeholder)
  cy.get(`#${selectId}`).then(($select) => {
      const numOptions = $select.find('option').not(':first').length
      const randomIndex = Math.floor(Math.random() * numOptions)
      cy.get(`#${selectId} option:nth-child(${randomIndex+1})`).then(($randomOption) => {
          $randomOption.prop('selected', true)
      })
  })
  // Simula il comportamento dell'utente
  // che clicca sulla select seguente
  cy.get(`#${selectId}`).focus().blur()
}