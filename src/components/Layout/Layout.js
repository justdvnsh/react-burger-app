import React, {Component} from 'react';

import Wrap from '../../Hoc/Wrapper';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render () {
    return (
      <Wrap>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Wrap>
    )
  }
};

// we created a basic layout FUNCTIONAL Component, which we will use as the root of our app.
// now we need a Higher order component to wrap the whole code into one tag.
// because react needs only one JSX tag to be returned.
// for one solution, we can wrap the entire JSX code into div , but it is better to wrap it in another Higher order Component.



/*
* now we did that because we wanted unique name to be generated by react.
* SO to use it we can do just this.
* class is className because i may remind yoiu that this is javascript code and not html.
* This is JSX. so all the tags and elements are provided by react and not html.
*/



export default Layout;
