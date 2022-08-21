import axios from "axios";

export const LOGIN_USER = "LOGIN_USER";
export const GET_BY_CITY = " GET_BY_CITY";


export const loginUser = (user) => {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:3001/api/login", user);
    dispatch({
      type: LOGIN_USER,
      payload: response.data,
    });
  };
};

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


export function orderPrice(payload){
  return {
      type: "ORDER_PRICE",
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
      console.log(payload)
        var json = await axios.post("http://localhost:3001/api/guest", payload)
        console.log(json)
        return json
}
} 

  export function getDetail (lodgingId){
    return async function (dispatch){
        try{
            const res = await axios.get("http://localhost:3001/api/lodging/detail/" + lodgingId)
            console.log(res)
            return dispatch({
                type: "GET_LODGING_DETAIL",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


