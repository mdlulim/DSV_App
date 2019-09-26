import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Session } from 'bc-react-session';
import moment from 'moment';
import '../../../assets/css/bootstrap/bootstrap.min.css';
import logo from '../../../assets/images/mondo.png';

const headerColor = {
  'color': '#114782',
}

const logo_style = {
  marginTop: '25%'
}
const header_content = {
  width: '100%',
  marginRight: 'auto',
  marginLeft: 'auto',
  textAlign: 'center'
}

class Logout extends React.Component{
   
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            loading: false,
        };
      this.handleSubmit = this.handleSubmit.bind(this);

    }

  async componentDidMount() {
   
    
  }

  handleSubmit(e) {
      e.preventDefault();

  }

  render() {

    return (
       
        <div className="App">
          <div style={header_content}>
          <div className="imageLogo"><img className="myLogo" src={logo} alt="DSV Logo" style={logo_style}/> </div> 
                <p className="welcome-text" style={headerColor}>You Have Logged Out!</p>
          </div>
        </div>
    );
  }
}
export default Logout;