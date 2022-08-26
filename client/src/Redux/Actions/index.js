
import axios from "axios";

export const GET_BY_CITY = " GET_BY_CITY";

export function getLodgings (lodgingId){
    return async function(dispatch){
        try{

        const json = await axios.get("http://localhost:3001/api/lodging")
        
        dispatch({
            type:"GET_LODGINGS",
            payload: json.data
        })
    } catch (error) {
        console.log(error);
    }
}
}

//MENUcd cli
export function filterTypeHouse(payload){
  return{
    type: "FILTER_TYPE_HOUSE",
    payload
  }
}
export function filterByPets(payload){
  return{
    type: "FILTER_BY_PETS",
    payload
  }
}

export function orderByLowerCost(payload){
  return{
    type: "ORDER_BY_LOWEST",
    payload
  }
}
export function orderByHigherCost(payload){
  return{
    type: "ORDER_BY_HIGHEST",
    payload
  }
}

//Aquí termina Menú

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
      let json= await axios.get(`/api/lodging?city=${city}`)
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
      
        let json = await axios.post("/api/guest", payload)
        return json
    }
}



//Trae un guest por Id
export function getGuest(payload){
  return async function (dispatch){
    try{
        const res = await axios.get("/api/guest/" + payload)
        return dispatch({
            type: "GET_GUEST",
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
}

//Filtra el guest por email
export function getGuestByEmail(email){
  return async function(dispatch){
    try{
      let json= await axios.get(`/api/guest?email=${email}`)
      return dispatch({
        type: 'GET_GUEST_BY_EMAIL',
        payload: json.data
        
      })
    }catch(error){
      console.log(error)

    }
  }
}

// Trae todos los Guests
export function allGuests(){
  return async function(dispatch){
    try {
      const res = await axios.get("/api/guest")
      return dispatch({
        type: "GET_ALL_GUESTS",
        payload: res.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}


  export function getDetail (lodgingId){
    return async function (dispatch){
        try{
            const res = await axios.get("/api/lodging/detail/" + lodgingId)
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
      let json = await axios.post("/api/lodging/62fe7ea0b2a41b94d94fd0f2" , payload)
     
      return json
}

}

export function addFavorite(payload){
  return async function(dispatch){
    console.log("actions")

    try{
     let response = await axios.post('http://localhost:3001/api/favorite/', payload)

     console.log("res.data",response.data)
      return dispatch({
        type: "ADD_FAVORITE",
        payload: response.data
      })
   
    }catch(err){
      console.log(err)
    }}
  }

export function getFavorites(payload){
 
  return async function(dispatch){
    try{
    var response = await axios.post('http://localhost:3001/api/favorite/fav', payload)
      return dispatch({
        type: "GET_FAVORITES",
        payload: response.data
       
    }) 
    }catch(err){
      console.log(err)
    }
  }
} 
export function deleteFavorite(payload){
  console.log(payload, "soy delete")
  return async function(dispatch){
    try{
    let response = await axios.post('http://localhost:3001/api/favorite/delete', payload)

      console.log(response,"okkkk")
      return dispatch({
        type: "DELETE_FAVORITE",
        payload: response.data
       
    })  
    }catch(err){
      console.log("hay un error")
    }
  }
} 




export function favoriteNumber(payload){
  return async function(dispatch){
    try{
     /*  var response = await axios.post('http://localhost:3001/api/favorite/favoriteNumber', payload)
      console.log(response, payload)
      return dispatch({
        type: "FAVORITE_NUMBER",
        payload: response.data.favoriteNumber
      }) */
    }catch(err){
      alert("failed to get favorite number")
    }
  }
}
export function settingDate(payload){
  return{
    type: "SET_DATE",
    payload }
  }

export function lodgingReviews(){
  return async function(dispatch){
    try {
      const res = await axios.get("http://localhost:3001/api/lodgingReview")
      console.log(res)
      return dispatch({
        type: "GET_ALL_LODGINGREVIEWS",
        payload: res.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}


// BOOKING
export function createNewBooking(payload) {
  return async function (dispatch) {
    console.log(payload, 'soy yo');
    var json = await axios.post(
      'http://localhost:3001/api/booking/',
      payload
    );

    return json;
  };
}

export function payBooking(payload) {
  return async function (dispatch) {
    try{
    const res = await axios.post('api/payment/:bookingId')
    return dispatch({
      type: "PAY_BOOKING",
      payload: res.data
    })
  } catch(error){
    console.log(error)
  }}
}




