import React from "react";
import styles from "../AllCardsPaging/AllCardsPaging.module.css"

export default function AllComplaintsPaging ({lodgingPerPage, stateLodgings, paging}){
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(stateLodgings/lodgingPerPage); i++){
        //Math.ceil redondea todos mis lodgings sobre el Q de lodgings que quiero por página
        pageNumbers.push(i+1)
    }

    return(
        
           <div>
                {pageNumbers.map((number) => {
                    return(
                    <button key = {number}
                   className={styles.pag} onClick = { ()=> paging(number) } > {number} </button>
                    )})
                }
            </div>
        
    )
}