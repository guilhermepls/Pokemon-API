const express = require('express');
const Pokemon = require('./models/Pokemon');  

const router = express.Router(); 

router.get('/', (req, res) => {
	res.send('API está funcionando corretamente!');  
});

router.get('/pokemons', async (req, res) => {
	try {
		const pokemons = await Pokemon.find();
		res.json({ 
			message: 'Aqui está! Essa é a lista de todos os pokémons que você possui :)', 
			pokemons: pokemons 
		});
       } catch (err) { 
		res.status(500).json({ 
			message: err.message 
		}); 
	}
}); 

router.get('/pokemons/:id', async (req, res) => {
	try {
		const pokemon = await Pokemon.findById(req.params.id);
		if (pokemon == null) { 
			return res.status(404).json({ 
				message: 'Esse deve ter fugido! Esse pokémon não existe :('
			}); 
		}
		res.json({ 
			message: 'Aqui está! Encontramos o pokémon para você :)', 
			pokemon: pokemon 
		});
	} catch (err) {
		res.status(500).json({ 
			message: 'Ihh! Deu problema! O pokémon não foi encontrado :(' 
		}); 
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
		res.status(400).json({ 
			message: 'Você encontrou o irmão gêmeo dele? Esse pokémon já existe ou você forneceu informações incorretas!'
		}); 
	}
}); 

router.put('/pokemons/:id', async (req, res) => {
    try {
        const pokemonAtualizado = await Pokemon.findOneAndUpdate(
            { _id: req.params.id }, 
            req.body,              
            { new: true, runValidators: true } 
        );

        if (!pokemonAtualizado) {
            return res.status(404).json({ 
				message: 'Você tá me zoando? Esse pokémon nào existe!' 
			});
        }
		res.json({
            message: `O Pokémon ${pokemonAtualizado.nome} foi atualizado com sucesso! Agora ele possui novas habilidades.`,
            pokemon: pokemonAtualizado
        });
    } catch (err) {
        res.status(400).json({message: 'Ops... Esse pokémon já existe!' });
    }
});

router.delete('/pokemons/:id', async (req, res) => {
	try { 
		const pokemon = await Pokemon.findById(req.params.id); 
		if(pokemon == null) {
			return res.status(404).json({ 
				message: 'Ele foi mais rápido! Pokémon não encontrado!'
			}); 
		}

		await pokemon.deleteOne(); 
		res.json({ 
			message: 'Pokémon removido com sucesso!'
		}); 
	} catch (err) {
		res.status(500).json({ message: err.message }); 
	}
}); 

module.exports = router;