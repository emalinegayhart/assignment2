const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const petList = [
  { name: 'Fluffy', species: 'Dog', age: 2 },
  { name: 'Sassy', species: 'Cat', age: 4 },
  { name: 'Goldberg', species: 'Frog', age: 1.3 },
];

const schema = buildSchema(`
  type About {
    message: String!
  }

  type Meal {
    description: String!
  }

  enum MealTime {
    breakfast
    lunch
    dinner
  }

  interface Pet {
    name: String!
    species: String!
    age: Float!
  }

  type Mammal implements Pet {
    name: String!
    species: String!
    age: Float!
    furType: String!
  }

  type Reptile implements Pet {
    name: String!
    species: String!
    age: Float!
    scaleType: String!
  }

  type PetImpl implements Pet {
    name: String!
    species: String!
    age: Float!
  }

  type Time {
    hour: Int!
    minute: Int!
    second: Int!
  }

  type RollResult {
    total: Int!
    sides: Int!
    rolls: [Int!]!
  }

  type Query {
    getAbout: About
    getMeal(time: MealTime!): Meal
    allPets: [Pet!]!
    getPet(id: Int!): Pet
    firstPet: Pet
    lastPet: Pet
    getTime: Time
    getRandom(range: Int!): Int
    getRoll(sides: Int!, rolls: Int!): RollResult
    petsInRange(start: Int!, count: Int!): [Pet!]!
    getPetBySpecies(species: String!): [Pet!]!
    allSpecies: [String!]!
  }

  type Mutation {
    addPet(name: String!, species: String!, age: Float!): Pet
  }
`);

const root = {
  getAbout: () => {
    return { message: 'Hello World' };
  },
  getMeal: ({ time }) => {
    const allMeals = { breakfast: 'toast', lunch: 'noodles', dinner: 'pizza' };
    const meal = allMeals[time];
    return { description: meal };
  },
  allPets: () => petList,
  getPet: ({ id }) => petList[id],
  firstPet: () => petList[0],
  lastPet: () => petList[petList.length - 1],
  getTime: () => {
    const now = new Date();
    return {
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds(),
    };
  },
  getRandom: ({ range }) => {
    return Math.floor(Math.random() * range);
  },
  getRoll: ({ sides, rolls }) => {
    let total = 0;
    const rollResults = [];
    for (let i = 0; i < rolls; i++) {
      const roll = Math.floor(Math.random() * sides) + 1;
      rollResults.push(roll);
      total += roll;
    }
    return { total, sides, rolls: rollResults };
  },
  petsInRange: ({ start, count }) => {
    return petList.slice(start, start + count);
  },
  getPetBySpecies: ({ species }) => {
    return petList.filter(pet => pet.species.toLowerCase() === species.toLowerCase());
  },
  allSpecies: () => {
    return [...new Set(petList.map(pet => pet.species))];
  },
  addPet: ({ name, species, age }) => {
    const newPet = { name, species, age };
    petList.push(newPet);
    return newPet;
  },
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = 4000;
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
