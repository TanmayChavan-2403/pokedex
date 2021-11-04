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
                            <p> There are total 18 type of pokemon, following are all the types along with there badges to help you
                                understand quickly.
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
                            <div id='Help-container'>
                                <div id='Help-arrow'>
                                    <img src='/images/arrows/left-right.png'></img>
                                </div>
                                <div id='Help-image'>
                                    <img src='/images/searchButtonHelp.png'></img>
                                </div>
                            </div>
                        </div>
                        
                        <div id='randomContainerHelp'>
                            <p> Click on <img src='/images/refreshIconHelp.png' style={{ width:'40px', transform:'translateY(35%)'}}></img>
                                icon located on the top right cornor of the container to refresh the pokemon cards with new one
                            </p>
                             <div id='Help-container'>
                                <div id='Help-image'>
                                    <img src='/images/refreshHelpImg.png'></img>
                                </div>
                                <div id='Help-arrow'>
                                    <img src='/images/arrows/left-right.png' style={{transform: 'rotateZ(-47deg) rotateY(180deg)'}}></img>
                                </div>
                            </div>
                        </div>

                        <div id='contactHelp'>
                        <div id='randomContainerHelp'>
                            <p> Click on <span style={{color: 'lightskyblue', fontWeight: 'bolder'}}> For Suggestions/Request click here </span>
                                link if you are having any queries related to website, also you can check the source code and API link
                                which I have used to fetch data.
                            </p>
                             <div id='Help-container'>
                                <div id='Help-arrow'>
                                    <img src='/images/arrows/left-right.png'></img>
                                </div>
                                <div id='Help-image'>
                                    <img src='/images/contactHelp.png'></img>
                                </div>
                            </div>
                        </div>
                        </div>

                    </section>
                </div>
            </>
        )
    }

}


export default PokemonManualContainer