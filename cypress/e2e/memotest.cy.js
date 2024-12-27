describe('template spec', () => {
  
  it('Visitar la pagina', () => {
    cy.visit('http://127.0.0.1:8080')
  })

  describe('Juega al memotest', () => {

    it('Se asegura que exista el tablero con cuadros', () => {
      cy.visit('http://127.0.0.1:8080');
      cy.get('.tablero').find('.cuadro').should('have.length', 6)
    })

    

    it('Prueba el juego', () => {
      cy.visit('http://127.0.0.1:8080');
      cy.get('#botones').find('#iniciar').click()
    
      let mapaDePares;
      let listaDePares = [];
      
      cy.get('.cuadro').then((cuadros) =>
        {
          mapaDePares = obtenerParesDeCuadros(cuadros);
          listaDePares = Object.values(mapaDePares);
        
          listaDePares.reduce((chain, par) => { 
            return chain.then(() => { 
              cy.wrap(par[0]).click(); 
              cy.wrap(par[1]).click(); 
              return cy.wait(500); 
            }); 
          }, 
          Cypress.Promise.resolve());
        });
        
        
    })

  })
  
})

function obtenerParesDeCuadros(cuadros)
{
  const pares = {};

  cuadros.each((i, cuadro) => 
    {
      const claseColor = cuadro.id;

      if (pares[claseColor])
        {
          pares[claseColor].push(cuadro);
        }
      else
      {
        pares[claseColor] = [cuadro];
      }
    });

    return pares;
}