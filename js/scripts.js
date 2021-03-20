let PokemonList = [{name: "Charizard", height: 1.7, type: ["fire", "flying"], attack: 84, defense: 78},
                  {name: "Pikachu", height: 0.4, type: ["electric", "fairy"], attack: 55, defense: 40},
                  {name: "Ninetales", height: 1.1, type: ["fire", "field"], attack: 76, defense: 75},
                  {name: "Wobbuffet", height: 1.3, type: ["psychic", "telepathy"], attack: 33, defense: 58},
                  {name: "Blastoise", height: 1.6, type: ["water", "monster"], attack: 83, defense: 100},
                  {name: "Clefable", height: 1.3, type: ["fairy", "poison"], attack: 70, defense: 73},
                  {name: "Nidoking", height: 1.4, type: ["ground", "poison"], attack: 102, defense: 77},
                  {name: "Ursaring", height: 1.8, type: ["normal", "field"], attack: 130, defense: 75},
                  {name: "Genesect", height: 1.5, type: ["steel", "bug"], attack: 120, defense: 95}];

for (let i=0; i < PokemonList.length; i++){
  if (PokemonList[i].height <1.5) {
    document.write(PokemonList[i].name + " (height: " + (PokemonList[i].height) + ") <br>");
  } else if (PokemonList[i].height >1.4) {
    document.write(PokemonList[i].name + " (height: " + (PokemonList[i].height) + ") - Wow, that's big!!!<br>");
  }
}
