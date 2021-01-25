declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Create several Todo items via UI
         * @example
         * cy.createAT()
         */
        createAT(): Chainable<any>
        /**
         * Creates one Todo using UI
         * @example
         * cy.createTodo('new item')
         */
        createTodo(title: string): Chainable<any>
    }
}