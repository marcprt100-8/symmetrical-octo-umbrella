// insertData.js
require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('./personModel');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', async () => {
  console.log('Connexion à la base de données réussie !');

  // Insérer des données dans la base de données
  const peopleData = [
    { nom: 'John Doe', age: 30, favoriteFoods: ['Pizza', 'Burger'] },
    { nom: 'Jane Smith', age: 25, favoriteFoods: ['Sushi', 'Pasta'] },
    // Ajoutez autant d'objets que nécessaire
  ];

  try {
    const insertedPeople = await Person.create(peopleData);
    console.log('Données insérées avec succès :', insertedPeople);
  } catch (insertError) {
    console.error('Erreur lors de l\'insertion des données :', insertError);
  } finally {
    // Fermer la connexion à la base de données après l'opération create
    mongoose.connection.close();
  }
});
