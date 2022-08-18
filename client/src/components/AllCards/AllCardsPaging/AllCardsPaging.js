import React from "react";

export default function AllCardsPaging ({lodgingPerPage, stateLodgings, paging}){
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(stateLodgings/lodgingPerPage); i++){
        //Math.ceil redondea todos mis lodgings sobre el Q de lodgings que quiero por página
        pageNumbers.push(i+1)
    }

    return(
        <nav>
            <ul>
                {pageNumbers.map((number) => {
                    return(
                    <li key={number}>
                    <button onClick = { ()=> paging(number) } > {number} </button>
                    </li>
                    )})
                }
            </ul>
        </nav>
    )
}