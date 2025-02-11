import styles from './ingredient-page.module.scss';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details'

const IngredientPage = () => {
  const { ingredientId } = useParams()

  const { ingredients } = useSelector(
    state => state.allIngredients
  );

  const item = ingredients.filter(ingredient => ingredient._id === ingredientId)[0];

  return (

    <div className={styles.container}>
      {item &&
        <IngredientDetails item={item}/>
      }
    </div>
  )
}

export default IngredientPage;