import React, { PureComponent } from 'react'

import './App.css'


class App extends PureComponent{
    constructor(props){
        super(props)
        this.state ={
            types:['water', 'bug', 'dark','dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying',
             'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel'],

            typeColor: {
                'water': '#d4f1f9', 'bug': '#52db54', 'dark': '#8b7fb5', 'dragon':'#ebc969 ',
                'electric':'#B3CEFF', 'fairy': '#f5a11e', 'fighting': '#FEDE00', 'fire': '#F73718',
                'flying': '#0E86D4', 'ghost': '#964B00', 'grass': '#348C31', 'ground': '#C46200',
                'ice': '#d6fffa', 'normal': '#C89D7C', 'poison': 'tomato', 'psychic': '#B24BF3',
                'rock':'#A47551', 'steel': '#71797E'
            },

        }
        this.fetchInformatiion = this.fetchInformatiion.bind(this);

    }


    componentDidMount(){
        let container = document.getElementById('landingText');
        window.onscroll = () => {
            var top = Math.round(window.scrollY)/3;
            container.style.bottom = `-${top}px`;
        }
    }

    toggleSearchBar(){
        let searchBar = document.getElementById('serachInputField').getElementsByTagName('input')[0];
        let searchButton = document.getElementById('searchSection').getElementsByTagName('button')[0];
        const state = searchBar.getAttribute('data-state');
        if (state === 'close'){
            searchBar.style.width = '90%';
            searchBar.style.padding = '10px';
            searchBar.setAttribute('data-state', 'open');
            searchBar.style.border = '1px solid white';
            
            // Making search button visible again
            searchButton.style.opacity = '1';
            searchButton.style.pointerEvents = 'all';
        } else {
            searchBar.style.width = '0%';
            searchBar.style.padding = '0px';
            searchBar.style.border = 'none';
            searchBar.setAttribute('data-state', 'close');

            // Making search button hidden
            searchButton.style.opacity = '0';
            searchButton.style.pointerEvents = 'none';
        }
    }

    fetchInformatiion(e){
        const pokemon = document.getElementById('serachInputField').getElementsByTagName('input')[0].value;
        if (pokemon === ""){
            alert("Please don't leave field empty");
            return
        }
        console.log(pokemon);
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(resp => {
            if (resp.status === 404){
                return Promise.reject(`Pokemon ${pokemon} not present in database`)
            } else{
                return Promise.resolve(resp.json())
            }
        })
        .then(resp => this.storeDataInVariables(resp))
        .catch(err => alert(err))
    }

    storeDataInVariables(pokemonData){
        let pokemonType , pokemonName, pokemonHeldItems, pokemonAbilities, pokemonWeight, pokemonImgURL;
        pokemonType = pokemonName = pokemonHeldItems = pokemonAbilities = pokemonWeight = pokemonImgURL = " ";

        // Assigning pokemon Image url from fetched data
        if (pokemonData.sprites.other.dream_world.front_default !== null){
            pokemonImgURL = pokemonData.sprites.other.dream_world.front_default;
        } else{
            pokemonImgURL = '/images/pokeBall.png';
        }

        // Assigning pokemon name and wight from fetched data
        pokemonName = pokemonData.name;
        pokemonWeight = pokemonData.weight;

        // Gathering all pokemon types and assigning it to pokemonType variable
        for (let i = 0; i < pokemonData.types.length; i++){
            pokemonType += (`${pokemonData.types[i].type.name},`)
        }

        // Gathering all pokemon abilities and assigning it to pokemonAbilities variable
        for (let i = 0; i < pokemonData.abilities.length; i++){
            pokemonAbilities += (`${pokemonData.abilities[i].ability.name},`);
        }

        // Gathering all pokemon Helditems and assigning it to pokemonHeldItems variable
        for (let i = 0; i < pokemonData.held_items.length; i++){
            pokemonHeldItems += (`${pokemonData.held_items[i].item.name},`);
        }

        // Handling cases when the data was not found in database
        if (pokemonType === ""){
            pokemonType = 'None';
        } 
        if (pokemonAbilities === ""){
            pokemonAbilities = 'None';
        }
        if (pokemonHeldItems === ""){
            pokemonHeldItems = 'None';
        }

        this.formatCard(pokemonType , pokemonName, pokemonHeldItems, pokemonAbilities, pokemonWeight, pokemonImgURL)
    }

