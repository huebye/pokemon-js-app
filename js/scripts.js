let pokemonRepository = (function() {
   let pokemonList = [];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';



    function add(item) {
      if (typeof item === 'object'){
      pokemonList.push(item);
     }
    }

    function edit(){
      let btn = document.forms['searchNames'].querySelector('a');
      btn.addEventListener('click', function(event){
         editForm();
      });

    }

    function editForm(){
      let modalAdd = document.getElementById("addModal");
      let inputName = document.getElementById('addName');
      let btnAdd = document.getElementById('addPokemon-button');
      let list = document.getElementById('ul-search');
      modalAdd.style.display = "block";
      let addPokemonName = function() {
        let text = inputName.value;
        let liBtn = document.createElement('button');
        liBtn.innerText = text.toUpperCase();
        list.appendChild(liBtn);
      };
      btnAdd.onclick = addPokemonName;
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape'){
          modalAdd.style.display = "none";
        }
      });



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
      });
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

    // Load details from API

    function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = details.types;
      item.names = details.forms.name;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Call modal and show details

    function showDetails(pokemon){
      loadDetails(pokemon).then(function () {
        let modal = document.getElementById("myModal");
        let closeModalButton = document.createElement("button");
        let myImage = document.createElement("img");
        let title = document.createElement("h2");
        let content = document.createElement("p");
        title.innerText = pokemon.name.toUpperCase();
        content.innerText = ("Height: " + pokemon.height);
        myImage.src = pokemon.imageUrl;
        myImage.classList.add("pokemon-img");
        closeModalButton.classList.add("modal-close");
        closeModalButton.innerText = "X";
        modal.style.display = "block";
        modal.innerText = '';
        modal.appendChild(title);
        modal.appendChild(content);
        modal.appendChild(closeModalButton);
        modal.appendChild(myImage);
        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape'){
            modal.style.display = "none";
          }
        });
        window.onclick = function(event) {
          if (event.target != modal) {
            modal.style.display = "none";
          }
        };
  });
}

    // Filter Pokemons by Name

    function searchNames(){
    let ul = document.querySelector('#ul-search');
    let searchBar = document.forms['searchNames'].querySelector('input');
      searchBar.addEventListener('keyup', function(e){
       let term = e.target.value.toLowerCase();
       let pokemons = ul.getElementsByTagName('li');
       Array.from(pokemons).forEach(function(pokemon){
         let title = pokemon.firstElementChild.textContent;
         if(title.toLowerCase().indexOf(term) != -1){
           pokemon.style.display = 'inline-flex';
         } else {
           pokemon.style.display = 'none';
         };
       });
      });
    }


    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
      searchNames: searchNames,
      edit: edit,
      editForm: editForm
    };

  })();

function myLoopFunction(pokemon) {
  pokemonRepository.addListItem(pokemon);
}

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll();
});

pokemonRepository.searchNames();
pokemonRepository.edit();
