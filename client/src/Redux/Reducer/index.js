import { LOGIN_USER, GET_BY_CITY } from "../Actions/index";

const initialState = {
  lodgings: [],
  loader: true,
  detail: {},
  user: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      if (!action.payload) {
        alert("Usuario o contraseña incorrecta");
      } else {
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

    default:
      return state;
  }
}

export default rootReducer;
