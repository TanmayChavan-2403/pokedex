import React, {Component} from 'react'

import '../static/pokemonManualContainer.css'


class PokemonManualContainer extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <>
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
                                this.props.types.map(type => {
                                    return (
                                        <div className='block' key={type}>
                                            <div className='imageBlock'>
                                                <img src={`/images/types/${type}.gif`}></img>
                                            </div>
                                            <div className='typeName'>
                                                <h2 style={{ color:this.props.typeColor[type] }}>{type}</h2>
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
                                <div id='searchbarHelp-image'>
                                    <img src='/images/searchButtonHelp.png'></img>
                                </div>
                            </div>
                        </div>


                        <div id='contactHelp'></div>

                    </section>
                </div>
            </>
        )
    }

}


export default PokemonManualContainer