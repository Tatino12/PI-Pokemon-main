import React from "react";

 //la card renderiza lo que yo necesito
export default function pokeCard({ name, sprite, types}) {
    return ( 
        <div>
            <h3>{name}</h3>
            <h5>{types}</h5>
            <img src={sprite} alt="img not found" width="200px" height="230px" />

        </div>
    );
}