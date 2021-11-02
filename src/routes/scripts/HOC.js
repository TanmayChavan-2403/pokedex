import React, {PureComponent} from "react";

const HOC = OriginalComponent => {
    class NewComponent extends PureComponent{
        constructor(props){
            super(props)

            this.state ={
                bgColors: ['lightseagreen', 'lightskyblue', 'lightsalmon', 'lightgreen', 'lightpink','lightblue',
                    'lightcoral','tomato', 'thistle'],
                result : {}
            }
            this.fetchInformatiion = this.fetchInformatiion.bind(this);
            this.checkKeyPress = this.checkKeyPress.bind(this);
        }

                        

        checkKeyPress(e, type){
            if (e.key === 'Enter'){
                this.fetchInformatiion(type);
            }
        }
        fetchInformatiion(type, URL=undefined, id=null, callbackFunc){
            const pokemon = document.getElementById('serachInputField').getElementsByTagName('input')[0].value;
            
            if (type === 'specific' && pokemon === ""){
                alert("Please don't leave field empty");
                return
            }
            if (URL === undefined){
                URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
            }
            var result;
            fetch(URL)
            .then(resp => {
                if (resp.status === 404){
                    return Promise.reject(`Pokemon ${pokemon} not present in database`)
                } else{
                    return Promise.resolve(resp.json())
                }
            })
            .then(resp => {
                // If type is specific that means we are only search for one pokemon so we will be executing the fuction to store all the data
                if (type === 'specific'){
                    this.storeDataInVariables(resp)
                } else if (type === 'random' && id === null){  
                    this.fetchInfoForAllLinks(resp);
                } else {
                    callbackFunc(resp);
                }
            })
            .catch(err => alert(err))
            return result;
        }

        async fetchInfoForAllLinks(resp){
            for (let i = 0; i < 20; i++){
                // Callback function to take the response and append into fetched data, which we will be passing to 
                // storeDataInVariables function for data munging
                this.fetchInformatiion('random', resp.results[i].url, i, resp => {
                    this.storeDataInVariables(resp, 'random', i);
                })
                
            }
        }

        storeDataInVariables(pokemonData, from=undefined, id=null){
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
            if (pokemonHeldItems === " "){
                pokemonHeldItems = 'None';
            }
            if (from === 'random'){
                this.setState({
                    result:{
                        ...this.state.result,
                        [id]: {pokemonType , pokemonName, pokemonHeldItems, pokemonAbilities, pokemonWeight, pokemonImgURL}
                    }
                })

            } else {
                this.formatCard(pokemonType , pokemonName, pokemonHeldItems, pokemonAbilities, pokemonWeight, pokemonImgURL)
            }
        }
    
        formatCard(pokemonType , pokemonName, pokemonHeldItems, pokemonAbilities, pokemonWeight, pokemonImgURL){
            // setting name of pokemon in pokemonCard container
            document.getElementById('pokemon-name').getElementsByTagName('h1')[0].innerText = pokemonName;
    
            // setting type of pokemon in pokemonCard container
            document.getElementById('pokemon-type').getElementsByTagName('p')[0].innerHTML = `<span>Type: </span> ${pokemonType}`;
    
            // setting weight of pokemon in pokemonCard container
            document.getElementById('pokemon-weight').getElementsByTagName('p')[0].innerHTML = `<span>Weight: </span> ${pokemonWeight}`;
    
            // setting Held items of pokemon in pokemonCard container
            document.getElementById('pokemon-held-items').getElementsByTagName('p')[0].innerHTML = `<span>Held-items: </span> ${pokemonHeldItems}`;
    
            // setting abilities of pokemon in pokemonCard container
            document.getElementById('pokemon-abilities').getElementsByTagName('p')[0].innerHTML = `<span>Abilities: </span> ${pokemonAbilities}`;
    
            // Setting image url of pokemon to image container
            document.getElementById('pokemon-sprite').src = pokemonImgURL;
    
            // applying random color to image background
            let color = this.state.bgColors[Math.floor(Math.random()*9)]
            document.getElementById('card-image').style.backgroundColor = color;
        }    



        render(){
            return <OriginalComponent fetchData = {this.fetchInformatiion}
                                      result = {this.state.result} 
                                      checkKeyPress = {this.checkKeyPress}
            />
        }
    }
    return NewComponent
}

export default HOC