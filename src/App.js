import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

// layout is not made a self closing tag, because we have to access the children property.
// BurgerBuilder can be a self closing tag because we dont need to manage the children of the tag.
export default App;