    formatCard(pokemonType , pokemonName, pokemonHeldItems, pokemonAbilities, pokemonWeight, pokemonImgURL){
        // setting name of pokemon in pokemonCard container
        document.getElementById('pokemon-name').getElementsByTagName('h1')[0].innerText = pokemonName;

        // setting type of pokemon in pokemonCard container
        document.getElementById('pokemon-type').getElementsByTagName('p')[0].innerText = `Type: ${pokemonType}`;

        // setting weight of pokemon in pokemonCard container
        document.getElementById('pokemon-weight').getElementsByTagName('p')[0].innerText = `Weight: ${pokemonWeight}`;

        // setting Held items of pokemon in pokemonCard container
        document.getElementById('pokemon-held-items').getElementsByTagName('p')[0].innerText = `Held-Items: ${pokemonHeldItems}`;

        // setting abilities of pokemon in pokemonCard container
        document.getElementById('pokemon-abilities').getElementsByTagName('p')[0].innerText = `Abilities: ${pokemonAbilities}`;

        document.getElementById('pokemon-sprite').src = pokemonImgURL;
    }

    render(){
        return(
            
            <div id ='body'>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;700;800&display=swap" rel="stylesheet" />  
                <link href="https://fonts.googleapis.com/css2?family=Irish+Grover&family=Quando&family=Zen+Kaku+Gothic+Antique:wght@300;400;500;700;900&display=swap" rel="stylesheet" /> 

                {/* Landing container contains the landing page image  */}
                <section id='landingContainer'>
                    <img src='./images/landingPage/sky.png'></img>
                    <img src='./images/landingPage/Mountain.png'></img>
                    <div  id= "landingText">
                        <h1> Pokedex <span>for</span></h1>
                        <h2> <span>Pokemon</span> Lovers</h2>
                    </div>
                    <img src='./images/landingPage/grass.png'></img>
                    <img src='./images/landingPage/Mountain 2.png' id='mountain-image'></img>
                </section>

                <section id='pokedexManualContainer'>
                    <div id='pokedexManual'>
                        <div id='manualHeader'>
                            <h1><span>Web</span> Manual</h1>
                        </div>
                        <section id='manualContent'>
                            <div id='pokemonTypesHelp'>
                                <p> There are total 18 type of pokemon, following are the badges used to mention pokemon type in pokedex, so just skim across
                                    this content so that you don't have to come check the manual again and again.
                                </p>
                                {
                                    this.state.types.map(type => {
                                        return (
                                            <div className='block'>
                                                <div className='imageBlock'>
                                                    <img src={`/images/types/${type}.gif`}></img>
                                                </div>
                                                <div className='typeName'>
                                                    <h2 style={{ color:this.state.typeColor[type] }}>{type}</h2>
                                                </div>
                                            </div>
                                        )  
                                    })
                                }
                            </div>
                            <div id='searchbarHelp'>
                                <p> Click on the <img src='/images/pokeBall.png' style={{ width:'30px', transform:'translateY(35%)'}}></img> Icon 
                                    to enable search bar, so that you can search for any pokemon in pokedex
                                </p>
                                <div id='searchbarHelp-container'>
                                    <div id='searchbarHelp-arrow'>
                                        <img src='/images/arrows/left-right.png'></img>
                                    </div>
                                    <div id='searchbarHelp-image'></div>
                                </div>
                            </div>
                            <div id='contactHelp'></div>
                        </section>
                    </div>
                </section>
           
                <section id='pokedex'>
                    <div id = 'pokedexContainer'>
                        <div id='searchSection'>
                            <div id='search'>
                                <div id='searchButton' onClick={this.toggleSearchBar}>
                                    <img src='/images/pokeBall.png'></img>
                                </div>
                                <div id='serachInputField' data-state = 'close'>
                                    <input type='text' name='pokemonName'></input>
                                </div>
                                <button type='text' onClick={this.fetchInformatiion}> Search </button>
                            </div>
                            
                        </div>
                        <div id='pokemonDetailCard'>

                        </div>
                        
                        <div id='pokemonCard'>
                            <div id='card'>
                                <div id = 'card-image'>
                                    <img id='pokemon-sprite'src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg'></img>    
                                </div> 
                                <div id = 'card-details'>
                                    <div id='pokemon-name'>
                                        <h1>Charizard</h1>
                                    </div>
                                    <div id='pokemon-type' className='info-container'>
                                        <p> Type: Fire  </p>
                                    </div>
                                    <div id='pokemon-weight' className='info-container'>
                                        <p> Weight: 905  </p>
                                    </div>
                                    <div id='pokemon-held-items' className='info-container'>
                                        <p> Held-Items: none  </p>
                                    </div>
                                    <div id='pokemon-abilities' className='info-container'>
                                        <p> Abilities: Blaze, Solar-power  </p>
                                    </div>
                                </div> 
                                <div id='more-info'>
                                    <p> For more information click here</p>
                                    <div id='more-info-image'>
                                        <img src='/images/arrows/forward.png'></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div id='status-page'>
                            <div id ='status-gif'>
                                <img src='/images/nothingYet.gif'></img>
                            </div>
                            <div id ='status-message'>
                                <h1> You haven't searched anything yet </h1>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }

}

export default App