import React from 'react';
import styles from './score-board.module.scss';
import { TScoreBoard, TResponseOrderItem } from '../../utils/types';

export const ScoreBoard = ({data}:TScoreBoard): React.JSX.Element => {

  let doneOrders: number[] = [];
  let pendingOrders: number[] = [];

  const formatOrders = () => {
    doneOrders = data.orders?.filter((item: TResponseOrderItem) => item.status === "done").map((item: TResponseOrderItem) => item.number).slice(0, 10);
    pendingOrders = data.orders?.filter((item: TResponseOrderItem) => item.status === "pending").map((item: TResponseOrderItem) => item.number).slice(0, 10);
  }
    formatOrders()

  return (
    <section className={styles.section}>

      <div className={styles.listsContainer}>
        <div className={styles.ordersContainer}>
          <h3 className={`${styles.header} text text_type_main-medium mb-6`}>Готовы:</h3>
          <ul className={`${styles.list} ${styles.doneList}`}>
            {
              (doneOrders && doneOrders.length > 0) &&
              doneOrders!.map((item: number) => {
                return (
                  <li key={item}>
                    <p className={`text text_type_digits-default`}>{item}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div className={styles.ordersContainer}>
          <h3 className={`${styles.header} text text_type_main-medium mb-6`}>В работе:</h3>
          <ul className={styles.list}>
          {
              (pendingOrders && pendingOrders.length > 0) &&
              pendingOrders.map((item: number) => {
                return (
                  <li key={item}>
                    <p className={`text text_type_digits-default`}>{item}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>

      <div className={`${styles.dataContainer} mt-15`}>
        <h3 className={`${styles.header} text text_type_main-medium`}>Выполнено за все время:</h3>
        <p className={`${styles.number} text text_type_digits-large`}>{data.total}</p>
      </div>

      <div className={styles.dataContainer}>
        <h3 className={`${styles.header} text text_type_main-medium`}>Выполнено за сегодня:</h3>
        <p className={`${styles.number} text text_type_digits-large`}>{data.totalToday}</p>
      </div>

    </section>
  )
}