import { combineReducers }    from 'redux';
import { ingredientsReducer } from './ingredients-reducer'
import { constructorReducer } from './constructor-reducer'
import { orderReducer }       from './order-reducer'
import { userReducer }       from './user-reducer'
import { wsReducer } from './ws-reducer';

import {currentIngredientReducer} from './current-ingredient-reducer'


const rootReducer = combineReducers({
    allIngredients: ingredientsReducer,
    constructorOrder: constructorReducer,
    placeOrder: orderReducer,
    user: userReducer,
    currentIngredient: currentIngredientReducer,
    ws: wsReducer
})

export default rootReducer;