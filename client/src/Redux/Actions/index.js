import axios from "axios";




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