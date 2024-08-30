const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({ 
	nome: {
		type: String, 
		required: true, 
	}, 
	numero: {
		type: Number,
		required: true,
		unique: true,
	},
	tipo: {
		type: [String], 
		enum: ['Fire', 
			   'Water', 
			   'Grass', 
			   'Electric', 
			   'Ice', 
			   'Fighting', 
			   'Poison', 
			   'Rock', 
			   'Ghost', 
			   'Ground', 
			   'Flying', 
			   'Psychic', 
			   'Bug', 
			   'Dragon', 
			   'Dark', 
			   'Steel', 
			   'Fairy', 
			   'Normal'], 
		required: true, 
		validate: {
			validator: function(array) {
				return array.length > 0 && array.length <= 2; 
			}
		}
	}, 
	imagem: { 
		type: String, 
		required: true, 
	},
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
