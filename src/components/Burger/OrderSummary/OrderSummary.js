import React from 'react';
import Wrap from '../../../Hoc/Wrapper';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span><span>: {props.ingredients[igKey]}</span>
      </li>
    )
  })

  return (
    <Wrap>
      <h3>Your Order</h3>
      <p> A delicious Burger Awaiting your order with the following ingredients :-</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Let us continue to checkout</p>
    </Wrap>
  )
};

export default orderSummary
