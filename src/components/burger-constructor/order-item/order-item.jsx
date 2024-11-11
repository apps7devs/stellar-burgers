
import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { itemPropTypes } from "../../../utils/PropTypes";
import styles from './order-item.module.scss';
import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';


import { useDispatch } from 'react-redux';
import { REMOVE_ITEM } from '../../../services/actions/constructor';
import { COUNTER_DECRM } from '../../../services/actions/ingredients';
import { useDrag, useDrop } from 'react-dnd';

function BurgerConstructorItem ({ item, index, isTop, isBottom, isLocked, moveItem}) {

  const dispatch = useDispatch();
  const ref = useRef(null);
  
  const [, drop] = useDrop({
    accept: "ingredient",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) { return;  }

      const coords = ref.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      const middlePointY = (coords.bottom - coords.top) / 2;
      const hoverClientY = clientOffset.y - coords.top;
      if (dragIndex < hoverIndex && hoverClientY < middlePointY) { return  }
      if (dragIndex > hoverIndex && hoverClientY > middlePointY) { return  }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: () => {
      return { item, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  dragRef(drop(ref));


  const removeItem = (item) => {
    dispatch({
      type: REMOVE_ITEM,
      item: item
    })
    dispatch({
      type: COUNTER_DECRM,
      item: item
    })
  }

  return (
    <div className={`${styles.item} ${isTop || isBottom ? styles.borderItem : ''}`} ref={isLocked ? null : ref} style={{ opacity }}>
      {!isLocked && <DragIcon type="primary"/>}
      <ConstructorElement
        type={isTop ? 'top' : isBottom ? 'bottom' : ''}
        isLocked={isLocked ? true : false}
        text={isTop ? item.name + ` верх` : isBottom ? item.name + ` низ` : item.name}
        price={item.price}
        thumbnail={item.image}
        extraClass={`${isBottom ? styles.bottomBun : ''}`}
        handleClose={() => removeItem(item)}
      />
    </div>
  )
}

BurgerConstructorItem.propTypes = {
  item: itemPropTypes.isRequired,
  index: PropTypes.number,
  moveItem: PropTypes.func,
  isTop: PropTypes.bool,
  isBottom: PropTypes.bool,
  isLocked: PropTypes.bool
}

export default BurgerConstructorItem;