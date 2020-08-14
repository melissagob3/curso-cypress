/// <reference types ="cypress"/>

Given(/^que o site não possui registros$/, () => {
    cy.server()
    cy.route({  //usar a sintaxe de passar opções
        method: 'GET',
        url: '**//api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: [0]  //retorna um array vazio
    }).as('getNewTable')
});

When(/^acessar a listagem$/, () => {
    cy.visit('WebTable.html')
});

Then(/^devo visualizar a listagem vazia$/, () => {

    cy.get('div[role=row]').should('have.length', 1)
});

Given(/^que o site possui apenas um registro$/, () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: '**//api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fixture:webtable-get-unico'

    })
});

Then(/^devo visualizar apenas um registro$/, () => {
    cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone');  // o grid do telefone está na 5ª coluna, por isso o nro 4
    cy.get('@gridCellPhone').should('contain.text', '3177993463');
});
