const express = require('express'); 
const mongoose = require('mongoose'); 
const router = require('./routes')

const app = express(); 
const port = 3000; 

app.use(express.json()); 
app.use('/', router);

mongoose.connect('mongodb://localhost:27017/pokedex', {
	
}).then(() => {
	console.log('Conexão com o MongoDB realizada com sucesso :)'); 
}).catch((err) => {
	console.error('Conexão com o MongoDB sem sucesso :( '); 
}); 

app.listen(port, () => {
    console.log('Servidor rodando em htpp://localhost:${port}'); 
}); 