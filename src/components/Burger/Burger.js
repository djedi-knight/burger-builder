import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.css'

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients).map(ingredientKey => {
    return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
      return <BurgerIngredient key={ingredientKey + index} type={ingredientKey}></BurgerIngredient>
    });
  });

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  );
};

export default burger;