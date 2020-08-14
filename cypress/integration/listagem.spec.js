/// <reference types ="cypress"/>

context('Listagem sem registros', () => {
    it('Listagem sem registros', () => {
        cy.server()
        cy.route({  //usar a sintaxe de passar opções
            method: 'GET',
            url: '**//api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: [0]  //retorna um array vazio
        }).as('getNewTable')
        cy.visit('WebTable.html');
        cy.get('div[role=row]').should('have.length', 1) // só vai validar a linha do cabeçalho 
    });
});
context('Listagem com registros', () => {
    it('Listagem com registros', () => {
        cy.server()
        cy.route({
            method: 'GET',
            url: '**//api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fixture:webtable-get-unico'
             
        })
        cy.visit('WebTable.html');

        //assertiva do nro do tel 
        cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone');  // o grid do telefone está na 5ª coluna, por isso o nro 4
        cy.get('@gridCellPhone').should('contain.text', '3177993463');
    })
})