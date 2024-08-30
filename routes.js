const express = require('express');
const Pokemon = require('./models/Pokemon');  

const router = express.Router(); 

router.get('/', (req, res) => {
	res.send('API está funcionando corretamente!');  
});

router.get('/pokemons', async (req, res) => {
	try {
		const pokemons = await Pokemon.find();
		res.json(pokemons); 
	} catch (err) { 
		res.status(500).json({ message: err.message }); 
	}
}); 

router.get('/pokemons/:id', async (req, res) => {
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

router.post('/pokemons', async (req, res) => {
	const pokemon = new Pokemon({ 
		nome: req.body.nome, 
		numero: req.body.numero, 
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

router.put('/pokemons/:id', async (req, res) => {
    try {
        const pokemonAtualizado = await Pokemon.findOneAndUpdate(
            { _id: req.params.id }, 
            req.body,              
            { new: true, runValidators: true } 
        );

		console.log('Pokemon atualizado:', pokemonAtualizado);


        if (!pokemonAtualizado) {
            return res.status(404).json({ message: 'Pokémon não encontrado' });
        }

        res.json(pokemonAtualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/pokemons/:id', async (req, res) => {
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

module.exports = router;