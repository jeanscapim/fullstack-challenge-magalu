var app = require('./config/custom-express')();

var porta = process.env.PORT || 3002;
app.listen(porta, function(){
  console.log('Servidor rodando.');
});
