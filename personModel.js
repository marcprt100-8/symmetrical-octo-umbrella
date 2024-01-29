const mongoose = require('mongoose');

// Définir le schéma de la personne
const personSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true // Champ obligatoire
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String] // Tableau de chaînes
  }
});

// Créer le modèle à partir du schéma
const Person = mongoose.model('Person', personSchema);

// Exporter le modèle pour l'utiliser ailleurs dans votre application
module.exports = Person;
