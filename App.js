// app.js
require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('./personModel');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', async () => {
  console.log('Connexion à la base de données réussie !');

  // Créer plusieurs personnes
  const arrayOfPeople = [
    { nom: 'John Doe', age: 30, favoriteFoods: ['Pizza', 'Burger'] },
    { nom: 'Jane Smith', age: 25, favoriteFoods: ['Sushi', 'Pasta'] },
    // Ajoutez autant d'objets que nécessaire
  ];

  try {
    const createdPeople = await Person.create(arrayOfPeople);
    console.log('Personnes créées avec succès :', createdPeople);
  

    // Requête de recherche en chaîne pour les personnes qui aiment les burritos
    const favoriteFoodToSearch = 'burrito';
    const searchResult = await Person.find({ favoriteFoods: favoriteFoodToSearch })
      .sort({ nom: 'asc' })
      .limit(2)
      .select('-age')
      .exec();
    
    console.log('Résultats de la recherche :', searchResult);

    // Mettre à jour un document en ajoutant "hamburger" à la liste des aliments préférés
    const personIdToUpdate = createdPeople[0]._id;
    const updateResult = await Person.findByIdAndUpdate(
      personIdToUpdate,
      { $push: { favoriteFoods: 'hamburger' } },
      { new: true }
    );
    console.log('Personne mise à jour avec succès :', updateResult);

    // Rechercher une personne par _id
    const personIdToFind = createdPeople[1]._id;
    const findByIdResult = await Person.findById(personIdToFind);
    console.log('Personne trouvée par _id :', findByIdResult);

    // Supprimer une personne par _id
  const personIdToDelete = createdPeople[0]._id;
  const deleteResult = await Person.deleteOne({ _id: personIdToDelete });
  console.log('Personne supprimée avec succès :', deleteResult);
} catch (error) {
  console.error('Erreur :', error);
} finally {
    // Fermer la connexion à la base de données après toutes les opérations
    mongoose.connection.close();
  }
});
