import styles from './modal-order-card.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TModalOrderCard } from '../../utils/types';

export const ModalOrderCard = ({ item, amount, currency }:TModalOrderCard): React.JSX.Element => {

  return (
    <div className={`${styles.card}`}>
      {
        item &&
        <>
          <div className={`${styles.imageContainer} mr-3`}>
            <img className={styles.image} src={item.image_mobile} alt={item.name} />
          </div>
          <p className={`${styles.name} text text_type_main-small`}>{item.name}</p>
          <div className={styles.currencyContainer}>
            <p className={`${styles.amount} mr-1 text text_type_digits-default`}>{amount} x</p>
            <p className={`${styles.currency} ml-1 mr-2 text text_type_digits-default`}>{currency}</p>
            <CurrencyIcon type="primary" />
          </div>
        </>
      }
    </div>
  )
}