
import React, { useRef } from "react";
import styles from './order-item.module.scss';
import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';


import { useDispatch } from '../../../services/hooks';
import {counterDecrmAction, deleteItemAction} from '../../../services/actions/ingredients'
import { useDrag, useDrop } from 'react-dnd';

import {TBurgerConstructorItem, TConstructorIngredient} from '../../../utils/types'

const BurgerConstructorItem = ({ item, index, isTop, isBottom, isLocked, moveItem}:TBurgerConstructorItem): React.JSX.Element => {

  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  
  const [, drop] = useDrop({
    accept: "ingredient",
    hover(item: TConstructorIngredient, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index || 0;
      if (dragIndex === hoverIndex) { return;  }

      const coords = ref.current?.getBoundingClientRect();
      const clientOffset = monitor?.getClientOffset();
      const middlePointY = (coords.bottom - coords.top) / 2;
      // @ts-ignore
      const hoverClientY = clientOffset.y - coords.top;
      if (dragIndex! < hoverIndex && hoverClientY < middlePointY) { return  }
      if (dragIndex! > hoverIndex && hoverClientY > middlePointY) { return  }

      moveItem(dragIndex!, hoverIndex);
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


  const removeItem = (item: TConstructorIngredient) => {
    dispatch(deleteItemAction(item))
    dispatch(counterDecrmAction(item))
  }

  return (
    <div className={`${styles.item} ${isTop || isBottom ? styles.borderItem : ''}`} ref={isLocked ? null : ref} style={{ opacity }}>
      {!isLocked && <DragIcon type="primary"/>}
      <ConstructorElement
        /* @ts-ignore */
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

export default BurgerConstructorItem;