import React from "react";

export default function Paginado({pokemonsPerPage, allPokemons, paginado}) { // declaro mi paginado y me traigo las propiedades del otro componente 
    const pageNumbers = []

    for(let i = 0; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) { //Math.ceil me redondea para arriba
          pageNumbers.push(i + 1) // aca pusheo el resultado de esta division y lo carga al arreglo vacio de pageNumbers
    }   // ej:si tengo 40 pokemones/12poke por pag = 3,33 ---> 4 paginas redondea para arriba el math.ceil
        //pusheo i + 1 porque sino el boton de pagina me arranca en 0 y no en 1.
        
        return ( //aca renderizo y digo:
            <nav>
                <ul className = 'paginado'> 
                    { pageNumbers && pageNumbers.map(number =>( //si tengo este arreglo , 
        //mapeamelo y devolveme por ese arreglo, cada uno de los numeros que te devuelva el paginado.
                       <li className='number' key={number}> 
                        <a onClick={() => paginado(number)}> {number} </a>
                       </li>
                    ))}
                </ul> 
            </nav>
        )
} // la key={number} es para que no me salgan warnings cuando guardo