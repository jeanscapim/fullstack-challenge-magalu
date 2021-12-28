var mysql  = require('mysql');

function createDBConnection(){
		return mysql.createConnection({
			host: 'us-cdbr-iron-east-05.cleardb.net',
			user: 'be7b2650e6e295',
			password: '671a2711',
			database: 'heroku_367515a9fccaef2',
			port: '3306'
		});
}

module.exports = function() {
	return createDBConnection;
}
