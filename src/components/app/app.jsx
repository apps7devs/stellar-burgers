import { React, useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styles from './app.module.scss'

import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

import Loader from '../loader/loader';
import {
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeader from "../app-header/app-header";

//DND
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {getIngredients} from "../../services/actions/ingredients"


function App() {
  const dispatch = useDispatch();

  const [fetchCounter, setFetchCounter] = useState(0)

  const {errIngredients, loadIngredients} = useSelector(store=>store.ingredients)

  useEffect(() => { dispatch(getIngredients()) }, [fetchCounter])


  return (
    <div className={styles.App}>
    <AppHeader />
    <div className='container'>
      {
        !loadIngredients && !errIngredients && (
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      )
      }
      {
        loadIngredients && !errIngredients && (
          <Loader extraClass="pt-10 pb-10" />
        )
      }
      {
        errIngredients && !loadIngredients && (
          <>
            <h3 className='text text_type_main-default text_color_inactive mt-5'>Ошибка запроса....</h3>
            <p><Button type="primary" size="small" htmlType="button" onClick={()=>{setFetchCounter(fetchCounter+1)}}>
              <span className='text text_type_main-default text_color_inactive '>Попробовать еще раз</span>
               </Button>
            </p>
          </>
        )
      }
    </div>
  </div>
  )
}

export default App