import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


//UI
import 'bootstrap-css-only/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Components 
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Airlines from './components/View/Airlines';
import Airports from './components/View/Airports';
import Passengers from './components/View/Passengers';
import Flights from './components/View/Flights';
import Data from './components/View/Data';

function App() {
  return (
    <div className='App' >
      <Router>
        <Navbar/>
        <div>
          <Switch>
            {/* home controller */}
            <Route path="/" exact component={Home} />
            <Route path="/Airlines" exact component={Airlines} />
            <Route path="/Airports" exact component={Airports} />
            <Route path="/Passengers" exact component={Passengers} />
            <Route path="/Flights" exact component={Flights} />
            <Route path="/Data" exact component={Data} />
            <Route path='*' exact={true} component={Home} />
          </Switch>
        </div>
        {/* <Footer/> */}
      </Router>
    </div>
  );
}

export default App;
