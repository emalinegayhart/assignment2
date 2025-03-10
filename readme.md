# GraphQL Express Server

This project sets up an Express server with GraphQL integration. It serves data via GraphQL queries and supports various features, including basic queries, mutations, enums, and more.

## Features

- **Query Types**:
  - `getAbout`: Returns a simple message.
  - `getMeal`: Returns a meal based on the provided time (`breakfast`, `lunch`, `dinner`).
  - `allPets`: Returns a list of all pets.
  - `getPet`: Returns a pet by ID.
  - `firstPet`: Returns the first pet in the list.
  - `lastPet`: Returns the last pet in the list.
  - `getTime`: Returns the current time (hour, minute, second).
  - `getRandom`: Returns a random number based on a provided range.
  - `getRoll`: Simulates a dice roll and returns the total and individual rolls.
  - `petsInRange`: Returns a subset of pets within a specified range.
  - `getPetBySpecies`: Returns pets filtered by species.
  - `allSpecies`: Returns all unique species from the pet list.

- **Mutation Type**:
  - `addPet`: Adds a new pet to the pet list.

- **Enums**:
  - `MealTime`: Enum for the times of day (`breakfast`, `lunch`, `dinner`).

- **Interface**:
  - `Pet`: Defines common properties (`name`, `species`, `age`) for different pet types.
  - `Mammal` and `Reptile` implement the `Pet` interface with additional properties (`furType`, `scaleType`).

## Installation

### Prerequisites

- **Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed.

### Steps

1. Clone the repository:

   ```
   git clone <repo-url>
   cd <repo-folder>
   ```

2. Initialize the project and install dependencies:

   ```
   npm init -y
   npm install --save express express-graphql graphql
   npm install -g nodemon
   ```

3. Create a `.gitignore` file to exclude `node_modules` and other unnecessary files:

   ```
   node_modules
   ```

4. Update your `package.json` file to include a start script:

   ```
   "scripts": {
     "start": "nodemon server.js"
   }
   ```

5. Run the app:

   ```
   npm start
   ```

6. The server will be running at `http://localhost:4000/graphql`.

## Usage

### GraphiQL Interface

- Once the server is running, open your browser and navigate to `http://localhost:4000/graphql` to access the **GraphiQL** interface.
- In GraphiQL, you can write and test GraphQL queries and mutations.

### Example Queries

#### 1. Get All Pets

```
{
  allPets {
    name
    species
    age
  }
}
```

#### 2. Add a New Pet

```
mutation {
  addPet(name: "Spike", species: "Dog", age: 3) {
    name
    species
    age
  }
}
```

#### 3. Get Pet by Species

```
{
  getPetBySpecies(species: "Cat") {
    name
    species
  }
}
```

#### 4. Get Current Time

```
{
  getTime {
    hour
    minute
    second
  }
}
```

#### 5. Dice Roll Simulation

```
{
  getRoll(sides: 6, rolls: 3) {
    total
    sides
    rolls
  }
}
```

#### 6. Get Random Number

```
{
  getRandom(range: 100)
}
```

#### 7. Get Pets in Range (Paginated Results)

```
{
  petsInRange(start: 0, count: 2) {
    name
    species
  }
}
```

#### 8. Get First Pet

```
{
  firstPet {
    name
    species
    age
  }
}
```

#### 9. Get Last Pet

```
{
  lastPet {
    name
    species
    age
  }
}
```

#### 10. Get Meal (with Enum for MealTime)

```
{
  getMeal(time: lunch) {
    description
  }
}
```

## Schema Overview

The GraphQL schema includes the following types:

- **About**: Simple message object.
- **Meal**: Represents a meal with a description.
- **MealTime Enum**: Enum for `breakfast`, `lunch`, and `dinner`.
- **Pet (Interface)**: The basic pet type with properties `name`, `species`, and `age`.
  - **Mammal**: A pet that is a mammal, with an additional `furType` property.
  - **Reptile**: A pet that is a reptile, with an additional `scaleType` property.
- **Time**: Represents the current time with `hour`, `minute`, and `second`.
- **RollResult**: Represents the result of dice rolls, including the `total` of the rolls and the `rolls` array.
- **Query Type**: Contains various queries to fetch pets, meals, time, random numbers, and more.
- **Mutation Type**: Contains the `addPet` mutation to add a new pet.

## GraphQL Queries and Mutations

### Queries

- `getAbout`: Returns a simple message.
- `getMeal`: Returns a meal based on a given time (`breakfast`, `lunch`, `dinner`).
- `allPets`: Returns a list of all pets.
- `getPet`: Returns a single pet by ID.
- `firstPet`: Returns the first pet in the list.
- `lastPet`: Returns the last pet in the list.
- `getTime`: Returns the current time (hour, minute, second).
- `getRandom`: Returns a random number within a specified range.
- `getRoll`: Simulates a dice roll with a specified number of rolls and sides.
- `petsInRange`: Returns a subset of pets within a specified range.
- `getPetBySpecies`: Returns pets by their species.
- `allSpecies`: Returns all unique species from the pet list.

### Mutations

- `addPet`: Adds a new pet to the pet list with the provided `name`, `species`, and `age`.
