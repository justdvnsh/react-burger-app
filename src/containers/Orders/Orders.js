import React, {Component} from 'react';
import Order from '../../components/Orders/Order';
import axios from '../../axios';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

  state = {
    orders: [],
    loading: false
  }

  componentDidMount () {
    this.setState({loading: true})
    axios.get('/orders.json')
          .then((res) => {
            let fetchedOrders = [];
            for (let key in res.data) {
              fetchedOrders.push({...res.data[key] , id: key})
            }
            this.setState({ orders: fetchedOrders, loading: false})
            console.log('Orders-->',this.state)
          }).catch((e) => {
            this.setState({loading: false})
            console.log(e)
          })
  }

  render () {
    console.log('Orderrs->',this.props)
    let order = (
      <div>
        {this.state.orders.map((order) => {
          return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
        })}
      </div>
    )
    if(this.state.loading) {
      order = <Spinner />
    }
    return (
      <div>
        {order}
      </div>
    )
  }
};

export default withErrorHandler(Orders, axios);
