import React , { Component } from 'react';
import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import {connect} from 'react-redux';


class Checkout extends Component {

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.push('/contact-data')
  }

  render() {
    console.log('Checkout->',this.props)
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          cancelHandler = {this.checkoutCancelHandler}
          continueHandler = {this.checkoutContinueHandler}
          price = {this.props.price}
          />

      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(Checkout);
