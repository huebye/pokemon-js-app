let pokemonRepository = (function() {
  let pokemonList = [
                    {name: "Charizard", height: 1.7, type: ["fire", "flying"], attack: 84, defense: 78},
                    {name: "Pikachu", height: 0.4, type: ["electric", "fairy"], attack: 55, defense: 40},
                    {name: "Ninetales", height: 1.1, type: ["fire", "field"], attack: 76, defense: 75},
                    {name: "Wobbuffet", height: 1.3, type: ["psychic", "telepathy"], attack: 33, defense: 58},
                    {name: "Blastoise", height: 1.6, type: ["water", "monster"], attack: 83, defense: 100},
                    {name: "Clefable", height: 1.3, type: ["fairy", "poison"], attack: 70, defense: 73},
                    {name: "Nidoking", height: 1.4, type: ["ground", "poison"], attack: 102, defense: 77},
                    {name: "Ursaring", height: 1.8, type: ["normal", "field"], attack: 130, defense: 75},
                    {name: "Genesect", height: 1.5, type: ["steel", "bug"], attack: 120, defense: 95}
                    ];


    function add(item) {
      if (typeof item === 'object' && item === Object.keys(pokemonList)){
      pokemonList.push(item);
     }
    }

    function getAll() {
      return pokemonList.forEach(myLoopFunction);
    }
    return {
      add: add,
      getAll: getAll
    };

  })();

function myLoopFunction(pokemon) {
  if (pokemon.height <1.5) {
    document.write('<p>' + pokemon.name + " (height: " + (pokemon.height) + ")" + '</p>');
  } else if (pokemon.height >1.4) {
    document.write('<p>' + pokemon.name + " (height: " + (pokemon.height) + ") - Wow, that's big!!!" + '</p>');
  }
}


pokemonRepository.getAll();
