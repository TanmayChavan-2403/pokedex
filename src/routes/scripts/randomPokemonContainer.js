import { render } from '@testing-library/react';
import React, {Component} from 'react';
import HOC from './HOC.js';

import '../static/randomPokemonContainer.css';

class RandomPokemonContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            result : {},
            ids: [1, 2, 3, 4, 5, 6]
        }
    }

    componentDidMount(){
        this.props.fetchData('random', 'https://pokeapi.co/api/v2/pokemon/');
    }

    static getDerivedStateFromProps(props, state){
        if (props.result[19]){
            return{
                result: props.result
            }
        } else{
            return null
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if (nextProps.result[19]){
            return 1;
        } else {
            return 0;
        }
    }

    render(){
        return(
            <>
                <div id='RPC-baseContainer'>
                    <div id='RPC-header'>
                        <h1><span>Random</span> Choice </h1>
                    </div>
                    <div id='RPC-content'>
                        
                        {Object.entries(this.state.result).map(([id, pokemon]) => {
                            return (
                                <div className='card' key={id}>
                                    <div className='card-image'>
                                        <img className='pokemon-sprite'src={pokemon.pokemonImgURL}></img>    
                                    </div>
                                    <div className='card-details'>
                                        <div id='pokemon-name'>
                                            <h1>Charizard</h1>
                                        </div>
                                        <div id='pokemon-type' className='info-container'>
                                            <p> <span >Type: </span> {pokemon.pokemonType}  </p>
                                        </div>
                                        <div id='pokemon-weight' className='info-container'>
                                            <p> <span >Weight: </span>{pokemon.pokemonWeight}  </p>
                                        </div>
                                        <div id='pokemon-held-items' className='info-container'>
                                            <p> <span >Held-items: </span> {pokemon.pokemonHeldItems}  </p>
                                        </div>
                                        <div id='pokemon-abilities' className='info-container'>
                                            <p> <span>Abilities: </span> {pokemon.pokemonAbilities}  </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>                                                                               
            </>
        )
    }
}



export default HOC(RandomPokemonContainer)
