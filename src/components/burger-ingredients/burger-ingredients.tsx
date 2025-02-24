import { useRef } from "react";
import styles from './burger-ingredients.module.scss';
import IngridientCart from './ingridient-cart/ingridient-cart';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { useDispatch, useSelector } from "react-redux";

import {TOpenModal, TBaseIngredient} from '../../../utils/types'

import {SET_ACTIVE_TAB} from '../../services/actions/ingredients'

const BurgerIngredients = ({ openModal }:TOpenModal ): React.JSX.Element => {
  const dispatch = useDispatch();
  const { ingredientsSort, activeTab, selectIngredient } = useSelector(store=>store.allIngredients
  );
  const setActiveTab = (tabSelect:string)=>{
    dispatch({
      type: SET_ACTIVE_TAB,
      activeTab: tabSelect
    })
  }

  //refs
  const catCategoriesContainer = useRef<HTMLDivElement>(null!);
  const allItemOfCategories:any = {
    buns: useRef<HTMLDivElement>(null!),
    sauces: useRef<HTMLDivElement>(null!),
    fillings: useRef<HTMLDivElement>(null!)
  };
  
  const slideTabContentScroll = () => {
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

  const handleTabClick = (tab:string) => {
    requestAnimationFrame(()=>{
      let allItemOfCategoriesHeight = 0,
          allItemOfCategoriesPositions:any = {};
      for(let i in allItemOfCategories) {
        allItemOfCategoriesHeight += allItemOfCategories[i].current.offsetHeight;
        allItemOfCategoriesPositions[allItemOfCategories[i].current.id] = allItemOfCategoriesHeight;
      }

      const sectionCoords = allItemOfCategories[tab].current.getBoundingClientRect();
        catCategoriesContainer.current.scrollTo({ behavior: 'smooth', top: allItemOfCategoriesPositions[`${tab}`] - sectionCoords.height, left: 0, });
      setActiveTab(tab)
    });
  }

  type Render = {
    catType:string,
    catName: string,
    catData:any
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
            ingredientsSort.map((cat:Render)=> {
              return (
                <li key={cat.catType} id={cat.catType} name="item_of_categories" ref={allItemOfCategories[cat.catType]}>
                  <h3 className={`${styles.text} ${styles.header} text  text_type_main-medium pt-2 pb-6`}>{cat.catName}</h3>
                  <ul className={`${styles.ingridientsList}`}>
                    {
                      cat.catData.map((ingridient: TBaseIngredient)=>{
                        return (
                          <li key={ingridient._id} className="mb-8">
                            <IngridientCart
                            item={ingridient}
                            openModal={openModal}
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
    </section>
  )
  
}

export default BurgerIngredients;