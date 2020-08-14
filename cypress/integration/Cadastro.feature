Feature: Cadastro
    Scenario: Cadastro de um novo usuário

        Given que acesse o site
        When informar meus dados
            And salvar
        Then devo ser cadastrado com sucesso

