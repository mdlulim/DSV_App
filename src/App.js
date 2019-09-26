import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import './assets/css/style.css';
import './assets/css/bootstrap/bootstrap.css';
import './assets/css/style.css';
import { Session } from 'bc-react-session';

const session = Session.get();
const bookingAvaliability = (session.payload) ? session.payload.avaliableBookings : null;


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
 const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/CustomerCare/Logout/Logout'));
const CustomerCare = React.lazy(() => import('./views/CustomerCare/Home/Home'));

class App extends React.Component {

  // constructor(props) {
  //   super(props);
  // }
  // async componentDidMount() {
  //   const { history } = this.props;
  //   if(!session.payload.avaliableBookings){
  //      history.push('/login');
  //   }
  // }

  render() {
   

    return (
      <div>
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
            
              <Route exact path="/logout" name="Login Page" render={props => <Login {...props}/>} />
               <Route path="/" name="CustomerCare " render={props => <DefaultLayout {...props}/>} /> 
            </Switch>
            
          </React.Suspense>
      </HashRouter>
      </div>
    );
  }
}

export default App;