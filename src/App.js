import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/CheckOut/Checkout';
import ContactData from './containers/CheckOut/ContactData/ContactData';
import Orders from './containers/Orders/Orders';
import {Route, Switch} from 'react-router-dom';
import Auth from './containers/Auth/Auth'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
        <Switch>
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/contact-data" exact component={ContactData} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
        </Layout>
      </div>
    );
  }
}

// layout is not made a self closing tag, because we have to access the children property.
// BurgerBuilder can be a self closing tag because we dont need to manage the children of the tag.
export default App;
