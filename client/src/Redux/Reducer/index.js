const initialState = {
  lodgings: [],
  allLodgings: [],
  loader: true,
  detail: {},
  user: null,
  userFavorites: [],
  favNumber: 0,
  guest: {},
  allGuests: [],
  duplicate: [],
  allLodgingsReviews: [],
  rating: [],
  country: [],
  payment: {},
  bookings: [],
  feedback: [],
  rating: [],
  lodgingsInitial: [],
  postBooking: {},
  demoUser: null,
  allcomplaints: [],
  hosts: [],
  host: {},
  booking: []
};

var count = {
  countRating: 0,
  countPets: 0,
  countCasa: 0,
  countCaro: 0,
  countBarato: 0,

};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_LODGINGS":
      if (state.lodgingsInitial[0] !== undefined) {
        return {
          ...state,
          lodgings: action.payload,
          allLodgings: action.payload,
          loader: false,
        };
      } else {
        return {
          ...state,
          lodgings: action.payload,
          allLodgings: action.payload,
          lodgingsInitial: action.payload,
          loader: false,
        };
      }

    case "ORDER_BY_RATING":
      if (count.countRating % 2 == 0) {
        const allLodgingsReviewsMap = state.allLodgingsReviews

          .map((e) => {
            return {
              lodgingId: e.lodgingId,
              rating: e.rating,
            };
          })
          .filter((e) => e.rating !== 0);
        const sumRating = allLodgingsReviewsMap.reduce((acc, curr) => {
          if (acc[curr.lodgingId]) {
            acc[curr.lodgingId] += curr.rating;
          } else {
            acc[curr.lodgingId] = curr.rating;
          }
          return acc;
        }, {});
        const averageRating = Object.keys(sumRating)
          .map((e) => {
            return {
              lodgingId: e,
              rating:
                sumRating[e] /
                allLodgingsReviewsMap.filter((f) => f.lodgingId === e).length,
            };
          })
          .sort((a, b) => b.rating - a.rating);
        state.rating.push(averageRating);
        for (let i = 0; i < averageRating.length; i++) {
          for (let j = 0; j < state.lodgings.length; j++) {
            if (state.lodgings[j]._id === averageRating[i].lodgingId) {
              state.lodgings[j]["rating"] = averageRating[i].rating;
            }
          }
        }
        var ratingMax = state.lodgings.sort(function (a, b) {
          return b.rating - a.rating;
        });
        count.countRating++;
        return {
          ...state,
          lodgings: ratingMax.map((e) => e),
        };
      } else {
        count.countRating++;
        return {
          ...state,
          lodgings: state.lodgingsInitial.map((e) => e),
        };
      }

    case "FILTER_TYPE_HOUSE":
      const house = state.lodgings.filter((e) => e.lodgingType === "Casa");
      if (count.countCasa % 2 === 0) {
        count.countCasa++;
        return {
          ...state,
          lodgings: house,
        };
      } else {
        count.countCasa++;
        return {
          ...state,
          lodgings: state.lodgingsInitial.map((e) => e),
        };
      }
    case "GET_COUNTRY":
      return {
        ...state,
        country: action.payload,
      };
    case "FILTER_BY_PETS":
      const filtering = state.lodgings;
      const pets = filtering.filter((e) => e.services.pets === true);
      if (count.countPets % 2 === 0) {
        count.countPets++;
        return {
          ...state,
          lodgings: pets,
        };
      } else {
        count.countPets++;
        return {
          ...state,
          lodgings: state.lodgingsInitial.map((e) => e),
        };
      }
    case "ORDER_BY_LOWEST":
      const lowest = state.lodgings.sort(function (a, b) {
        return a.price - b.price;
      });
      if (count.countBarato % 2 === 0) {
        count.countBarato++;
        return {
          ...state,
          lodgings: lowest.map((e) => e),
        };
      } else {
        count.countBarato++;
        return {
          ...state,
          lodgings: state.lodgingsInitial.map((e) => e),
        };
      }
    case "ORDER_BY_HIGHEST":
      const highest = state.lodgings.sort(function (a, b) {
        return b.price - a.price;
      });
      if (count.countCaro % 2 === 0) {
        count.countCaro++;
        return {
          ...state,
          lodgings: highest.map((e) => e),
        };
      } else {
        count.countCaro++;
        return {
          ...state,
          lodgings: state.lodgingsInitial.map((e) => e),
        };
      }

    case "ORDER_BY_REVIEW":
      const highesSt = state.lodgings.sort(function (a, b) {
        return b.price - a.price;
      });
      console.log(highest);
      return {
        ...state,
        lodgings: highest.map((e) => e),
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
        guest: action.payload,
      };

    case "GET_ALL_GUESTS":
      return {
        ...state,
        allGuests: action.payload,
      };
    case "GET_GUEST_BY_EMAIL":
      return {
        ...state,
        duplicate: action.payload,
      };

    case "GET_HOST":
      return {
        ...state,
        host: action.payload,
        };

    case "GET_FAVORITES":
      return {
        ...state,
        userFavorites: action.payload,
      };

    case "ADD_FAVORITE":
      return {
        ...state,
        userFavorites: [...state.userFavorites, action.payload],
      };

    case "GET_BOOKING_LODGING_ID":
      return {
        ...state,
        bookings: action.payload,
      };

    case "GET_HOST_BY_GUEST_ID":
      console.log(action.payload)
      return {
        ...state,
        hosts: action.payload
      };
    case "BOOKING_BY_GUEST":
        return {
          ...state,
          booking: action.payload,
        };

    case "DELETE_FAVORITE":
      return {
        ...state,
        userFavorites: state.userFavorites.filter(
          (e) => e.lodgingId !== action.payload.lodgingId
        ),
      };
    /*
    case "FAVORITE_NUMBER":
      return {
        ...state,
        favNumber: action.payload
      } */

    case "SET_DATE":
      return {
        ...state,
        checkIn: action.payload.startDate,
        checkOut: action.payload.endDate,
      };
    case "GET_ALL_LODGINGREVIEWS":
      return {
        ...state,
        allLodgingsReviews: action.payload,
      };

    case "PAY_BOOKING":
      return {
        ...state,
        payment: action.payload,
      };

    

    case "SET_DATA_POSTBOOKING":
      return {
        ...state,
        postBooking: action.payload,
      };

    /* case 'GET_INFO_LOCAL_STORAGE':
      const userInfo = localStorage.getItem("userInfo");
      let user = JSON.parse(userInfo);
        return{
          ...state,
          demoUser: user
        } */

    case "SET_DATA_POSTBOOKING":
      const bookingInfo = localStorage.getItem("booking");
      let bookingFinal = JSON.parse(bookingInfo);
      return {
        ...state,
        postBooking: bookingFinal,
      };
    case 'GET_HOST_BY_DNI':
      return {
        ...state,
        host: action.payload
      }

      case "DELETE_LODGING":
      return {
        ...state,
        allLodgings: action.payload,
      };
      case "HACER_ADMIN":
        return {
          ...state,
          allGuests: action.payload,
        };
      case "DELETE_USER":
        return {
          ...state,
          allGuests: action.payload,
        };
        case "SACAR_ADMIN":
          return {
            ...state,
            allGuests: action.payload,
          };


        case "GET_ALL_COMPLAINTS":
          return {
            ...state,
            allcomplaints: action.payload,
          };
          case "DELETE_COMPLAINT":
            return {
              ...state,
              allcomplaints: action.payload,
            };

     /*  case "GET_USER": */
        /* return {
          ...state,
          payment: action.payload,
        }; */
  

       case "GET_CONVERSATIONS":
        return {
          ...state,
          conversations: action.payload,
        };
 
    default:
      return { ...state };
  }
}

export default rootReducer;
