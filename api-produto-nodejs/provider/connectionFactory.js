var mysql  = require('mysql');

function createDBConnection(){
		return mysql.createConnection({
			host: '127.0.0.1',
			user: 'jeanscapim',
			password: '!@12QWqw',
			database: 'desafio',
			port: '3308'
		});
}

module.exports = function() {
	return createDBConnection;
}
