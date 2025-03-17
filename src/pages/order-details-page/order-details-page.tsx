import React from "react";
import { useDispatch } from "../../services/hooks";
import { ModalOrderInfo } from "../../components/modal-order-info/modal-order-info";
import styles from './order-details-page.module.scss';
import { WSConnectionStartAction, WSConnectionClosedAction } from "../../services/actions/ws-actions";
import { useLocation } from "react-router";
import { getCookie } from '../../utils/cookie';


export const OrderDetailsPage = () => {
const dispatch = useDispatch();
const location = useLocation()

  React.useEffect(() => {
    location?.pathname.match('profile/orders')
    ? 
    dispatch(WSConnectionStartAction(getCookie('token') as string))
    :
    dispatch(WSConnectionStartAction('/all'));
  return() => {
    dispatch(WSConnectionClosedAction());
  }
}, [dispatch])

  return (
    <div className={styles.section}>
      <ModalOrderInfo isPage={true} />
    </div>
  )
}