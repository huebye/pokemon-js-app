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

    function addListItem(pokemon){
      let repository = document.querySelector(".PokemonList");
      let listItem = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name.toUpperCase();
      listItem.appendChild(button);
      repository.appendChild(listItem);
      button.addEventListener('click', function(event){
        showDetails(pokemon);
      })
    }

    function showDetails(pokemon){
      let modal = document.getElementById("myModal");
      modal.style.display = "block";
      modal.innerText = ("Height: " + pokemon.height +"\n" + "Type: " + pokemon.type);
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }


      console.log(pokemon.name);
    }

    function addModal(){


    }

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
    };

  })();

function myLoopFunction(pokemon) {
  pokemonRepository.addListItem(pokemon);
}


pokemonRepository.getAll();
