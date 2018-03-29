import React from 'react';
import Wrap from '../../../Hoc/Wrapper';
import Button from '../../UI/Button/Button'

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
      <p><strong>The Total Price is: {props.price.toFixed(2)}</strong></p>
      <p>Let us continue to checkout..!</p>
      <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
    </Wrap>
  )
};

export default orderSummary
