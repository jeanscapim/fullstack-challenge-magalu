var distance = require('google-distance-matrix');

module.exports = function (app) {
    /* Endpoint de criação de venda */
    app.post('/vendas/venda', function (req, res) {
        /* Validações de valores de entrada da api. */
        req.assert("lojas_id", "Loja do produto é obrigatório.").notEmpty();
        req.assert("descricao_produto", "Descrição do produto é obrigatório.").notEmpty();
        req.assert("codigo_produto", "Código do produto é obrigatório.").notEmpty();
        req.assert("valor_produto", "Preço do produto é obrigatório.").notEmpty().isFloat();

        /* Tratamento de erros. */
        var erros = req.validationErrors();
        if (erros) {
            res.status(400).send(erros);
            return;
        }

        /* Recupera o objeto venda da requisição */
        var venda = req.body;
        venda.data_criacao = new Date;

        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var vendaDao = new app.provider.VendaDao(connection);

        /* Invoca o metodo de criação de uma venda. */
        vendaDao.salva(venda, function (erro, resultado) {
            /* Tratamento de erros de retorno do metodo de salvar. */
            if (erro) {
                res.status(500).send(erro);
                return;
            }
            /* Recupera o id da venda criada */
            venda.id = resultado.insertId;

            /* Adiciona ao retorno o location da requisição. */
            res.location('/vendas/venda/' + venda.id);

            /* Resposta de código http da requisição da api de vendas. */
            res.status(201).json(venda);
        });
    });

    /* Endpoint de alteração de venda */
    app.put('/vendas/venda/:id', function (req, res) {
        /* Validações de valores de entrada da api. */
        //req.assert("lojas_id", "Loja do produto é obrigatório.").notEmpty();
        req.assert("descricao_produto", "Descrição do produto é obrigatório.").notEmpty();
        req.assert("codigo_produto", "Código do produto é obrigatório.").notEmpty();
        req.assert("valor_produto", "Preço do produto é obrigatório.").notEmpty().isFloat();

        /* Tratamento de erros. */
        var erros = req.validationErrors();
        if (erros) {
            res.status(400).send(erros);
            return;
        }

        /* Recupera o objeto venda da requisição */
        var venda = req.body;
        /* Recupera o id da requisição e adiciona ao objeto venda */
        var id = req.params.id;
        venda.id = id;

        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var vendaDao = new app.provider.VendaDao(connection);

        /* Invoca o metodo de atualização de uma venda. */
        vendaDao.atualiza(venda, function (erro) {
            /* Tratamento de erros de retorno do metodo de atualizar. */
            if (erro) {
                res.status(500).send(erro);
                return;
            }

            /* Resposta de código http da requisição da api de vendas. */
            res.status(200).json(venda);
        });
    });

    /* Endpoint de deleção de uma venda */
    app.delete('/vendas/venda/:id', function (req, res) {
        /* Inicia o objeto venda */
        var venda = {};

        /* Recupera o id da requisição e adiciona ao objeto venda */
        var id = req.params.id;
        venda.id = id;

        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var vendaDao = new app.provider.VendaDao(connection);

        /* Invoca o metodo de deleção de um venda. */
        vendaDao.removePorId(venda, function (erro) {
            /* Tratamento de erros de retorno do metodo de deletar. */
            if (erro) {
                res.status(500).send(erro);
                return;
            }

            /* Resposta de código http da requisição da api de vendas. */
            res.status(204).json(venda);
        });
    });

    /* Endpoint de consulta de uma venda específica */
    app.get('/vendas/venda/:id', function (req, res) {
        /* Inicia o objeto loja */
        var venda = {};

        /* Recupera o id da requisição e adiciona ao objeto venda */
        var id = req.params.id;
        venda.id = id;

        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var vendaDao = new app.provider.VendaDao(connection);

        /* Invoca o metodo de consulta de um venda. */
        vendaDao.buscaPorId(venda, function (erro, resultado) {
            /* Retorna somente o primeiro elemento da lista */
            venda = resultado[0];
            /* Tratamento de erros de retorno do metodo de consultar. */
            if (erro) {
                res.status(500).send(erro);
                return;
            }

            /* Resposta de código http da requisição da api de vendas. */
            res.status(200).json(venda);
        });
    });

    /* Endpoint de consulta de todas as vendas */
    app.get('/vendas/:id', function (req, res) {
        /* Inicia o objeto loja */
        var venda = {};

        /* Recupera o id da requisição e adiciona ao objeto venda */
        var id = req.params.id;
        venda.lojas_id = id;

        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var vendaDao = new app.provider.VendaDao(connection);

        /* Invoca o metodo de consulta de todas as vendas. */
        vendaDao.lista(venda, function (erro, vendas) {
            /* Tratamento de erros de retorno do metodo de consultar. */
            if (erro) {
                res.status(500).send(erro);
                return;
            }

            /* Resposta de código http da requisição da api de vendas. */
            res.status(200).json(vendas);
        });
    });

    /* Endpoint de filtro de vendas */
    app.get('/vendas/buscar/:q/:id', function (req, res) {
        /* Inicia o objeto venda */
        var venda = {};

        /* Recupera o termo da requisição e adiciona ao objeto venda */
        var termo = req.params.q;
        venda.codigo_produto = termo;
        venda.descricao_produto = termo;
        var id = req.params.id;
        venda.lojas_id = id;

        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var vendaDao = new app.provider.VendaDao(connection);

        /* Invoca o metodo de filtro de vendas. */
        vendaDao.buscarVendas(venda, function (erro, vendas) {
            /* Tratamento de erros de retorno do metodo de consultar. */
            if (erro) {
                res.status(500).send(erro);
                return;
            }

            /* Resposta de código http da requisição da api de vendas. */
            res.status(200).json(vendas);
        });
    });

    /* Endpoint de filtro de vendas */
    app.get('/vendas/encontrar/:q/:cep', function (req, res) {
        /* Inicia o objeto venda */
        var venda = {};

        /* Recupera o termo da requisição e adiciona ao objeto venda */
        var termo = req.params.q;
        venda.codigo_produto = termo;
        venda.descricao_produto = termo;
        var cep = req.params.cep;
        venda.cep = cep;

        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var vendaDao = new app.provider.VendaDao(connection);

        /* Invoca o metodo de encontrar vendas. */
        vendaDao.encontrarVendas(venda, function (erro, vendas) {
            /* Tratamento de erros de retorno do metodo de encontrar. */
            if (erro) {
                res.status(500).send(erro);
                return;
            }

            var distancias = [];
            vendas.forEach(venda => {
                let resultadoVenda = {};
                distancias.push(new Promise((resolve, reject) => {
                    distance.matrix([cep], [venda.cep], function (erro, distances) {
                        if (!erro) {
                            resultadoVenda.id = venda.id;
                            resultadoVenda.descricao_produto = venda.descricao_produto;
                            resultadoVenda.codigo_produto = venda.codigo_produto;
                            resultadoVenda.valor_produto = venda.valor_produto;
                            resultadoVenda.cep = venda.cep;
                            resultadoVenda.descricao = venda.descricao;
                            resultadoVenda.codigo = venda.codigo;
                            resultadoVenda.distancia = distances.rows[0].elements[0].distance.text;
                            resultadoVenda.duracao = distances.rows[0].elements[0].duration.text;

                            resolve(resultadoVenda);
                        }
                        else {
                            reject(erro);
                        }
                    });
                }));
            });

            Promise.all(distancias)
                .then(response => {
                    /* Resposta de código http da requisição da api de vendas. */
                    res.status(200).json(response.sort());
                })
                .catch(erro => {
                    /* Resposta de código http da requisição da api de vendas. */
                    res.status(500).send(erro);
                });
        });
    });
}