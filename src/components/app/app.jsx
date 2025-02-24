import { React, useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styles from './app.module.scss'

/*import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'*/

import Loader from '../loader/loader';
import {
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeader from "../app-header/app-header";
import MainPage from '../../pages/main-page/main-page';


import IngredientPage from '../../pages/ingredient-page/ingredient-page';
import Modal from '../modal/modal';
import ModalIngredient from '../modal-ingredient/modal-ingredient';


import {getIngredients} from "../../services/actions/ingredients"

import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';

import ProtectedRoute from '../protected-route/protected-route';


import { SET_INGREDIENT_MODAL_INVISIBLE, DELETE_CURRENT_INGREDIENT } from '../../services/actions/current-ingredient';


import { getUser } from '../../services/actions/user';
//routing
import { BrowserRouter as Router,  Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';



function ModalSwitch() {
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const from = location.state && location.state.from;

  const { ingredientModalVisibility } = useSelector(
    state => state.currentIngredient
  );

  // close ingridient modal
  const handleCloseIngredientModal = () => {
    dispatch({
      type: SET_INGREDIENT_MODAL_INVISIBLE,
    })
    dispatch({
      type: DELETE_CURRENT_INGREDIENT
    })
    navigate(-1)
  }

  // 

  return (
    <div>
      <AppHeader />
      <div className='container'>
        <Routes >
          <Route path="*" element={<NotFoundPage/>} />
          <Route path="/" element={<MainPage/>} />
          <Route path="/login" element={<ProtectedRoute onlyUnAuth >{<LoginPage />}</ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute onlyUnAuth >{<RegisterPage />}</ProtectedRoute>} />
          <Route path="/forgot-password" element={<ProtectedRoute onlyUnAuth>{<ForgotPasswordPage />}</ProtectedRoute>} />
          <Route path="/reset-password" element={<ProtectedRoute onlyUnAuth>{<ResetPasswordPage />}</ProtectedRoute>} />
          <Route
            path="/profile"
            element={<ProtectedRoute >{<ProfilePage />}</ProtectedRoute>}
           />
          <Route path="/ingredients/" element={<IngredientPage />} />
          {from ? (
                        <Route
                            path='ingredients/:ingredientId'
                            element={
                                <Modal closeModal={handleCloseIngredientModal} 
                                isModalVisible={ingredientModalVisibility}
                                title='Детали ингредиента'>
                                    <ModalIngredient />
                                </Modal>
                            }
                        />
                    ) : (
                        <Route path='ingredients/:ingredientId' element={<ModalIngredient />} />
                    )}
      </Routes>
      </div>
      
      
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(
    state => state.user
  );

  useEffect(() => {
    if (getCookie('token') && !isLoggedIn) {
      dispatch(getUser())
    }
  }, [])

 
  
  //get data ingridients from api
  const [fetchCounter, setFetchCounter] = useState(0)
  const {errIngredients, loadIngredients} = useSelector(store=>store.allIngredients)
  useEffect(() => { dispatch(getIngredients()) }, [fetchCounter])


  return (
    <div className={styles.App}>
      {
        !loadIngredients && !errIngredients && (
          <Router>
            <ModalSwitch />
          </Router>
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
  )
}

export default App