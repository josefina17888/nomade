import { LOGIN_USER, GET_BY_CITY } from "../Actions/index";

const initialState = {
  lodgings: [],
  allLodgings: [],
  loader: true,
  detail: {},
  user: null,
  guest: {},
  startDate: '',
  endDate: ''
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
        pokeLoader: true,
      };

    case "LOADER_FALSE":
      return {
        ...state,
        pokeLoader: false,
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
    default:
      return state;
  }
}

export default rootReducer;
