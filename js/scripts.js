let pokemonRepository = (function() {
   let pokemonList = [];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    function add(item) {
      if (typeof item === 'object'){
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

    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

    function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.names = details.forms.name;
    }).catch(function (e) {
      console.error(e);
    });
  }


    function showDetails(pokemon){
      loadDetails(pokemon).then(function () {
        let modal = document.getElementById("myModal");
        modal.style.display = "block";
        modal.innerText = (pokemon.name +"\n" + "Height: " + pokemon.height);
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
    console.log(pokemon);
  });
      console.log(pokemon.name);
    }




    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };

  })();

function myLoopFunction(pokemon) {
  pokemonRepository.addListItem(pokemon);
}

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll();
});
