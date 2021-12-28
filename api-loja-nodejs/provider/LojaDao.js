function LojaDao(connection) {
    this._connection = connection;
}

LojaDao.prototype.salva = function(loja, callback) {
    this._connection.query('INSERT INTO lojas SET ?', loja, callback);
}

LojaDao.prototype.atualiza = function(loja, callback) {
    this._connection.query('UPDATE lojas SET descricao = ?, codigo = ?, cep = ? WHERE id = ?', [loja.descricao, loja.codigo, loja.cep, loja.id], callback);
}

LojaDao.prototype.removePorId = function (loja, callback) {
    this._connection.query("DELETE FROM lojas WHERE id = ?", [loja.id], callback);
}

LojaDao.prototype.buscaPorId = function (loja, callback) {
    this._connection.query("SELECT * FROM lojas WHERE id = ?", [loja.id], callback);
}

LojaDao.prototype.lista = function(callback) {
    this._connection.query('SELECT * FROM lojas', callback);
}

LojaDao.prototype.buscarLojas = function (loja, callback) {
    this._connection.query("SELECT * FROM lojas WHERE descricao LIKE ? or codigo LIKE ?", ['%' + loja.descricao + '%', '%' + loja.codigo + '%'], callback);
}

module.exports = function(){
    return LojaDao;
};