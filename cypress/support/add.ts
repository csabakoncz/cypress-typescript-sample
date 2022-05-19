export const add = (a: number, b: number) => a + b

export function do_test(){
  cy.get('.foo').should('contain','bar');
}
