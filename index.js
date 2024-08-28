const express = require('express'); 
const mongoose = require('mongoose'); 

const app = express(); 
const port = 3000; 

app.use(express.json()); 

mongoose.connect('mongodb://localhost:27017/pokedex', {
	
}).then(() => {
	console.log('Conexão com o MongoDB realizada com sucesso :)'); 
}).catch((err) => {
	console.error('Conexão com o MongoDB sem sucesso :( '); 
}); 

app.get('/', (req, res) => {
	res.send('API está funcionando!'); 
});

app.listen(port, () => {
    console.log('Servidor rodando em htpp://localhost:${port}'); 
}); 

const Pokemon = require('./models/Pokemon'); 

app.get('/pokemons', async (req, res) => {
	try {
		const pokemons = await Pokemon.find(); 
		res.json(pokemons); 
	} catch (err) { 
		res.status(500).json({ message: err.message }); 
	}
}); 

app.get('/pokemons/:id', async (req, res) => {
	try {
		const pokemon = await Pokemon.findById(req.params.id); 
		if (pokemon == null) { 
			return res.status(404).json({ message: 'Pokémon não encontrado'}); 
		}
		res.json(pokemon); 
	} catch (err) {
		res.status(500).json({ message: err.message}); 
	}
}); 

app.post('/pokemons', async (req, res) => {
	const pokemon = new Pokemon({ 
		_id: req.body._id, 
		nome: req.body.nome, 
		tipo: req.body.tipo, 
		imagem: req.body.imagem, 
	}); 

	try {
		const novoPokemon = await pokemon.save(); 
		res.status(201).json(novoPokemon); 
	} catch (err) {
		res.status(400).json({ message: err.message}); 
	}
}); 

app.put('/pokemons/:id', async (req, res) => {
	try {
		const pokemon = await Pokemon.findById(req.params.id); 
		if (pokemon == null) {
			return res.status(404).json({ message: 'Pokémon não encontrado'})
		}; 

		pokemon.nome = req.body.nome || pokemon.nome; 
		pokemon.numero = req.body.numero || pokemon.numero; 
		pokemon.tipo = req.body.tipo || pokemon.tipo; 
		pokemon.imagem = req.body.imagem || pokemon.imagem; 

		const pokemonAtualizado = await pokemon.save(); 
		res.json(pokemonAtualizado); 
	} catch (err) { 
		res.status(400).json({ message: err.message }); 
	}
}); 

app.delete('/pokemons/:id', async (req, res) => {
	try { 
		const pokemon = await Pokemon.findById(req.params.id); 
		if(pokemon == null) {
			return res.status(404).json({ message: 'Pokémon não encontrado'}); 
		}

		await pokemon.deleteOne(); 
		res.json({ message: 'Pokémon removido'}); 
	} catch (err) {
		res.status(500).json({ message: err.message }); 
	}
}); 