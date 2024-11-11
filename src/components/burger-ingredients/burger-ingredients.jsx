import { useRef } from "react";
import styles from './burger-ingredients.module.scss';
import IngridientCart from './ingridient-cart/ingridient-cart';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
//import { ingredientsPropTypes } from "../../utils/PropTypes";

import Modal from '../../components/modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';

import { useDispatch, useSelector } from "react-redux";

import {SET_ACTIVE_TAB, SET_SELECT_INGRIDIENT} from '../../services/actions/ingredients'

function BurgerIngredients () {
  const dispatch = useDispatch();
  const { ingredientsSort, activeTab, selectIngredient } = useSelector(store=>store.ingredients
  );
  const setActiveTab = (tabSelect)=>{
    dispatch({
      type: SET_ACTIVE_TAB,
      activeTab: tabSelect
    })
  }
  
  const setSelectIngredient = (selectIngredient)=>{
    dispatch({
      type: SET_SELECT_INGRIDIENT,
      selectIngredient: selectIngredient
    })
  }

  //refs
  const catCategoriesContainer = useRef(0);
  const allItemOfCategories = {
    buns: useRef(0),
    sauces: useRef(0),
    fillings: useRef(0)
  };
  
  function slideTabContentScroll() {
    requestAnimationFrame(()=>{
      const sequenceTab = ['buns', 'sauces', 'fillings'],
            container = catCategoriesContainer.current.getBoundingClientRect().top
    
      let newActiveTab = activeTab,
          tops = [];
      
      for(let cat of sequenceTab){
        let top = allItemOfCategories[cat].current.getBoundingClientRect().top - container;
        tops.push(top >= 0 ? top : top*-1)
      }
      
      newActiveTab = sequenceTab[tops.indexOf(Math.min(...tops))];
      if(activeTab !== newActiveTab) setActiveTab(newActiveTab);
    
    });
  };

  const handleTabClick = (tab) => {
    requestAnimationFrame(()=>{
      let allItemOfCategoriesHeight = 0,
      allItemOfCategoriesPositions = {};
      for(let i in allItemOfCategories) {
        allItemOfCategoriesHeight += allItemOfCategories[i].current.offsetHeight;
        allItemOfCategoriesPositions[allItemOfCategories[i].current.id] = allItemOfCategoriesHeight;
      }

      const sectionCoords = allItemOfCategories[tab].current.getBoundingClientRect();
        catCategoriesContainer.current.scrollTo({ behavior: 'smooth', top: allItemOfCategoriesPositions[`${tab}`] - sectionCoords.height, left: 0, });
      setActiveTab(tab)
    });
  }

  return (
    <section className={styles.section}>

      <h2 className={`${styles.text} ${styles.header} text text_type_main-large mb-5 mt-10`}>Соберите бургер</h2>

      <nav className={`${styles.categories} mb-8`}>
        <Tab value='buns' active={activeTab === 'buns'} onClick={()=>{handleTabClick('buns')}}>
          Булки
        </Tab>
        <Tab value='sauces' active={activeTab === 'sauces'} onClick={()=>{handleTabClick('sauces')}}>
          Соусы
        </Tab>
        <Tab value='fillings' active={activeTab === 'fillings'} onClick={()=>{handleTabClick('fillings')}}>
          Начинки
        </Tab>
      </nav>

      <section className={`${styles.ingridients}  ${styles.scrollIngredients}`} ref={catCategoriesContainer} onScroll={()=>{slideTabContentScroll()}}>
        <ul className={styles.ingridientsCatList}>
          {
            ingredientsSort.map((cat)=> {
              return (
                <li key={cat.catType} id={cat.catType} name="item_of_categories" ref={allItemOfCategories[cat.catType]}>
                  <h3 className={`${styles.text} ${styles.header} text  text_type_main-medium pt-2 pb-6`}>{cat.catName}</h3>
                  <ul className={`${styles.ingridientsList}`}>
                    {
                      cat.catData.map(function(ingridient){
                        return (
                          <li key={ingridient._id} className="mb-8" onClick={()=>{setSelectIngredient(ingridient);}}>
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
            ><IngredientDetails/>
          </Modal>
        )
      }
    </section>
  )
}

/*BurgerIngredients.propTypes = {
  ingredients: ingredientsPropTypes
};*/

export default BurgerIngredients;