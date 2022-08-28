import { LOGIN_USER, GET_BY_CITY } from "../Actions/index";

const initialState = {
  lodgings: [],
  allLodgings: [],
  loader: true,
  detail: {},
  user: null,
  userFavorites:[],
  favNumber:0,
  guest: {},
  checkIn: {},
  checkOut: {},
  dates:[],
  allGuests: {},
  duplicate: [],
  allLodgingsReviews: [],
  payment: {},
  rating: [],
};


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_LODGINGS":
      return {
        ...state,
        lodgings: action.payload,
        allLodgings: action.payload,
        loader: false,
      };
    case "FILTER_TYPE_HOUSE":
      const house = state.lodgings.filter((e) => e.lodgingType === "Casa");
      return {
        ...state,
        lodgings: house,
      };

    case "FILTER_BY_PETS":
      const filtering = state.lodgings
      const pets = filtering.filter(e => e.services.pets === true)
      console.log(pets)
      return {
        ...state,
        lodgings: pets,
      };
    case "ORDER_BY_LOWEST":
      const lowest = state.lodgings.sort(function (a, b) {
        return a.price - b.price;
      });
      return {
        ...state,
        lodgings: lowest.map(e=>e),
      };

    // case "ORDER_BY_RATING":
    //   const allLodgingsReviewsMap = state.allLodgingsReviews.map(e => {
    //     return {
    //       lodgingId: e.lodgingId,
    //       rating: e.rating,
    //     };
    //   }).filter(e => e.rating !== 0);
    //   const sumRating = allLodgingsReviewsMap.reduce((acc, curr) => {
    //     if (acc[curr.lodgingId]) {
    //       acc[curr.lodgingId] += curr.rating;
    //     } else {
    //       acc[curr.lodgingId] = curr.rating;
    //     }
    //     return acc;
    //   }, {});
    //   const averageRating = Object.keys(sumRating).map(e => {
    //     return {
    //       lodgingId: e,
    //       rating: sumRating[e] / allLodgingsReviewsMap.filter(f => f.lodgingId === e).length,
    //     };
    //   }).sort((a, b) => b.rating - a.rating);

    //   for(let i = 0; i < state.lodgings.length; i++) {
    //     state.lodgings[i]["rating"] = state.rating[i]
    //   }
    //   console.log(averageRating, 'averageRating')
    //   state.rating.push(averageRating)
    //   console.log(state.rating, 'Hola')
    //   console.log(state.lodgings)
    //   return {
    //     ...state,
    //     lodgings: averageRating,
    //   };

    case "ORDER_BY_HIGHEST":
      const highest = state.lodgings.sort(function (a, b) {
        return b.price - a.price;
      });
      console.log(highest);
      return {
        ...state,
        lodgings: highest.map(e=>e),
      };

    case "LOADER_TRUE":
      return {
        ...state,
        loader: true,
      };

    case "LOADER_FALSE":
      return {
        ...state,
        loader: false,
      };

    case "GET_LODGING_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_BY_CITY":
      if (typeof action.payload === "string") {
        return alert(" Not Found");
      }
      return {
        ...state,
        lodgings: action.payload,
      };

    case "GET_LODGING_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    
    case "GET_GUEST":
      return {
        ...state,
        guest: action.payload
      }

    case "GET_ALL_GUESTS":
      return {
        ...state,
        allGuests: action.payload
      }
    case "GET_GUEST_BY_EMAIL":
      return{
        ...state,
        duplicate: action.payload
      }

    case "GET_FAVORITES":
      
      return {
        ...state,
        userFavorites: action.payload
      }

      case "ADD_FAVORITE":
        console.log("reducer", action.payload)
        return{
        ...state,
        userFavorites: action.payload
        }

    case "DELETE_FAVORITE":
      console.log(action.payload, "soy action")
      /* let favoritos = state.userFavs
      favoritos.filter(e=>e.lodgingId !== action.payload.lodgingId._id  ) */
      return {
      
        ...state,
        userFavorites: action.payload

      }
    /*
    case "FAVORITE_NUMBER":
      return {
        ...state,
        favNumber: action.payload
      } */

      case "SET_DATE":
      return{
        ...state,
        checkIn: action.payload.startDate,
        checkOut: action.payload.endDate
      }

    case "GET_ALL_LODGINGREVIEWS":
      
      return {
        ...state,
        allLodgingsReviews: action.payload
        
      }

    case "PAY_BOOKING":
      return{
        ...state,
        payment: action.payload
      }

    default:
      return {...state} ;
  }
}

export default rootReducer;
