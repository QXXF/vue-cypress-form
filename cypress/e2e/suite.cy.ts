// Describe(): Inizializza il contesto della suite di test
describe('E2E Secondo esercizio', () => {

  // Permette di eseguire una serie di istruzioni
  // prima dell'esecuzione di ogni test
  beforeEach(() => {
    cy.viewport(1280, 900)
  })
  // .viewport(): Permette di modificare la grandezza della finestra in cui
  // viene eseguito il test. Utile per verificare regressioni sul responsive

  // It(): Identifica il contesto dello scenario specifico
  it('Monta lo stepper', () => {
    cy.visit('/')
    
    cy.get('#multistepper').should('be.visible')
    cy.get('#next.not-ready').should('be.visible')
  })

  // .visit(): Permette di navigare verso il percorso indicato 
  // .get(): Permette di trovare un elemento nel DOM a partire dal selettore css indicato
  // .should(): Permette di applicare una o piu verifiche all'oggetto a cui viene concatenato 


  it('Compila con successo i due step del form', () => {
    cy.visit('/')

    // Compilo il primo step
    cy.get('#Nome').type('Christian')
    cy.get('#Cognome').type('Bale')
    cy.get('#Email').type('cb@mymail.com')

    // Verifico che il btn per proseguire sia abilitato e lo clicco
    cy.get('#next').should('not.have.class', 'not-ready')
    cy.get('#next').click()

    // Compilo il secondo step scegliendo opzioni casuali escludendo il placeholder
    // Sfrutto un metodo custom che esegue la selezione di un'opzione valida e focus/blur
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

  // .type(): Se concatenato alla get di un input, permette di scrivere al suo interno
  // come se l'utente stesse usando la tastiera.

  // .click(): Simula il click sull'elemento a cui è concatenato

  // .on(): Permette di applicare un event listener globale all'istanza di test.
  // In questo caso, al submit del form apro un alert e leggo il suo contenuto

  // expect(node): Permette di prendere in analisi un elemento e applicare una catena di asserzioni anche complessa



  it('Compila con errori e correggi il form', () => {
    cy.visit('/')

    // Compilo il primo step
    cy.get('#Nome').type('Chris123tian')
    cy.get('#Cognome').type('B')
    cy.get('#Email').type('cm2mail.2om')

    // Verifico che il btn per proseguire sia disabilitato
    cy.get('#next').should('have.class', 'not-ready')
    cy.get('#next').focus().blur()
    
    // Verifico che gli input di testo abbiano l'aria corretta (errore)
    cy.get('#Nome').should('have.attr', 'aria-invalid', 'true')
    cy.get('#Cognome').should('have.attr', 'aria-invalid', 'true')
    cy.get('#Email').should('have.attr', 'aria-invalid', 'true')

    // Inserisco i dati corretti e proseguo
    cy.get('#Nome').clear().type('Christian')
    cy.get('#Cognome').clear().type('Bale')
    cy.get('#Email').clear().type('cb@mymail.com')

    // Clicco su prosegui
    cy.get('#next').should('not.have.class', 'not-ready')
    cy.get('#next').click()

    // Compilo il secondo step scegliendo opzioni casuali escludendo il placeholder
    // Sfrutto un metodo custom che esegue la selezione di un'opzione valida e focus/blur
    selectRandomOption('Città')
    selectRandomOption('Regione')
    selectRandomOption('Nazione')

    // Clicco su indietro per verificare la persistenza dello stato del precedente step
    cy.get('#back').should('be.visible')
    cy.get('#back').click()

    // Verifico che gli input di testo abbiano l'aria corretta (valid)
    cy.get('#Nome').focus().blur()
    cy.get('#Nome').should('have.attr', 'aria-invalid', 'false')

    cy.get('#Cognome').focus().blur()
    cy.get('#Cognome').should('have.attr', 'aria-invalid', 'false')

    cy.get('#Email').focus().blur()
    cy.get('#Email').should('have.attr', 'aria-invalid', 'false')

    // Clicco su prosegui
    cy.get('#next').should('not.have.class', 'not-ready')
    cy.get('#next').click()

    // Seleziono i placeholders per rendere invalido il form
    selectRandomOption('Città', true)
    selectRandomOption('Regione', true)
    selectRandomOption('Nazione', true)

    // Verifico che gli input di testo abbiano l'aria corretta (errore)
    cy.get('#Città').should('have.attr', 'aria-invalid', 'true')
    cy.get('#Regione').should('have.attr', 'aria-invalid', 'true')
    cy.get('#Nazione').should('have.attr', 'aria-invalid', 'true')

    // Verifico che il btn di submit sia abilitato e lo clicco
    cy.get('#submit').should('have.class', 'not-ready')

    // Ricompilo il form con altre opzioni casuali
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
      })
    })
    // End
  })

})


function selectRandomOption(selectId: string, selectPlaceholder?: boolean) {
  cy.get(`#${selectId}`).then(($select) => {
      // Leggo il numero di opzioni presenti nella select
      const nOptions = $select.find('option').length
      // Estrae un idx casuale a partire dalla seconda opzione (evitando il placeholder)
      const randInt = Math.floor( Math.random() * ( nOptions - 1) + 2)
      // Se presente @arg writeError true, seleziona il placehoder
      const selectedOption = selectPlaceholder ? 1 : randInt
      // Seleziona l'opzione desiderata
      cy.get(`#${selectId} option:nth-child(${selectedOption})`).then(($randomOption) => {
          $randomOption.prop('selected', true)
      })
  })
  // Simula il comportamento dell'utente che clicca sulla select seguente
  cy.get(`#${selectId}`).focus().blur()
}