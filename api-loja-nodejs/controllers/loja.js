module.exports = function (app) {
    /* Endpoint de criação de loja */
    app.post('/lojas/loja', function (req, res) {
        /* Validações de valores de entrada da api. */
        req.assert("descricao", "Descrição da loja é obrigatório.").notEmpty();
        req.assert("codigo", "Código da loja é obrigatório.").notEmpty();
        req.assert("cep", "Cep da loja é obrigatório.").notEmpty();

        /* Tratamento de erros. */
        var erros = req.validationErrors();
        if (erros) {
            res.status(400).send(erros);
            return;
        }

        /* Recupera o objeto loja da requisição */
        var loja = req.body;
        loja.data_criacao = new Date;

        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var lojaDao = new app.provider.LojaDao(connection);

        /* Invoca o metodo de criação de uma loja. */
        lojaDao.salva(loja, function (erro, resultado) {
            /* Tratamento de erros de retorno do metodo de salvar. */
            if (erro) {
                res.status(500).send(erro);
                return;
            }
            /* Recupera o id da loja criada */
            loja.id = resultado.insertId;

            /* Adiciona ao retorno o location da requisição. */
            res.location('/lojas/loja/' + loja.id);

            /* Resposta de código http da requisição da api de lojas. */
            res.status(201).json(loja);
        });
    });

    /* Endpoint de alteração de loja */
    app.put('/lojas/loja/:id', function (req, res) {
        /* Validações de valores de entrada da api. */
        req.assert("descricao", "Descrição da loja é obrigatório.").notEmpty();
        req.assert("codigo", "Código da loja é obrigatório.").notEmpty();
        req.assert("cep", "Cep da loja é obrigatório.").notEmpty();

        /* Tratamento de erros. */
        var erros = req.validationErrors();
        if (erros) {
            res.status(400).send(erros);
            return;
        }

        /* Recupera o objeto loja da requisição */
        var loja = req.body;
        /* Recupera o id da requisição e adiciona ao objeto loja */
        var id = req.params.id;
        loja.id = id;

        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var lojaDao = new app.provider.LojaDao(connection);

        /* Invoca o metodo de atualização de uma loja. */
        lojaDao.atualiza(loja, function (erro) {
            /* Tratamento de erros de retorno do metodo de atualizar. */
            if (erro) {
                res.status(500).send(erro);
                return;
            }

            /* Resposta de código http da requisição da api de lojas. */
            res.status(200).json(loja);
        });
    });

    /* Endpoint de deleção de uma loja */
    app.delete('/lojas/loja/:id', function (req, res) {
        /* Inicia o objeto loja */
        var loja = {};

        /* Recupera o id da requisição e adiciona ao objeto loja */
        var id = req.params.id;
        loja.id = id;

        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var lojaDao = new app.provider.LojaDao(connection);

        /* Invoca o metodo de deleção de um loja. */
        lojaDao.removePorId(loja, function (erro) {
            /* Tratamento de erros de retorno do metodo de deletar. */
            if (erro) {
                res.status(500).send(erro);
                return;
            }

            /* Resposta de código http da requisição da api de lojas. */
            res.status(204).json(loja);
        });
    });

    /* Endpoint de consulta de uma loja específica */
    app.get('/lojas/loja/:id', function (req, res) {
        /* Inicia o objeto loja */
        var loja = {};

        /* Recupera o id da requisição e adiciona ao objeto loja */
        var id = req.params.id;
        loja.id = id;

        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var lojaDao = new app.provider.LojaDao(connection);

        /* Invoca o metodo de consulta de um loja. */
        lojaDao.buscaPorId(loja, function (erro, resultado) {
            /* Retorna somente o primeiro elemento da lista */
            loja = resultado[0];
            /* Tratamento de erros de retorno do metodo de consultar. */
            if (erro) {
                res.status(500).send(erro);
                return;
            }

            /* Resposta de código http da requisição da api de lojas. */
            res.status(200).json(loja);
        });
    });

    /* Endpoint de consulta de todas as lojas */
    app.get('/lojas', function (req, res) {
        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var lojaDao = new app.provider.LojaDao(connection);

        /* Invoca o metodo de consulta de todas as lojas. */
        lojaDao.lista(function (erro, lojas) {
            /* Tratamento de erros de retorno do metodo de consultar. */
            if (erro) {
                res.status(500).send(erro);
                return;
            }

            /* Resposta de código http da requisição da api de lojas. */
            res.status(200).json(lojas);
        });
    });

    /* Endpoint de filtro de lojas */
    app.get('/lojas/buscar/:q', function (req, res) {
        /* Inicia o objeto loja */
        var loja = {};

        /* Recupera o termo da requisição e adiciona ao objeto loja */
        var termo = req.params.q;
        loja.codigo = termo;
        loja.descricao = termo;

        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var lojaDao = new app.provider.LojaDao(connection);

        /* Invoca o metodo de filtro de lojas. */
        lojaDao.buscarLojas(loja, function (erro, lojas) {
            /* Tratamento de erros de retorno do metodo de consultar. */
            if (erro) {
                res.status(500).send(erro);
                return;
            }

            /* Resposta de código http da requisição da api de lojas. */
            res.status(200).json(lojas);
        });
    });
}