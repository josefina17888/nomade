import axios from "axios";

export const GET_BY_CITY = " GET_BY_CITY";

export function getLodgings (lodgingId){
    return async function(dispatch){
        try{
        const json = await axios.get("http://localhost:3001/api/lodging")
        console.log(json)
        
        dispatch({
            type:"GET_LODGINGS",
            payload: json.data
        })
    } catch (error) {
        console.log(error);
    }
}
}

//MENU
export function orderPrice(payload){
  return {
      type: "ORDER_PRICE",
      payload
  }
}
export function filterTypeHouse(payload){
  return{
    type: "FILTER_TYPE_HOUSE",
    payload
  }
}

export function setLoaderTrue() {
    return {
      type: "LOADER_TRUE",
    }
  }
  
  export function setLoaderFalse() {
    return {
      type: "LOADER_FALSE",
    }
  }

export function getByCity(city){
  return async function(dispatch){
    try{
      let json= await axios.get(`http://localhost:3001/api/lodging?city=${city}`)
      console.log(json.data)
      return dispatch({
        type: 'GET_BY_CITY',
        payload: json.data
        
      })
    }catch(error){
      console.log(error)

    }
  }
}

  export function postGuest(payload){
    return async function(dispatch){
      
        var json = await axios.post("http://localhost:3001/api/guest", payload)
        return json
}
} 

  export function getDetail (lodgingId){
    return async function (dispatch){
        try{
            const res = await axios.get("http://localhost:3001/api/lodging/detail/" + lodgingId)
            return dispatch({
                type: "GET_LODGING_DETAIL",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postLodging(payload){
  return async function(dispatch){
    console.log(payload)
      var json = await axios.post("http://localhost:3001/api/lodging/62fe7ea0b2a41b94d94fd0f2" , payload)
     
      return json
}
}


