import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//  import Header from '../../../components/Header/Herder';
import DeliveryTime from '../../../components/DeliveryTime/DeliveryTime';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

class HomePage extends React.Component{
   
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            loading: false,
            error: ''
        };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  handleSubmit(e) {
      e.preventDefault();

  }
   
  render() {
    const { username, password, submitted, loading, error } = this.state;
    return (
       
        <div className="App">
        {/* <Header/> */}
        <div className="header_content">
          <p className="welcome-text">Welcome Mduduzi</p>
          <p className="text">You are now logged into the Delivery Booking Portal.</p>
          <p className="text">You have not set an appointment slot as yet, please can you select from the options below...</p>
        </div>
        <p className="order-no-text">Order No.: 70873049340</p>
          <div className="main-container">
            
            <form name="" onSubmit={this.handleSubmit}  autoComplete="off">
              <div className="main-left">
                   <p> <b>Date Of Delivery</b><br />
                    No appointment has been booked.
                    <br />
                    <br />
                    <b>Client Address</b><br />
                    2 Ncondo Place, Umhlanga Ridge, 4319<br />
                    <Button id="login_button" type="submit" color="primary" className="MuiButtonBase-root MuiButton-root jss2758 MuiButton-contained MuiButton-containedPrimary">
                        SET APPOINTMENT
                    </Button>
                    </p>
              </div>
              <div className="main-right">
                  <DeliveryTime />
              </div>
                    <Button id="logout_button" type="submit" color="primary" className="MuiButtonBase-root MuiButton-root jss2758 MuiButton-contained MuiButton-containedPrimary">
                        LOGOUT
                    </Button> 
            </form>
        </div> 
        
        
        </div>
    );
  }
}
export default HomePage;