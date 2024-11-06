import { useState } from "react";
import styles from './burger-ingredients.module.scss';
import IngridientCart from './ingridient-cart/ingridient-cart';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientsPropTypes } from "../../utils/PropTypes";

import Modal from '../../components/modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';

function BurgerIngredients ({ ingredients }) {

  const ingridientsSort = [
    {
      catName: 'Булки',
      catType: 'buns',
      catData: ingredients.filter(function(item) {
        return item.type === "bun"
      })
    },
    {
      catName: 'Соусы',
      catType: 'sauces',
      catData: ingredients.filter(function(item) {
        return item.type === "sauce"
      })      
    },
    {
      catName: 'Начинки',
      catType: 'fillings',
      catData: ingredients.filter(function(item) {
        return item.type === "main"
      })
    }
  ];

  const [activeTab, setActiveTab] = useState('buns');
  const [selectIngredient, setSelectIngredient] = useState(null);


  return (
    <section className={styles.section}>

      <h2 className={`${styles.text} ${styles.header} text text_type_main-large mb-5 mt-10`}>Соберите бургер</h2>

      <nav className={`${styles.categories} mb-8`}>
        <Tab value='buns' active={activeTab === 'buns'} onClick={setActiveTab}>
          Булки
        </Tab>
        <Tab value='sauces' active={activeTab === 'sauces'} onClick={setActiveTab}>
          Соусы
        </Tab>
        <Tab value='fillings' active={activeTab === 'fillings'} onClick={setActiveTab}>
          Начинки
        </Tab>
      </nav>

      <section className={`${styles.ingridients} ${styles.scrollIngredients}`}>
        <ul className={styles.ingridientsCatList}>
          {
            ingridientsSort.map((cat)=> {
              return (
                <li key={cat.catType}>
                  <h3 className={`${styles.text} ${styles.header} text  text_type_main-medium pt-2 pb-6`}>{cat.catName}</h3>
                  <ul className={`${styles.ingridientsList}`}>
                    {
                      cat.catData.map(function(ingridient){
                        return (
                          <li key={ingridient._id} className="mb-8" onClick={()=>{setSelectIngredient(ingridient); console.log(ingridient)}}>
                            <IngridientCart
                            item={ingridient}
                            />
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </section>
      {
        selectIngredient && (
          <Modal
            title="Детали ингридиента"
            closeModal={()=>{setSelectIngredient(null)}}
            ><IngredientDetails item={selectIngredient}/>
          </Modal>
        )
      }
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: ingredientsPropTypes
};

export default BurgerIngredients;