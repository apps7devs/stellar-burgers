import {api as apiUrl} from '../../utils/commons'

export const SET_INGREDIENTS = 'SET_INGREDIENTS'
export const SET_ERR_INGREDIENTS = 'SET_ERR_INGREDIENTS'
export const SET_LOAD_INGREDIENTS = 'SET_LOAD_INGREDIENTS'
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB'
export const SET_SELECT_INGRIDIENT = 'SET_SELECT_INGRIDIENT'
export const COUNTER_INCRM = 'COUNTER_INCRM';
export const COUNTER_DECRM = 'COUNTER_DECRM';
export const COUNTERS_RESET = 'COUNTERS_RESET';

export function getIngridients() {
  return function (dispatch) {
    fetch(`${apiUrl}/ingredients`)
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`err :: ${res.status}`)
      })
      .then(({ success, data }) => {
        if (success) return data
        return Promise.reject(`err :: ${data}`)
      })
      .then(data => {
        dispatch({
            type: SET_INGREDIENTS,
            ingredients: data
        })
      })
      .catch(err => {
        console.log('err :: ', err.message)
        //setErr(true)
        dispatch({
            type: SET_ERR_INGREDIENTS,
            errIngredients: true
        })
        
      })
      .finally(() => {
        setTimeout(() => {
            dispatch({
                type: SET_LOAD_INGREDIENTS,
                loadIngredients: false
            })
          //setLoad(false)
        }, 1000);//сервер предоставляющий api "слишком" шустрый =), лоадера не видно
      })
  }
}