import React, {Component} from "react";

const HOC = OriginalComponent => {
    class NewComponent extends Component{
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

        checkKeyPress(e){
            if (e.key == 'Enter'){
                this.fetchInformatiion();
            }
        }
        // type value will be undefined if we are searching for specific details and hitting enter
        // else type value will be "specific" in case we will be assigining undefined as value to type as we are cheking 
        // for "undefined" in second "then" promise chain
        fetchInformatiion(type){
            if (type === 'specific'){
                type = undefined;
            }
            const pokemon = document.getElementById('serachInputField').getElementsByTagName('input')[0].value;
            if (pokemon === ""){
                alert("Please don't leave field empty");
                return
            }
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(resp => {
                if (resp.status === 404){
                    return Promise.reject(`Pokemon ${pokemon} not present in database`)
                } else{
                    return Promise.resolve(resp.json())
                }
            })
            .then(resp => {
                // If it is undefined then we are searching for specific anime and we will be rendering this function
                if (type === undefined){
                    this.storeDataInVariables(resp)
                } else{  // Else we will be storing the data because this function is ran by RPC component and its asking for multiple pokemon data
                    this.setState({
                        result : resp
                    });
                }
            })
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
            if (pokemonHeldItems === " "){
                pokemonHeldItems = 'None';
            }
    
            this.formatCard(pokemonType , pokemonName, pokemonHeldItems, pokemonAbilities, pokemonWeight, pokemonImgURL)
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