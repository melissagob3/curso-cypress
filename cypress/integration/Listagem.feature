Feature: Listagem
    Acessar a listagem para visualizar meus dados de cadastro

    Scenario: Listagem sem registro

        Given que o site não possui registros
        When acessar a listagem
        Then devo visualizar a listagem vazia

    Scenario: Listagem com registro
        Given que o site possui apenas um registro
        When acessar a listagem
        Then devo visualizar apenas um registro
