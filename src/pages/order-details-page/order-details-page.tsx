import React from "react";
import { useDispatch } from "../../services/hooks";
import { ModalOrderInfo } from "../../components/modal-order-info/modal-order-info";
import styles from './order-details-page.module.scss';
import { WSConnectionStartAction, WSConnectionClosedAction } from "../../services/actions/ws-actions";


export const OrderDetailsPage = () => {
const dispatch = useDispatch();

  React.useEffect(() => {
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