import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredients.css'

class BurgerIngredient extends Component{
  render () {
    let ingredient = null;
    // we set the ingredient to null at start.

    switch (this.props.type) {      // because this is a class.
      case ('bread-bottom'):
        ingredient = <div className={classes.BreadBottom}></div>;
        break;

      case('bread-top'):
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        )
        break;
        // this was because the top of the bread would also contain some seeds.

        case ('meat'):
          ingredient = <div className={classes.Meat}></div>
          break;

        case ('cheese'):
          ingredient = <div className={classes.Cheese}></div>
          break;

        case ('bacon'):
          ingredient = <div className={classes.Bacon}></div>
          break;

        case ('salad'):
          ingredient = <div className={classes.Salad}></div>
          break;

        default:
          ingredient = null;
      }

      return ingredient;
  }
}


// now it is important to validate the property types sometimes.
// but here we would face problems va;idating it , because we have a functional component.
// we will change it to a class component, but i may remind you that, it would not become a container, since
// we are not managing any state.

// now since we havent imported it in the amin file, it owuld not render on screen.
// But since we havnet got any issues. It is working.



BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}




export default BurgerIngredient;
