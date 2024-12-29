describe('template spec', ()=>
    {
        it('comparar fecha actual', ()=>
            {
                cy.visit('http://127.0.0.1:5500/clase12/index.html')

                fetch('https://api.frankfurter.app/latest')
                    .then(response => response.json())
                    .then(response => 
                        {
                            cy.get('#fecha').should('have.value', response.date)
                        })
                
            });
        
        it('Mensaje de error si no se selecciona una moneda de cambio', ()=>
            {
                cy.visit('http://127.0.0.1:5500/clase12/index.html')
                cy.get('#calcular').click();
                cy.get('#resultado').should('have.text', 'Debe elegir una moneda a la cual desea hacer el cambio')
            });
        
        it('Mantener mismo cambio si las monedas son iguales', ()=>
            {
                cy.visit('http://127.0.0.1:5500/clase12/index.html')
                cy.get('#selector-2').select('EUR')
                cy.get('#calcular').click();
                cy.get('#resultado').should('have.text', 'Su cambio es de: 100EUR')
                
            });
    })