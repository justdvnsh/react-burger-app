import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'

const orderSummary = (props) => {
  console.log('CheckoutSummary->',props)
  return (
    <div className={classes.CheckoutSummary}>
      <h2>We hope that you like it...!</h2>
      <Burger ingredients={props.ingredients} />
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <Button btnType="Danger" clicked={props.checkoutCancelled}> CANCEL</Button>
      <Button btnType="Success" clicked={props.checkoutContinued}> CONTINUE</Button>
    </div>
  )
};

export default orderSummary;
