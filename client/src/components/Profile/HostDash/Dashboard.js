import React from "react";
import axios from "axios";
import {useState,useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import{useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import style from "./dashboard.module.css"

export default function Dashboard({emailGuest}) {

const guest = emailGuest
console.log(guest)

//BUSCANDO EL HOST CON EL GUEST ID Y SUS LODGINGS
const [host, setHost] = useState("")
const [lodg, setLodg] = useState("")
// const [lodgingDets, setLodgingDets] = useState([])

useEffect(() => {
const getHostInfo = async () => {
    try {

        const res = await axios.get(`/api/guest/found/host/${guest}`)
        let hostId = res.data
        setHost(hostId)
        try{
        const response = await axios.get("/api/lodging/"+ hostId)
        let lodgingsGot = response.data
        let lodgingsVisibles= await lodgingsGot.filter((e)=> (e).Visibility===true)
        setLodg(lodgingsVisibles)
        }catch(err){console.log(err)}
       }catch(err){
        console.log(err)
        }
    }
   getHostInfo();
}, [host]);

console.log(host)
console.log(lodg)

const handleClick = ({_id}) => {
    const getLod = async () => {
    try{
        let data = await axios.patch("/api/lodging/detail/" + _id)
        }catch(err){
        console.log(err)
        }
    }
    getLod();
}

   return (
    <div>
    <div className={style.container1}>
        {
            !lodg.length ?
            (<div>Aún no has publicado alojamientos</div>) :
            (lodg.map((e)=>
                <div className={style.book} key={e._id}>
                <h5>{e.title}</h5>
                <div className={style.container1}>
                <img src={e.picture["0"]} alt="img not found" width="200" height="130"/>
                <button  onClick={(e) => handleClick(e._id)} className={style.button}>x</button>
                </div>
                </div>
                )) 
        } 
    </div>
    <Link className={style.link} to= {`/profile/${guest}/${host}/reservations`}>Ver reservas de mis alojamientos</Link>
    </div>
   )
}