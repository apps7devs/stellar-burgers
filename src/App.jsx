import { React, useState, useEffect } from 'react'
import styles from './App.module.scss'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
//import { ingredientsMock } from './utils/data'
import { orderMock } from './utils/orderMock'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
//import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
//import Modal from './components/modal/modal';
import Loader from './components/loader/loader';
import {
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeader from "./components/app-header/app-header";


function App() {
  const [ingredients, setIngredients] = useState([]);
  const [load, setLoad] = useState(true)
  const [err, setErr] = useState(false)
  const [fetchCounter, setFetchCounter] = useState(0)

  const url = 'https://norma.nomoreparties.space/api/ingredients';

  useEffect(() => {
    
    fetch(url)
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`err :: ${res.status}`)
      })
      .then(({ success, data }) => {
        if (success) return data
        return Promise.reject(`err :: ${data}`)
      })
      .then(data => {
        setIngredients(data)
      })
      .catch(err => {
        console.log('err :: ', err.message)
        setErr(true)
        
      })
      .finally(() => {
        setTimeout(() => {
          setLoad(false)
        }, 1000);//сервер предоставляющий api "слишком" шустрый =), лоадера не видно

      })

      //на случай если снова глобально сеть ляжет, можно локально обойтись данными и чего-нибудь покодить
      /*setIngredients(ingredientsMock);
      setLoad(false)
      setErr(false)*/

  }, [fetchCounter])

  const handleFetchRetry = ()=>{
    setErr(false);
    setLoad(true);
    setFetchCounter(fetchCounter+1);
  }


  return (
    <div className={styles.App}>
    <AppHeader />
    <div className='container'>
      {
        !load && !err && (
        <main className={styles.main}>
          <BurgerIngredients
            ingredients={ingredients}
          />
          <BurgerConstructor
            ingredients={ingredients}
            order={orderMock}
          />
        </main>
      )
      }
      {
        load && !err && (
          <Loader></Loader>
        )
      }
      {
        err && !load && (
          <>
            <h3 className='text text_type_main-default text_color_inactive mt-5'>Ошибка запроса....</h3>
            <p><Button type="primary" size="small" htmlType="button" onClick={()=>{handleFetchRetry()}}>
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