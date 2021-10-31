import { render } from "@testing-library/react";
import React, {Component} from "react";

import '../static/landingContainer.css'

class LandingContainer extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <>
                <img src='./images/landingPage/sky.png'></img>
                <img src='./images/landingPage/Mountain.png'></img>
                <div  id= "landingText">
                    <h1> Pokedex <span>for</span></h1>
                    <h2> <span>Pokemon</span> Lovers</h2>
                </div>
                <img src='./images/landingPage/grass.png'></img>
                <img src='./images/landingPage/Mountain 2.png' id='mountain-image'></img>
            </>
        )
    }
}

export default LandingContainer