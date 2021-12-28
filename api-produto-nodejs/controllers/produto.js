module.exports = function(app){
    /* Endpoint de criação de produto */
    app.post('/produtos/produto', function(req, res){
        /* Validações de valores de entrada da api. */
        req.assert("produto.descricao", "Descrição do produto é obrigatório.").notEmpty();
        req.assert("produto.codigo", "Código do produto é obrigatório.").notEmpty();
        req.assert("produto.valor", "Valor do produto é obrigatório.").notEmpty().isFloat();

        /* Tratamento de erros. */
        var erros = req.validationErrors();
        if (erros){
            console.log('Erros de validação encontrados.');
            res.status(400).send(erros);
            return;
        }

        /* Recupera o objeto produto da requisição */
        var produto = req.body["produto"];
        produto.data_criacao = new Date;

        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var produtoDao = new app.provider.ProdutoDao(connection);

        /* Invoca o metodo de criação de um produto. */
        produtoDao.salva(produto, function(erro, resultado){
            /* Tratamento de erros de retorno do metodo de salvar. */
            if(erro){
                res.status(500).send(erro);
                return;
            }
            /* Recupera o id do produto criado */
            produto.id = resultado.insertId;
            
            /* Adiciona ao retorno o location da requisição. */
            res.location('/produtos/produto/' + produto.id);

            /* Resposta de código http da requisição da api de produtos. */
            res.status(201).json(produto);
        });
    });
    
    /* Endpoint de alteração de produto */
    app.put('/produtos/produto/:id', function(req, res){        
        /* Validações de valores de entrada da api. */
        req.assert("produto.descricao", "Descrição do produto é obrigatório.").notEmpty();
        req.assert("produto.codigo", "Código do produto é obrigatório.").notEmpty();
        req.assert("produto.valor", "Valor do produto é obrigatório.").notEmpty().isFloat();

        /* Tratamento de erros. */
        var erros = req.validationErrors();
        if (erros){
            console.log('Erros de validação encontrados.');
            res.status(400).send(erros);
            return;
        }

        /* Recupera o objeto produto da requisição */
        var produto = req.body["produto"];
        /* Recupera o id da requisição e adiciona ao objeto produto */
        var id = req.params.id;
        produto.id = id;

        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var produtoDao = new app.provider.ProdutoDao(connection);

        /* Invoca o metodo de atualização de um produto. */
        produtoDao.atualiza(produto, function(erro){
            /* Tratamento de erros de retorno do metodo de atualizar. */
            if(erro){
                res.status(500).send(erro);
                return;
            }

            /* Resposta de código http da requisição da api de produtos. */
            res.status(200).json(produto);
        });
    });

    /* Endpoint de deleção de um produto */
    app.delete('/produtos/produto/:id', function(req, res){
        /* Inicia o objeto produto */
        var produto = {};

        /* Recupera o id da requisição e adiciona ao objeto produto */
        var id = req.params.id;
        produto.id = id;

        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var produtoDao = new app.provider.ProdutoDao(connection);

        /* Invoca o metodo de deleção de um produto. */
        produtoDao.removePorId(produto, function(erro){
            /* Tratamento de erros de retorno do metodo de deletar. */
            if(erro){
                res.status(500).send(erro);
                return;
            }

            /* Resposta de código http da requisição da api de produtos. */
            res.status(204).json(produto);
        });
    });
    
    /* Endpoint de consulta de um produto específico */
    app.get('/produtos/produto/:id', function(req, res){
        /* Inicia o objeto produto */
        var produto = {};

        /* Recupera o id da requisição e adiciona ao objeto produto */
        var id = req.params.id;
        produto.id = id;

        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var produtoDao = new app.provider.ProdutoDao(connection);

        /* Invoca o metodo de consulta de um produto. */
        produtoDao.buscaPorId(produto, function(erro, resultado){
            /* Retorna somente o primeiro elemento da lista */
            produto = resultado[0];
            /* Tratamento de erros de retorno do metodo de consultar. */
            if(erro){
                res.status(500).send(erro);
                return;
            }

            /* Resposta de código http da requisição da api de produtos. */
            res.status(200).json(produto);
        });
    });
    
    /* Endpoint de consulta de todos os produtos */
    app.get('/produtos', function(req, res){
        /* Cria conexão com o banco de dados. */
        var connection = app.provider.connectionFactory();
        var produtoDao = new app.provider.ProdutoDao(connection);

        /* Invoca o metodo de consulta de todos os produto. */
        produtoDao.lista(function(erro, produtos){
            /* Tratamento de erros de retorno do metodo de consultar. */
            if(erro){
                res.status(500).send(erro);
                return;
            }

            /* Resposta de código http da requisição da api de produtos. */
            res.status(200).json(produtos);
        });
    });
}