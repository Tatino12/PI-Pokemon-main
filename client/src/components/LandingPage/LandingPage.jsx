import React from "react";
import { Link } from 'react-router-dom';
import './LandingPage.css'


export default function LandingPage(){
    return (
        <div className="img_fondo">
        <div className="lp_container">
            <h1 className="lp_title1"> WELCOME TO POKEMON </h1>          
       
           {/*  <Link className="img2"><img src="https://giffiles.alphacoders.com/257/257.gif"/>   */}
           {/*  <Link className="img1"><img src="https://giffiles.alphacoders.com/152/15274.gif" height="200px"/>  */} 
         {/*    <Link className="img3"><img src="https://giffiles.alphacoders.com/263/2637.gif" height="250px" width= "400"px/> */}
            
            <Link to='/home'>
            <button className="lp_button" >Ingresar</button>
            </Link>
            {/* </Link> */}
           {/*  </Link>
            </Link> */}
            
            
        </div>
        </div>
    )
}

// "https://www.apple-tribe.com/wp-content/uploads/2016/07/pokemon-go-evolucionar-1.jpg"

//"https://giffiles.alphacoders.com/264/2648.gif"

//"https://avatarfiles.alphacoders.com/306/thumb-306469.png"