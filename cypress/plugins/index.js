/// <reference types="cypress" />
// ***********************************************************
const cucumber = require('cypress-cucumber-preprocessor').default
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('file:preprocessor', cucumber())//pre-processar as features para que o cypress consiga entender
}