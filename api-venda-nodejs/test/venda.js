var express = require('../config/custom-express')();
var request = require('supertest')(express);

describe('#VendasController', function () {
    /* Limpa a base de testes. */
    // beforeEach(function (done) {
    //     /* Cria conexão com o banco de dados. */
    //     var connection = express.provider.connectionFactory();
    //     connection.query("delete from vendas", function (error, result) {
    //         if (!error) {
    //             done();
    //         }
    //     });
    // });

    /* Testes de criação */
    it('#cadastro de nova venda com dados invalidos', function (done) {
        request.post('/vendas/venda')
            .send({ lojas_id: 16, descricao_produto: "nova venda", codigo_produto: "", valor_produto: 10.00 })
            .expect(400, done);
    });
    it('#cadastro de nova venda com erro de chave primaria', function (done) {
        request.post('/vendas/venda')
            .send({ lojas_id: 0, descricao_produto: "nova venda", codigo_produto: "001", valor_produto: 10.00 })
            .expect(500, done);
    });

    it('#cadastro de nova venda com dados validos', function (done) {
        request.post('/vendas/venda')
            .send({ lojas_id: 16, descricao_produto: "nova venda", codigo_produto: "001", valor_produto: 10.00 })
            .expect(201, done);
    });

    /* Testes de alteração */
    it('#alteracao de venda com dados invalidos', function (done) {
        request.put('/vendas/venda/1')
            .send({ descricao_produto: "nova venda", codigo_produto: "", valor_produto: 10.00 })
            .expect(400, done);
    });

    it('#alteracao de venda com dados validos', function (done) {
        request.put('/vendas/venda/1')
            .send({ descricao_produto: "nova venda", codigo_produto: "01", valor_produto: 10.00 })
            .expect(200, done);
    });

    /* Testes de deleção */
    it('#delecao por id', function (done) {
        request.delete('/vendas/venda/1')
            .expect(204, done);
    });

    /* Testes de listagem */
    it('#listagem de todos', function (done) {
        request.get('/vendas/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('#listagem por id', function (done) {
        request.get('/vendas/venda/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    /* Testes de busca */
    it('#busca com resultados', function (done) {
        request.get('/vendas/buscar/teste/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('#busca de cep com resultados', function (done) {
        request.get('/vendas/encontrar/teste/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});