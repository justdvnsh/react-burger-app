import React , { Component } from 'react';
import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';


class Checkout extends Component {

  state = {
    ingredients : this.props.location.state.ingredients,
    price: this.props.location.state.totalPrice
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.push('/contact-data', this.state)
  }

  render() {
    console.log('Checkout->',this.props)
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancelHandler = {this.checkoutCancelHandler}
          continueHandler = {this.checkoutContinueHandler}
          price = {this.state.price}
          />

      </div>
    )
  }
};

export default Checkout;
