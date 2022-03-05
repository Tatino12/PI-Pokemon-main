import React from "react";
import './Card.css'


 
export default function pokeCard({ name, sprite, types}) {
    
    return ( 
        <div>
            <div className="c_card">
                 <h3>{name}</h3>

         <div className="c_sprite">   
         <div>
                 <img src={sprite}  />
            </div>
            </div>
        <div className="c_types">
                 {types.map((el) => 
                 <h5>{el}</h5>)}
            </div>  
            </div>
            </div>
    );
}