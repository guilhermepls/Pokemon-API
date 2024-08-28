const mongoose = require('mongoose'); 

const pokemonSchema = new mongoose.Schema({ 
	_id: {
        type: Number, 
        required: true,
    },
	nome: {
		type: String, 
		required: true, 
	}, 
	tipo: {
		type: String, 
		enum: ['Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Rock', 'Ghost', 'Ground', 'Flying', 'Psychic', 'Bug', 'Dragon', 'Dark', 'Steel', 'Fairy', 'Normal'], 
	    required: true, 
	}, 
	imagem: { 
		type: String, 
		required: true, 
	},
	
}); 

module.exports = mongoose.model('Pokemon', pokemonSchema); 