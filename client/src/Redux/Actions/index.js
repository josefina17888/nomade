import axios from "axios";

export const LOGIN_USER = "LOGIN_USER";

export const loginUser = (user) => {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:3001/api/login", user);
    dispatch({
      type: LOGIN_USER,
      payload: response.data,
    });
  };
};

export function getLodgings (){
    return async function(dispatch){
        try{
        const json = await axios.get("http://localhost:3001/api/lodging/")
        
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
      let json= await axios.get(`/lodging?city=${city}`)
      console.log(json)
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
        return json
}
} 

  export function getDetail (_id){
    return async function (dispatch){
        try{
            const res = await axios.get("http://localhost:3001/api/lodging/" + _id)
            return dispatch({
                type: "GET_LODGING_DETAIL",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postHost(payload) {
  return async function () {
      try {
          const response = await axios.post('http://localhost:3001/api/host', payload)
          console.log(payload)
          return response

      } catch (error) {
          console.log(error)
      }
  }
}
