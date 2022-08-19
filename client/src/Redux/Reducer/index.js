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