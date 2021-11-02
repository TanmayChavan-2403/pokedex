import { render } from '@testing-library/react';
import React, {Component} from 'react';
import HOC from './HOC.js';

import '../static/randomPokemonContainer.css';

class RandomPokemonContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            result : {},
            cardElements: []
        }
    }

    componentDidMount(){
        this.props.fetchData('random', undefined);
    }

    static getDerivedStateFromProps(props, state){
        if (props.result[19]){
            let gridElements = []
            for (var i = 0; i < 20; i ++){
                gridElements.push(
                    <div className='card'>
                        <div className='card-image'>
                        <img id='pokemon-sprite'src={props.result[i].pokemonImgURL}></img>
                        </div>
                        <div className='card-details'>
                        <div id='pokemon-name'>
                                    <h1>{props.result[i].pokemonName}</h1>
                                </div>
                                <div className='info-container'>
                                    <p> <span >Type: </span> {props.result[i].pokemonType}  </p>
                                </div>
                                <div className='info-container'>
                                    <p> <span >Weight: </span>{props.result[i].pokemonWeight}  </p>
                                </div>
                                <div className='info-container'>
                                    <p> <span >Held-items: </span> {props.result[i].pokemonHeldItems}  </p>
                                </div>
                                <div className='info-container'>
                                    <p> <span>Abilities: </span> {props.result[i].pokemonAbilities}  </p>
                                </div>
                        </div>
                    </div>
                )
            }
            return{
                cardElements: gridElements,
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
            return 0
        }
    }

    componentDidUpdate(){
        console.log(this.props.result);
    }

    render(){
        return(
            <>
                <div id='RPC-baseContainer'>
                    <div id='RPC-header'>
                        <h1><span>Random</span> Choice </h1>
                    </div>
                    <div id='RPC-content'>
                         {/* <div className='card'>
                             <div className='card-image'></div>
                             <div className='card-details'></div>
                         </div> */}
                         {this.state.cardElements}
                    </div>
                </div>                                                                               
            </>
        )
    }
}



export default HOC(RandomPokemonContainer)
