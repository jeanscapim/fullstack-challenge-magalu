function VendaDao(connection) {
    this._connection = connection;
}

VendaDao.prototype.salva = function(venda, callback) {
    this._connection.query('INSERT INTO vendas SET ?', venda, callback);
}

VendaDao.prototype.atualiza = function(venda, callback) {
    this._connection.query('UPDATE vendas SET descricao_produto = ?, codigo_produto = ?, valor_produto = ? WHERE id = ?', [venda.descricao_produto, venda.codigo_produto, venda.valor_produto, venda.id], callback);
}

VendaDao.prototype.removePorId = function (venda, callback) {
    this._connection.query("DELETE FROM vendas WHERE id = ?", [venda.id], callback);
}

VendaDao.prototype.buscaPorId = function (venda, callback) {
    this._connection.query("SELECT vendas.id, descricao_produto, codigo_produto, valor_produto, vendas.data_criacao FROM vendas INNER JOIN lojas ON lojas.id = vendas.lojas_id WHERE vendas.id = ?", [venda.id], callback);
}

VendaDao.prototype.lista = function(venda, callback) {
    this._connection.query('SELECT vendas.id, descricao_produto, codigo_produto, valor_produto, vendas.data_criacao FROM vendas INNER JOIN lojas ON lojas.id = vendas.lojas_id WHERE vendas.lojas_id = ?', [venda.lojas_id], callback);
}

VendaDao.prototype.buscarVendas = function (venda, callback) {
    this._connection.query("SELECT vendas.id, descricao_produto, codigo_produto, valor_produto, vendas.data_criacao FROM vendas INNER JOIN lojas ON lojas.id = vendas.lojas_id WHERE vendas.lojas_id = ? and (descricao_produto LIKE ? or codigo_produto LIKE ?)", [venda.lojas_id, '%' + venda.descricao_produto + '%', '%' + venda.codigo_produto + '%'], callback);
}

VendaDao.prototype.encontrarVendas = function (venda, callback) {
    this._connection.query("SELECT vendas.id, descricao_produto, codigo_produto, valor_produto, cep, descricao, codigo FROM vendas INNER JOIN lojas ON lojas.id = vendas.lojas_id WHERE descricao_produto LIKE ? or codigo_produto LIKE ?", ['%' + venda.descricao_produto + '%', '%' + venda.codigo_produto + '%'], callback);
}

module.exports = function(){
    return VendaDao;
};