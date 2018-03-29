import React from 'react';

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
  // Object.keys is JS method to make an array of the keys of the elements.
  let transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
    console.log('Elements:->',igKey); //igKye is the key of the object. //-> 'Salad', 'Meat' etc.
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      console.log('Returns the number of item was there in our state.  ', igKey, ':->', i)
      return <BurgerIngredient key={igKey + i} type={igKey} />
    });
  })
  .reduce((arr, el) => {
      return arr.concat(el)   //-> take the previous value and concat the next item to it.
  }, []) //-> [] is the starting element. Reduce takes a starting element.

  console.log(transformedIngredients)

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Add some ingredients to the table</p>
  }

  /*
  * firstly we create an array of the objects we need, i.e. the keys of the state, Salad, Meat etc.
  * then map the array, into a new array, with each element passing by.
  * We then create a new cloned array of the value and the type of array.
  * We do not directly change the array , because it is generallly considered a bad practise. So we first
  * use [...] the spread operator to create a clone of the array made inside.
  * we map it again. This time since the name is not important, because we have it, we just need the vlaue
  * how much bacon was there. For example in our case, there was just one bacon.
  * We then map the array again, and return the BurgerIngredient tag along with a key and type.
  * Now as we can see, the number of elements is one less than original, this is because
  * Array starts its index from 0 and thus we add i to the key.
  * Now if we see , if there is no elements, we would not see any ingredients
  * But in this case, we should show some text or so .
  * As we can see, it is just an array of arrays, so if we need to check wether there is an element or not,
  * we would need to reduce it to a normal array.
  * So if the array is with 0 elements, just show a text.
  */

  return (
    <div className={classes.Burger}>
        <BurgerIngredient type='bread-top' />
        {transformedIngredients}
        <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;
