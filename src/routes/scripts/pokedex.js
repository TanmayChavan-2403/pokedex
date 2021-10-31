import React, {Component} from "react";

import '../static/pokedex.css'
import HOC from './HOC.js'

class Pokedex extends Component{
    constructor(props){
        super(props)

        this.state = {
            bgColors: ['lightseagreen', 'lightskyblue', 'lightsalmon', 'lightgreen', 'lightpink','lightblue',
                    'lightcoral','tomato', 'thistle'],
            res : {}
        }

        // this.fetchInformatiion = this.fetchInformatiion.bind(this);
        // this.checkKeyPress = this.checkKeyPress.bind(this);
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

    render(){
        const {fetchData, result, checkKeyPress} = this.props
        return(
            <>
                 <div id = 'pokedexContainer'>
                        <div id='searchSection'>
                            <div id='search'>
                                <div id='searchButton' onClick={this.toggleSearchBar}>
                                    <img src='/images/pokeBall.png'></img>
                                </div>
                                <div id='serachInputField' data-state = 'close'>
                                    <input type='text' name='pokemonName' onKeyDown={checkKeyPress}></input>
                                </div>
                                <button type='text' onClick={() => fetchData('specific')}> Search </button>
                            </div>
                            
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
                                        <p> <span >Type: </span> Fire  </p>
                                    </div>
                                    <div id='pokemon-weight' className='info-container'>
                                        <p> <span >Weight: </span>905  </p>
                                    </div>
                                    <div id='pokemon-held-items' className='info-container'>
                                        <p> <span >Held-items: </span> none  </p>
                                    </div>
                                    <div id='pokemon-abilities' className='info-container'>
                                        <p> <span>Abilities: </span> Blaze, Solar-power  </p>
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
            </>
        )
    }

}


export default HOC(Pokedex)