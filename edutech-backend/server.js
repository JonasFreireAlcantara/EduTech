const express    = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');

const port = 5000;
const uri = "mongodb+srv://admin:admin@cluster0.ewelv.mongodb.net/test?retryWrites=true&w=majority";

const app = express();

// SETANDO VARIÁVEIS DA APLICAÇÃO
app.set('port', process.env.PORT || port);

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors())

mongoose.connect(uri, { useUnifiedTopology: true });

mongoose.connection.on('connected', function () {
  console.log('Connected to Database EduTech!');
});

mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

// ‘END POINT INVÁLIDO!’
app.get('/', function(req, res){
  res.send('END POINT INVÁLIDO!');
});

// todos os url's começado por ‘/api’ chama as rotas em ‘./routes/api’
const routes = require('./api/routes/api');
app.use('/api', routes);

// Tratamento de erros
app.use(function(err, req, res, next){
  // ‘res.status(422)’->muda o status
  res.status(422).send({error: err.message});
});

// RODANDO A APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});

