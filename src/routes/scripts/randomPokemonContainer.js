import { render } from '@testing-library/react';
import React, {Component} from 'react';
import HOC from './HOC.js';

import '../static/randomPokemonContainer.css';

class RandomPokemonContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            result : {},
        }
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    // this is last function which is invoked in 'Mounting' React lifecycle and it just calls the 'fetchData' function
    // which in fact is 'fetchInformation' fucntion to fetch the data.
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

    // As the 'storedDataInVariable' function (In HOC.js line 111) updates the state for each data fetched, and we are having
    // 20 links to fetch, SO instead of reRendering this(randomPokemonContainer.s) component again and again for each 20 link
    // we just check that if the passed props is having data of id[19] which is the last data, if it is then only render
    // this(randomPokemonContainer.js) component else rendering is not needed so we return 0[false];
    shouldComponentUpdate(nextProps, nextState){
        if (nextProps.result[19]){
            return 1;
        } else {
            return 0;
        }
    }

    // this function is tied to the 'randomContainer' 'section' which displays the random pokemon.
    // as soon as the refresh button is clicked this function is invoked cheking are we having any nextPage link
    // If we do have nextPage link then it will be passed to 'fetchInformation' function(In HOC.js line 52) which will do
    // the rest of the work.
    // and if we are not having any link then we don't do anything.
    handleRefresh(){
        if (this.props.nextPage){
            this.props.fetchData('random', `${this.props.nextPage}`);
        }
    }

    render(){
        const {fetchData, result , checkKeyPress,  bgColors ,nextPage } = this.props
        return(
            <>
                <div id='RPC-baseContainer'>
                    <div id='RPC-header'>
                        <h1><span>Random</span> Choice </h1>
                        <div id='refresh-btn-container' onClick={this.handleRefresh}>
                            <img src='/images/refresh.png'></img>
                        </div>
                    </div>
                    <div id='RPC-content'>
                        
                        {Object.entries(this.state.result).map(([id, pokemon]) => {
                            let bgColor = this.props.bgColors[Math.floor(Math.random()*9)]
                            return (
                                <div className='card' key={id}>
                                    <div className='card-image' style={{backgroundColor: bgColor}}>
                                        <img className='pokemon-sprite'src={pokemon.pokemonImgURL}></img>    
                                    </div>
                                    <div className='card-details'>
                                        <div id='pokemon-name'>
                                            <h1>{pokemon.pokemonName}</h1>
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
