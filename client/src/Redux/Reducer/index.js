const initialState = {
    lodgings: [],
    loader: true
}

function rootReducer (state = initialState, action){

    switch(action.type){
        case 'GET_LODGINGS':
               return {
                   ...state,
                   lodgings: action.payload,
                   loader: false
               }

       case 'ORDER_PRICE':
           
        let sortedLodgingsPrice = action.payload === 'lowest' ? 
        state.lodgings.sort(function (a, b){
            if (a.price > b.price) {
                return 1
            }
            if (b.price > a.price) {
                return -1
            }
            return 0
        })  
                : state.lodgings.sort(function (a, b){
                    if (a.price > b.price) {
                        return -1
                    }
                    if (b.price > a.price) {
                        return 1
                    }
                    return 0
                })
                return {
                    ...state,
                    lodgings: sortedLodgingsPrice
                }

        case 'LOADER_TRUE': 
            return {
             ...state,
             pokeLoader: true,
            };
             
             
        case 'LOADER_FALSE': 
            return {
             ...state,
             pokeLoader: false,
            };
        
        default: 
            return state;
        }
        }
       
export default rootReducer;