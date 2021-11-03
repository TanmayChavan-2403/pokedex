import React, {PureComponent} from "react";

const HOC = OriginalComponent => {
    class NewComponent extends PureComponent{
        constructor(props){
            super(props)

            this.state ={
                bgColors: ['lightseagreen', 'lightskyblue', 'lightsalmon', 'lightgreen', 'lightpink','lightblue',
                    'lightcoral','tomato', 'thistle'],
                result : {},
                nextPage: undefined
            }
            this.fetchInformatiion = this.fetchInformatiion.bind(this);
            this.checkKeyPress = this.checkKeyPress.bind(this);
        }

                        
        // It checks that did we hit enter after typing pokemon name in search field, if it was Enter then we will 
        // take the data entered in the search field and will pass it to fetchInformation method to process that data
        checkKeyPress(e, type){
            if (e.key === 'Enter'){
                this.fetchInformatiion(type);
            }
        }

        // This method fetches data for both, specific and random pokemon and uses 'type' variable to validate for which 
        // search we want to proceed with.
        
        // URL variable is used for random type becuase we are having our own URL with random animes and is passed by Container
        // displaying random pokemons

        // Callback function is used to effectively collect the fetched data in 'fetchInfoForAllLinks' function as javascript is
        // asynchronous, callback functions aid with turing it into synchronous functions

        // LOGIC: this funciton takes 4 parameters are you can see it below, and also explained above. It checks if the 'type'
        // is 'specific' or 'random', if it is specific then we have to fetch data for only one pokemon and for that we need
        // pokemon name, so it also checks that if user have entered anything in search field, if not then it throws alert that
        // please don't leave field empty else if user did have entered anything then it goes for futher validation. Now it 
        // checks that if the 'URL' parameter is undefined, and undefined means we are looking for specific anime and now as we
        // have validated that the search field was not empty we will merge that pokemon name with our baseURL and will fetch
        // the data after fetching it checks were the API call successfull by checking the status code and acts accordingly.
        // IN second 'then' chain if validates that for what type we have fetched data, if it was for 'specific' type then
        // it is then passed to 'storeDataInVariables' function, ELSE IF it checks if type is equal to random and id == null. Now 
        // the idea behind this condition is, as we are using 'fetchInformation' function again and again for 'random' type
        // this id helps us to check that if the data fetched is a collection of pokemons or is data of one pokemon from that
        // collection. If id is null means, the data fetched is collection of pokemons and then we will fetchAllLinks inside it 
        // with the help of 'fetchInfoForAllLinks' function whose working is explaine above that function. 
        // now ELSE block is executed means that our Id is not null, which means that this data which we have fetched is a data
        // of pokemon from that collection of pokemon data and we will be pass this data to callBackFunc so that it can be 
        // processed further.
        fetchInformatiion(type, URL=undefined, id=null, callbackFunc){
            let pokemon = document.getElementById('serachInputField').getElementsByTagName('input')[0].value;
            pokemon = pokemon.toLowerCase();

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

        // This function is trigger in'fetchInformation' function on line 77, when we have data which is collection of 
        // pokemon and now we have to extract data for all the pokemons inside this collection. It aslo stores the nextPage
        // link so that it can be used for refresh function in RPC container.
        fetchInfoForAllLinks(resp){
            // this for loop, loops over all the 20 links and fetches the data for all the pokemon using above 
            // 'fetchInformation' function and then sends the fetchedData to 'storeDataInVariable' function for data munging.
            for (let i = 0; i < 20; i++){
                // Setting nextpage link to the state 'nextPage' so that it can be passed on to RPC component
                this.setState({
                    nextPage: resp.next
                })

                // Callback function to take the response and append into fetched data, which we will be passing to 
                // storeDataInVariables function for data munging
                this.fetchInformatiion('random', resp.results[i].url, i, resp => {
                    this.storeDataInVariables(resp, 'random', i);
                })
                
            }
        }

        // this function is called when we have fetched the data and now we have to extract few information out of it, 
        // and store in variable, futher which checks that if the type is random then we have to store this in this.state
        // with the id, ELSE if it 'type' is 'specific' then the 'formatCard' function is triggered which basically takes 
        // the data and adds it to the card "div" on HTML.
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
                                      bgColors = {this.state.bgColors}
                                      nextPage = {this.state.nextPage}
            />
        }
    }
    return NewComponent
}

export default HOC