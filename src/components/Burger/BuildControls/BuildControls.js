import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'


const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
]

// we just make an array of the controls we would like to use.

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <b>{props.price.toFixed(2)}</b></p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => {props.ingredientAdded(ctrl.type)}}
          removed={() => {props.ingredientRemoved(ctrl.type)}}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
      className={classes.OrderButton}
      disabled = {!props.purchasable}
      onClick = {props.ordered}
      >ORDER NOW</button>
  </div>
);

// key is just to make each elemnt unique. We can omit the key, but react will give a warning as of key is required.
// added is function call to the handler we defined.
//since it we call the function , we pass the type as an argument to it.
// we could also have used bind as to call the function, but I prefered this method.

/*
* So as we saw, If we added an ingredient and removed another one, we sw an error. Or similarly, if we removed
* an element when there were no elements, we saw the same error.
* this was because , when we remove the elements ,from an empty array, we go to the negative index, which is not possible in an array.
* we need to specify the type of the ingredient we want to diable or able.
* !props.purchasable means that if the burger is purchasable, i.e. true, disabled is false. SO the button is not disabled.
* if the purchasable is false, button is true.
*/

export default buildControls;
