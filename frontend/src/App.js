import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Profile } from './components/Profile';
import { Product } from './components/Product';
import { PlaceOrder } from './components/PlaceOrder';
import { Orders } from './components/Orders';
import { Order } from './components/Order';
import { Checkout } from './components/Checkout';
import { Shipping } from './components/Shipping';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Cart } from './components/Cart';
import { Home } from './components/Home';
import './styles/App.css';

const App = () => (
  <Router>
    <div className='app'>
      <Header></Header>
      {/* <Home></Home> */}
    </div>
    <div className='main'>
      <div className='content'>
        <Route path='/profile' component={Profile} />
        <Route path='/product/:id' component={Product} />
        <Route path='/placeorder' component={PlaceOrder} />
        <Route path='/orders' component={Orders} />
        <Route path='/order/:id' component={Order} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/shipping' component={Shipping} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/cart/:id?' component={Cart} />
        <Route path='/category/:id' component={Home} />
        <Route path='/' exact={true} component={Home} />
      </div>
    </div>
  </Router>
);

export default App;
