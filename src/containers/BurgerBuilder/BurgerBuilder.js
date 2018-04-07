import React , {Component} from 'react';

import Wrap from '../../Hoc/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index'

class BurgerBuilder extends Component {
  // now we would be outputting components dynamically. So,
  state = {
    totalPrice: 0.0,
    purchasable: false,
    purchasing: false,
  }

  componentDidMount() {
    this.props.onInitIngredients()
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el
    }, 0)

    return sum > 0   //-> sum > 0 would return true or false.
  }   //-> this method woulld take on some ingredients, which is the updated state. This method is called after add or remove handler.
  // so we take the ingredients and updated state, and map the args to get the value of the element.
  // then we reduce the array of arrays to just get the sum. The logic remains, that if any of the item is added, you can order the burger.
  // if no item is added, the button would be disabled.


  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseClosedHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    const state = {
      ingredients : this.props.ings,
      totalPrice: this.state.totalPrice
    }
    this.props.history.push('/checkout', state)
  }

  render () {
    const disabledInfo = {
      ...this.props.ings    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    } //-> disabledInfo[key] <= 0 would return either true or false. If the key i.e. element value is less than 0,
    // it would return true, so the button would be disabled and the value is > 0 , it would return false, and the button would not
    // be disabled.
    // -> would make the array, {salad: true, meat: false ....}

    let burger = this.props.error ? <p style={{textAlign: 'center'}}>Ingredients Cant be Loaded...!</p> : <Spinner />
    let orderSummary = null;

    if (this.props.ings) {
      burger = (
        <Wrap>
                <Burger ingredients= {this.props.ings}/>
                <BuildControls
                  ingredientAdded = {this.props.onIngredientAdded}
                  ingredientRemoved = {this.props.onIngredientRemoved}
                  disabled = {disabledInfo}
                  price = {this.props.price}
                  purchasable = {this.updatePurchaseState(this.props.ings)}
                  ordered = {this.purchaseHandler}
        />
        </Wrap>
      );
      orderSummary = <OrderSummary
                          ingredients={this.props.ings}
                          purchaseCancelled={this.purchaseClosedHandler}
                          purchaseContinue={this.purchaseContinueHandler}
                          price={this.props.price}
                          />
    }

    return (
      <Wrap>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseClosedHandler}>
          {orderSummary}
        </Modal>
          {burger}
      </Wrap>
    )
  }
}

// here we make a container or class based component, because this is like the core of the app.
// we need to manage its state in here.
// we pass the state to the burger.js file to use it. as the props.

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
