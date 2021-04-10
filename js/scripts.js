let pokemonRepository = (function() {
   let pokemonList = [];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=500';



    function add(item) {
      if (typeof item === 'object'){
      pokemonList.push(item);
     }
    }


    function getAll() {
      return pokemonList.forEach(myLoopFunction);
    }

    function addListItem(pokemon){
      let repository = document.querySelector('.PokemonList');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name.toUpperCase();
      button.style.backgroundColor = '#dadada';
      button.classList.add('btn');
      button.classList.add('btn-outline-dark');
      button.setAttribute('data-target','#myModal');
      button.setAttribute('data-toggle','modal');
      listItem.classList.add('group-list-item');
      listItem.appendChild(button);
      repository.appendChild(listItem);
      button.addEventListener('click', function(){
        showLoader();
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
      item.type1 = details.types[0].type.name;
      item.names = details.forms.name;
      item.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Call modal and show details

    function showDetails(pokemon){
      loadDetails(pokemon).then(function () {
        let modalBody = document.querySelector('.modal-body');
        let modalTitle = document.querySelector('.modal-title');
        let modalImg = document.createElement('div');
        let myImage = document.createElement('img');
        let title = document.createElement('h2');
        let content1 = document.createElement('p');
        let content2 = document.createElement('p');
        content2.setAttribute('id', 'heightNumber');
        let content3 = document.createElement('p');
        let content4 = document.createElement('p');
        content4.setAttribute('id', 'weightNumber');
        let content5 = document.createElement('p');
        let content6 = document.createElement('p');
        content6.setAttribute('id', 'typeText');
        title.innerText = pokemon.name.toUpperCase();
        content1.innerText = 'Height:';
        content2.innerText = pokemon.height;
        content3.innerText = 'Weight:';
        content4.innerText = pokemon.weight;
        content5.innerText = 'Type:';
        content6.innerText = pokemon.type1;
        content2.style.paddingRight = '15px';
        content1.style.paddingRight = '6px';
        content4.style.paddingRight = '15px';
        content3.style.paddingRight = '6px';
        content6.style.paddingRight = '15px';
        content5.style.paddingRight = '6px';
        myImage.src = pokemon.imageUrl;
        myImage.classList.add('imgPokemon');
        modalImg.classList.add('imgDiv');
        modalBody.innerText = '';
        modalTitle.innerText = '';
        modalImg.innerText = '';
        modalTitle.appendChild(title);
        modalBody.appendChild(content1);
        modalBody.appendChild(content2);
        modalBody.appendChild(content3);
        modalBody.appendChild(content4);
        modalBody.appendChild(content5);
        modalBody.appendChild(content6);
        modalBody.appendChild(modalImg);
        modalImg.appendChild(myImage);
        removeLoader();
  });
}

    function showLoader() {
      let loader = document.querySelector('#loader');
      loader.style.visibility = 'visible';

    }

    function removeLoader() {
      let loader = document.querySelector('#loader');
      loader.style.visibility = 'hidden';
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
         }
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
      searchNames: searchNames
    };

  })();

function myLoopFunction(pokemon) {
  pokemonRepository.addListItem(pokemon);
}

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll();
});

pokemonRepository.searchNames();
