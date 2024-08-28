const express = require('express'); 
const mongoose = require('mongoose'); 
const router = require('./routes')

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use(express.json()); 
app.use('/', router);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pokedex';  

mongoose.connect(MONGODB_URI).then(() => {
	console.log('Conexão com o MongoDB realizada com sucesso :)'); 
}).catch((err) => {
	console.error('Conexão com o MongoDB sem sucesso :( '); 
}); 

app.listen(PORT, () => {
    console.log('Servidor rodando em htpp://localhost:${port}'); 
}); 