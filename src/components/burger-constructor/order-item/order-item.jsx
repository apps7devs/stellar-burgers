
import React from "react";
import PropTypes from 'prop-types';
import { itemPropTypes } from "../../../utils/PropTypes";
import styles from './order-item.module.scss';
import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructorItem ({ item, isTop, isBottom, isLocked, orderNumber}) {
  return (
    <div className={`${styles.item} ${isTop || isBottom ? styles.borderItem : ''}`}>
      {!isLocked && <DragIcon type="primary"/>}
      <p>{orderNumber}</p>
      <ConstructorElement
        type={isTop ? 'top' : isBottom ? 'bottom' : ''}
        isLocked={isLocked ? true : false}
        text={isTop ? item.name + ` верх` : isBottom ? item.name + ` низ` : item.name}
        price={item.price}
        thumbnail={item.image}
      />
    </div>
  )
}

BurgerConstructorItem.propTypes = {
  item: itemPropTypes.isRequired,
  isTop: PropTypes.bool,
  isBottom: PropTypes.bool,
  isLocked: PropTypes.bool
}

export default BurgerConstructorItem;