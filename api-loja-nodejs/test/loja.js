var express = require('../config/custom-express')();
var request = require('supertest')(express);

describe('#LojasController', function () {
    /* Limpa a base de testes. */
    // beforeEach(function (done) {
    //     /* Cria conexão com o banco de dados. */
    //     var connection = express.provider.connectionFactory();
    //     connection.query("delete from lojas", function (error, result) {
    //         if (!error) {
    //             done();
    //         }
    //     });
    // });

    /* Testes de criação */
    it('#cadastro de nova loja com dados invalidos', function (done) {
        request.post('/lojas/loja')
            .send({ descricao: "nova loja", codigo: "", cep: 12345678 })
            .expect(400, done);
    });

    it('#cadastro de nova loja com dados validos', function (done) {
        request.post('/lojas/loja')
            .send({ descricao: "nova loja", codigo: "01", cep: 12345678 })
            .expect(201, done);
    });

    /* Testes de alteração */
    it('#alteracao de loja com dados invalidos', function (done) {
        request.put('/lojas/loja/25')
            .send({ descricao: "alterar loja", codigo: "", cep: 12345678 })
            .expect(400, done);
    });

    it('#alteracao de loja com dados validos', function (done) {
        request.put('/lojas/loja/25')
            .send({ descricao: "alterar loja", codigo: "01", cep: 12345678 })
            .expect(200, done);
    });

    /* Testes de deleção */
    it('#delecao por id', function (done) {
        request.delete('/lojas/loja/22')
            .expect(204, done);
    });

    /* Testes de listagem */
    it('#listagem de todos', function (done) {
        request.get('/lojas')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('#listagem por id', function (done) {
        request.get('/lojas/loja/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    /* Testes de busca */
    it('#busca com resultados', function (done) {
        request.get('/lojas/buscar/teste')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});