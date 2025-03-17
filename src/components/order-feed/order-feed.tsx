import { OrderCard } from '../order-card/order-card';
import { Link, useLocation } from "react-router-dom";
import styles from './order-feed.module.scss';
import { TOrderFeed, TResponseOrderItem } from '../../utils/types';

export const OrderFeed = ({ data, isFeed }:TOrderFeed): React.JSX.Element => {
  let location = useLocation();

  return (
    <section className={`${styles.section}`}>
      <ul className={`${styles.list} ${!isFeed && styles.listPersonal}`}>
        {
          data && data.map(function (item: TResponseOrderItem) {
            return (
              <li key={item._id}>
                <Link to={`${item._id}`} 
                  state = {{ background: location }}
                  key={item._id}
                  className={styles.link}
                >
                  <OrderCard
                    order={item}
                  />
                </Link>
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}