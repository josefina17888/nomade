<<<<<<< HEAD
const initialState = {
  lodgings: [],
  loader: true,
  detail: {},
  user: null,
  isLogin: false,
};
=======

import {
  LOGIN_USER,
  GET_BY_CITY
} from '../Actions/index';

const initialState = {
    lodgings: [],
    loader: true,
    detail: [],
    user: null,
}
>>>>>>> 93e361a1e4ec9cfcbd04599dfea6b9dab71b8fcc

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      if(!action.payload) {
        alert('Usuario o contraseña incorrecta')
      } else {
        window.location.href = '/'
        return {
          ...state,
          user: action.payload,
        };
      }
    case "GET_LODGINGS":
      return {
        ...state,
        lodgings: action.payload,
        loader: false,
      };
      
    case "ORDER_PRICE":
      let sortedLodgingsPrice =
        action.payload === "lowest"
          ? state.lodgings.sort(function (a, b) {
              if (a.price > b.price) {
                return 1;
              }
              if (b.price > a.price) {
                return -1;
              }
              return 0;
            })
          : state.lodgings.sort(function (a, b) {
              if (a.price > b.price) {
                return -1;
              }
              if (b.price > a.price) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        lodgings: sortedLodgingsPrice,
      };

    case "LOADER_TRUE":
      return {
        ...state,
        pokeLoader: true,
      };

<<<<<<< HEAD
    case "LOADER_FALSE":
      return {
        ...state,
        pokeLoader: false,
      };
=======
        case 'LOADER_TRUE': 
            return {
             ...state,
             loader: true,
            };
             
             
        case 'LOADER_FALSE': 
            return {
             ...state,
             loader: false,
            };
>>>>>>> 93e361a1e4ec9cfcbd04599dfea6b9dab71b8fcc

    case "GET_LODGING_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

<<<<<<< HEAD
    default:
      return state;
  }
}

=======
            case 'GET_BY_CITY':
                if(typeof(action.payload)==='string'){
                return alert(" Not Found");

          }
            return{
              ...state,
            lodgings: action.payload
            
            } 

        case 'GET_LODGING_DETAIL':
            return {
                ...state,
                detail: action.payload
            }    

        
        default: 
            return state;
        }
       
        }
       
>>>>>>> 93e361a1e4ec9cfcbd04599dfea6b9dab71b8fcc
export default rootReducer;
