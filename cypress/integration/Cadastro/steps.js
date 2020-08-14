/// <reference types ="cypress"/>

let Chance = require('chance');
let chance = new Chance();



Given(/^que acesse o site$/, () => {
    cy.visit('Register.html')
    cy.server() //para usar rotas é preciso startar um servidor antes
    cy.route('POST', '**//api/1/databases/userdetails/collections/newtable?**').as('postNewTable'); // O ** siginifica q não importa o host se é prod, hml, etc, e o que virá depois || as seria o apelido da rota
    cy.route('POST', '**//api/1/databases/userdetails/collections/usertable?**').as('postUserTable');
    cy.route('GET', '**//api/1/databases/userdetails/collections/newtable?**').as('getNewTable');
});

When(/^informar meus dados$/, () => {
	cy.get('INPUT[NG-MODEL^=First]').type(chance.first());
    cy.get('INPUT[NG-MODEL^=Last]').type(chance.last());
    cy.get('INPUT[TYPE=Email]').type(chance.email());
    cy.get('INPUT[TYPE=tel]').type(chance.phone({ formatted: false }));
    cy.get('input[value=FeMale]').check();
    cy.get('input[type=checkbox]').check('Cricket');
    cy.get('input[type=checkbox]').check('Hockey');

    //select & select2 (combos)
    cy.get('select#Skills').select('Javascript');
    cy.get('select#countries').select('Brazil');
    cy.get('select#country').select('Japan', { force: true });
    cy.get('select#yearbox').select('1993');
    cy.get('select[ng-model=monthbox]').select('December');
    cy.get('select#daybox').select('1');

    cy.get('input#firstpassword').type('Melgb@2020');
    cy.get('input#secondpassword').type('Melgb@2020');

    cy.get('input#imagesrc').attachFile('foto.jpeg');
});


And(/^salvar$/, () => {

    cy.get('#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {

    cy.wait('@postNewTable').then((resNewTable) => { //aguarda a rota, e aí retorna um XHR
        expect(resNewTable.status).to.eq(200)
    })
    cy.wait('@postUserTable').then((resUserTable) => {
        expect(resUserTable.status).to.eq(200)
    });
    cy.wait('@getNewTable').then((resNewTable) => {
        expect(resNewTable.status).to.eq(200)
    });
    cy.url('').should('contain', 'WebTable');
});

