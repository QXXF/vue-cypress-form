// describe(): Inizializza il contesto della suite di test
// it(): Identifica il contesto dello scenario specifico
// beforeEach(() => {}) Permette di eseguire una serie di istruzioni prima dell'esecuzione di ogni test

// .visit(): Permette di navigare verso il percorso indicato 
// .get(): Permette di trovare un elemento nel DOM a partire dal selettore css indicato
// .should(): Permette di applicare una o piu verifiche all'oggetto a cui viene concatenato
// .type(): Se concatenato alla get di un input, permette di scrivere al suo interno come se l'utente stesse usando la tastiera.
// .click(): Simula il click sull'elemento a cui è concatenato
// .on(): Permette di applicare un event listener all'istanza di test. - es. cy.on('window:alert', (str) => {})
// expect(node): Permette di prendere in analisi un elemento e applicare una catena di asserzioni anche complessa

// cy.get(`id`).focus().blur() - Simula il comportamento dell'utente che clicca sulla select seguente
  

describe('E2E Stepper vue', () => {
  // Inserisci qui i tuoi testcase
})