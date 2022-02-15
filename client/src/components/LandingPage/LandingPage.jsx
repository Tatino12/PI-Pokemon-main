import React from "react";
import { Link } from 'react-router-dom';
import './LandingPage.css'


export default function LandingPage(){
    return (
        <div className="lp_img_fondo">
        <div className="lp_container">
            <h1 className="lp_title1"> WELCOME TO POKEMON </h1>          
        
            <Link to='/home'>
            <button className="lp_button" >Ingresar</button>
            </Link>
                            
        </div>
        </div>
    )
}
