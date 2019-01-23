import { 
    SELECT_POPOK
   } from '../actions/types'

const INITIAL_STATE = {id: 0, nama: '', merek: '', harga: 0, img: '', description: ''};


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SELECT_POPOK :
            return action.payload; 
        default:
            return state;
    }
}