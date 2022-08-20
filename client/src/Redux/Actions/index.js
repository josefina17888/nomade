import axios from "axios";

export const loginUser = (user) => {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:3001/api/login", user);
    let variableNueva = response.data
    dispatch({
      type: "LOGIN_USER",
      payload: variableNueva.user,
    });
    
  };
};


export function getLodgings (){
    return async function(dispatch){
        try{
        const json = await axios.get("http://localhost:3001/api/lodging/all")
        
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


  export function postGuest(payload){
    return async function(dispatch){
      console.log(payload)
        var json = await axios.post("http://localhost:3001/api/guest", payload)
        console.log(json)
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


