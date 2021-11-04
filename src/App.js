import React, { PureComponent } from 'react'

import './App.css';

import PokemonManualContainer from './routes/scripts/pokemonManualContainer';
import Pokedex from './routes/scripts/pokedex';
import LandingContainer from './routes/scripts/landingContainer';
import RandomPokemonContainer from './routes/scripts/randomPokemonContainer';
import Footer from './routes/scripts/footer';

class App extends PureComponent{
    constructor(props){
        super(props)
        this.state ={
            types:['water', 'bug', 'dark','dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying',
             'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel'],

            typeColor: {
                'water': '#d4f1f9', 'bug': '#52db54', 'dark': '#8b7fb5', 'dragon':'#ebc969 ',
                'electric':'#B3CEFF', 'fairy': '#f5a11e', 'fighting': '#FEDE00', 'fire': '#F73718',
                'flying': '#0E86D4', 'ghost': '#964B00', 'grass': '#348C31', 'ground': '#C46200',
                'ice': '#d6fffa', 'normal': '#C89D7C', 'poison': 'tomato', 'psychic': '#B24BF3',
                'rock':'#A47551', 'steel': '#71797E'
            }
        }
    }

    componentDidMount(){
        let container = document.getElementById('landingText');
        window.onscroll = () => {
            var top = Math.round(window.scrollY)/3;
            container.style.bottom = `-${top}px`;
        }
    }


    render(){
        return(
            
            <div id ='body'>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;700;800&display=swap" rel="stylesheet" />  
                <link href="https://fonts.googleapis.com/css2?family=Irish+Grover&family=Quando&family=Zen+Kaku+Gothic+Antique:wght@300;400;500;700;900&display=swap" rel="stylesheet" /> 

                {/* Landing container contains the landing page image  */}
                <section id='landingContainer'>
                    <LandingContainer />
                </section>
                
                <section id='pokedexManualContainer'>
                    <PokemonManualContainer types={this.state.types} typeColor={this.state.typeColor} />
                </section>

                <section id='pokedex'>
                   <Pokedex />
                </section>


                <section id='randomPokemonContainer'>
                    <RandomPokemonContainer />
                </section>

                <section id='footerContainer'>
                    <Footer />
                </section>


            </div>
        )
    }

}

export default App