import React, {PureComponent} from "react";

import '../static/footer.css'


class Footer extends PureComponent{
    constructor(props){
        super(props)
    }


    footerLinkHandler(idx){
        let links = document.querySelectorAll('link');
        Array.from(links).forEach(link => {
            link.style.color = 'white';
        })
    }


    render(){
        return(
            <>
                <link href="https://fonts.googleapis.com/css2?family=Irish+Grover&family=Nunito:ital,wght@1,200&family=Quando&family=Zen+Kaku+Gothic+Antique:wght@300;400;500;700;900&display=swap" rel="stylesheet" /> 


                <div id='footerImage'>
                    <img src='/images/pokedex.png'></img>
                </div>
                <div id='footerContent'>
                    <div id='left-container'>
                        <div id='quote'>
                            <h2> A Little help for Pokemon lovers, from Pokemon lover </h2>
                        </div>
                        <div id='footer-links'>
                            <div className='link'>
                                <img src='/images/pokeBall.png'></img>
                                <a onClick={() => this.footerLinkHandler('0')} href='https://portfolio-59977.web.app/' target='_blank'><h4>AboutME</h4></a>
                            </div>
                            <div className='link'>
                                <img src='/images/pokeBall.png'></img>
                                <a href='mailto:tanmaychavan1306@gmail.com' onClick={() => this.footerLinkHandler('1')}><h4>Contact Me</h4></a>
                            </div>
                            <div className='link'>
                                <img src='/images/pokeBall.png'></img>
                                <a onClick={() => this.footerLinkHandler('2')} href='mailto:tanmayimplinks1306@gmail.com' target='_blank'><h4> For Suggestions/Request click here </h4></a>
                            </div>
                            <div className='link'>
                                <img src='/images/pokeBall.png'></img>
                                <a onClick={() => this.footerLinkHandler('3')} href='https://github.com/TanmayChavan-2403/pokedex' target='_blank'> <h4> Source Code</h4> </a>
                            </div>
                            <div className='link'>
                                <img src='/images/pokeBall.png'></img>
                                <a onClick={() => this.footerLinkHandler('4')} href='https://pokeapi.co/docs/v2' target='_blank' ><h4> PokeAPI</h4> </a>
                            </div>
                        </div>
                    </div>
                    <div id='right-container'>
                        <p><q><i>
                            A wildfire destroys everything in its path. It will be the same with your powers unless you 
                            learn to control them 
                        </i></q></p> 
                        — Giovanni
                    </div>
                </div>
            </>
        )
    }

}


export default Footer