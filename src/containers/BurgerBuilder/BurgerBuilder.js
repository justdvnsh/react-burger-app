import React , {Component} from 'react';

import Wrap from '../../Hoc/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 2.7,
  bacon: 1.0
}

class BurgerBuilder extends Component {
  // now we would be outputting components dynamically. So,
  state = {
    ingredients: null,
    totalPrice: 0.0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    axios.get('https://react-burger-project-adb5c.firebaseio.com/ingredients.json')
        .then((res) => {
            this.setState({ingredients: res.data})
        }).catch((e) => {
          this.setState({error: true})
        })
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el
    }, 0)

    this.setState({purchasable: sum > 0})   //-> sum > 0 would return true or false.
  }   //-> this method woulld take on some ingredients, which is the updated state. This method is called after add or remove handler.
  // so we take the ingredients and updated state, and map the args to get the value of the element.
  // then we reduce the array of arrays to just get the sum. The logic remains, that if any of the item is added, you can order the burger.
  // if no item is added, the button would be disabled.

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;     // just return out of the function.
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseClosedHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true})
    const orders = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Divyansh',
        email: 'test@example.com',
        address: {
          street: 'test ST. 11',
          zipCode: '88765',
          country: 'India'
        }
      },
      delivery: 'fastest'
    }

    axios.post('/orders.json', orders).then((res) => {
        console.log(res)
        this.setState({loading: false, purchasing: false})
    }).catch(e =>{
        console.log(e)
        this.setState({loading: false, purchasing: false})
    })
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    } //-> disabledInfo[key] <= 0 would return either true or false. If the key i.e. element value is less than 0,
    // it would return true, so the button would be disabled and the value is > 0 , it would return false, and the button would not
    // be disabled.
    // -> would make the array, {salad: true, meat: false ....}

    let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients Cant be Loaded...!</p> : <Spinner />
    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <Wrap>
                <Burger ingredients= {this.state.ingredients}/>
                <BuildControls
                  ingredientAdded = {this.addIngredientHandler}
                  ingredientRemoved = {this.removeIngredientHandler}
                  disabled = {disabledInfo}
                  price = {this.state.totalPrice}
                  purchasable = {this.state.purchasable}
                  ordered = {this.purchaseHandler}
        />
        </Wrap>
      );
      orderSummary = <OrderSummary
                          ingredients={this.state.ingredients}
                          purchaseCancelled={this.purchaseClosedHandler}
                          purchaseContinue={this.purchaseContinueHandler}
                          price={this.state.totalPrice}
                          />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);
