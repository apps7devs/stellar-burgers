import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './app.module.scss'
import Loader from '../loader/loader';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeader from "../app-header/app-header";
import MainPage from '../../pages/main-page/main-page';

import Modal from '../modal/modal';
import ModalIngredient from '../modal-ingredient/modal-ingredient';

import { ModalOrderInfo } from '../modal-order-info/modal-order-info';

import {getIngredients} from "../../services/actions/ingredients"

import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import { FeedPage } from '../../pages/feed-page/feed-page';
import { PersonalFeed } from '../personal-feed/personal-feed';
import { OrderDetailsPage } from '../../pages/order-details-page/order-details-page';
import { ProfilePersonalData } from '../profile-personal-data/profile-personal-data';

import ProtectedRoute from '../protected-route/protected-route';
import { setFeedModalVisibilityAction } from '../../services/actions/ws-actions';

import {
  setIngredientModalVisibleAction,
  deleteCurrentIngredientAction
} from '../../services/actions/ingredients';


import { getUser } from '../../services/actions/user';
//routing
import { BrowserRouter as Router,  Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

import { TInitialCurrentIngrState  } from '../../utils/types/reducers/reducers-types';

const ModalSwitch = (): React.JSX.Element => {
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const from = location.state && location.state.from;

  const { ingredientModalVisibility } = useSelector(
    (state):TInitialCurrentIngrState  => state.currentIngredient!
  );

  const { orderFeedModalVisibility } = useSelector(
    (state) => state.ws!
  );

  const handleCloseOrderFeedModal = () => {
    dispatch(setFeedModalVisibilityAction(false))
    navigate(-1)
  }

  // close ingridient modal
  const handleCloseIngredientModal = () => {
    dispatch(setIngredientModalVisibleAction())
    dispatch(deleteCurrentIngredientAction())
    navigate(-1)
  }

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
            element={<ProtectedRoute  >{<ProfilePage hint=""><ProfilePersonalData /></ProfilePage>}</ProtectedRoute>}
           />
          <Route
            path="/profile/orders"
            element={<ProtectedRoute >{<ProfilePage
              hint='В этом разделе вы можете просмотреть свою историю заказов'
            >{<PersonalFeed />}</ProfilePage>}</ProtectedRoute>}
           />
          <Route path="/ingredients/" />
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
          <Route
            path="/feed"
            element={<FeedPage />}
           />
           {from ? (
                        <Route
                            path="/feed/:id"
                            element={
                                <Modal closeModal={handleCloseOrderFeedModal} 
                                isModalVisible={orderFeedModalVisibility}
                                title=''>
                                    <ModalOrderInfo isPage={false}/>
                                </Modal>
                            }
                        />
                    ) : (
                        <Route path='/feed/:id' element={<OrderDetailsPage />} />
                    )}
            {from ? (
                        <Route
                            path="/profile/orders/:id"
                            element={
                                <Modal closeModal={handleCloseOrderFeedModal} 
                                isModalVisible={orderFeedModalVisibility}
                                title=''>
                                    <ModalOrderInfo isPage={false}/>
                                </Modal>
                            }
                        />
                    ) : (
                        <Route path='/profile/orders/:id' element={<OrderDetailsPage/>} />
                    )}
      </Routes>
      </div>
      
      
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(
    (state) => state.user!
  );

  useEffect(() => {
    if (getCookie('token') && !isLoggedIn) {
      dispatch(getUser())
    }
  }, [])

 
  
  //get data ingridients from api
  const [fetchCounter, setFetchCounter] = useState(0)
  const {errIngredients, loadIngredients} = useSelector(
    state => state.allIngredients!
  )
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