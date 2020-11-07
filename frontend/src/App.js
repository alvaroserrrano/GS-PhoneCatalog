import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './components/Header';

const App = () => (
  <Router>
    <div className='app'>
      <Header></Header>
      {/* <Home></Home> */}
    </div>
  </Router>
);

export default App;
