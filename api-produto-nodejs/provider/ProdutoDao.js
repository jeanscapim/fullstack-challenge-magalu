function ProdutoDao(connection) {
    this._connection = connection;
}

ProdutoDao.prototype.salva = function(produto, callback) {
    this._connection.query('INSERT INTO produtos SET ?', produto, callback);
}

ProdutoDao.prototype.atualiza = function(produto, callback) {
    this._connection.query('UPDATE produtos SET descricao = ?, codigo = ?, valor = ? where id = ?', [produto.descricao, produto.codigo, produto.valor, produto.id], callback);
}

ProdutoDao.prototype.removePorId = function (produto, callback) {
    this._connection.query("delete from produtos where id = ?", [produto.id], callback);
}

ProdutoDao.prototype.buscaPorId = function (produto, callback) {
    this._connection.query("select * from produtos where id = ?", [produto.id], callback);
}

ProdutoDao.prototype.lista = function(callback) {
    this._connection.query('select * from produtos', callback);
}

module.exports = function(){
    return ProdutoDao;
};