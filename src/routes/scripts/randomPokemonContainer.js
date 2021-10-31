import { render } from '@testing-library/react';
import React, {Component} from 'react';

import '../static/randomPokemonContainer.css';

class RandomPokemonContainer extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        fetch('https://pokeapi.co/api/v2/pokemon/')
        .then(resp => {
            if (resp.status === 404){
                return Promise.reject(`Failed to load Randome Pokemon data`)
            } else {
                return Promise.resolve(resp.json())
            }
        })
        .then(resp => console.log(resp))
        .catch(err => alert(err))
    }

    render(){
        return(
            <>
                <div id='RPC-baseContainer'>
                    <div id='RPC-header'>
                        <h1><span>Random</span> Choice </h1>
                    </div>
                    <div id='RPC-content'>
                        <div className='card'>
                            <div className='card-image'></div>
                            <dic className='card-details'></dic>
                        </div>
                    </div>
                </div>                                                                                
            </>
        )
    }
}



export default RandomPokemonContainer
