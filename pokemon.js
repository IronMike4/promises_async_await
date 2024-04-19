/* This pokemon.js file fetches data about a specific Pokemon ("charizard") from the PokeAPI and prints its name,
   weight, and abilities to the console in a formatted manner. It uses promises for asynchronous operations and error handling.
The following resources were used to complete this assignment:
 - https://stackoverflow.com/questions/62110181/pokeapi-fetching-pokemon-data
 - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
 - https://www.freecodecamp.org/news/javascript-promise-tutorial-how-to-resolve-or-reject-promises-in-js/
 - https://stackoverflow.com/questions/2351576/replacing-quotation-marks-in-javascript
For more information about this please visit https://github.com/IronMike4/promises_async_await.git */

// Function to fetch data from the Pokemon API
function fetchPokemonData() {
  // Define the name of the Pokemon to retrieve data for
  const pokemonName = "charizard";

  // Return a Promise to handle asynchronous data fetching
  return new Promise((resolve, reject) => {
    // Fetch data from the PokeAPI using the specified Pokemon name
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        // Check if the response is successful
        if (!response.ok) {
          // If not successful reject the promise with an error message
          return Promise.reject("Failed to fetch Pokemon data!");
        }
        // If successful parse the JSON data and resolve the promise with it
        return response.json();
      })
      // Resolve the promise with the parsed JSON data
      .then(resolve)
      // Catch any errors and reject the promise with the error
      .catch(reject);
  });
}

// Function to print Pokemon information
function printPokemonInfo() {
  // Return a Promise to handle asynchronous printing of Pokemon information
  return new Promise((resolve, reject) => {
    // Fetch Pokemon data using the fetchPokemonData function
    fetchPokemonData()
      .then((pokemonData) => {
        // Check if Pokemon data is available
        if (pokemonData) {
          // Format the abilities of the Pokemon
          const formattedAbilities = pokemonData.abilities.map((ability) => ({
            ability: {
              name: `'${ability.ability.name}'`,
              url: `'${ability.ability.url}'`,
            },
            is_hidden: ability.is_hidden,
            slot: ability.slot,
          }));

          // Format the abilities array as a JSON string without double quotes
          const abilitiesString = JSON.stringify(
            formattedAbilities,
            null,
            4
          ).replace(/"/g, "");

          // Create an object containing Pokemon information
          const pokemonInfo = {
            name: pokemonData.name,
            weight: pokemonData.weight,
            abilities: abilitiesString,
          };

          // Resolve the promise with the Pokemon information object
          resolve(pokemonInfo);
        } else {
          // If Pokemon data is not available, reject the promise with an error message
          reject("Pokemon data not found!");
        }
      })
      // Catch any errors and reject the promise with the error
      .catch(reject);
  });
}

// Call the function to print Pokemon information
printPokemonInfo()
  .then((pokemonInfo) => {
    // Log Pokemon information to the console
    console.log(`Name:\n${pokemonInfo.name}\n`);
    console.log(`Weight:\n${pokemonInfo.weight}\n`);
    console.log(`Abilities:\n${pokemonInfo.abilities}\n`);
  })
  // Log any errors to the console
  .catch((error) => console.error("Error printing Pokemon info:", error));
