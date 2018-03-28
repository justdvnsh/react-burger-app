import React , {Component} from 'react';

import Wrap from '../../Hoc/Wrapper';
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {
  render () {
    return (
      <Wrap>
        <Burger />
        <div>Burger Controls</div>
      </Wrap>
    )
  }
}

// here we make a container or class based component, because this is like the core of the app.
// we need to manage its state in here.

export default BurgerBuilder;
