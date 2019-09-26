import React from 'react';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import DeliveryTime from '../../../components/DeliveryTime/DeliveryTime';
import Button from '@material-ui/core/Button';
import { Session } from 'bc-react-session';
import moment from 'moment';
import CustomerServices from '../../../services/CustomerCareService';
import CancelAppointmentModel from '../../../components/CancelAppointmentModal/CancelAppointment';
import './success.css'
import '../../../assets/css/bootstrap/bootstrap.min.css';


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
const headerColor = {
  'color': '#114782',
}
const containerStyle = {
  background: '#dee2e6',
  marginTop: '-11px'
};

const session = Session.get();
const { payload } = Session.get();
class Success extends React.Component{
   
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            loading: false,
        };
      this.handleSubmit = this.handleSubmit.bind(this);

    }

  async componentDidMount() {
    const { history } = this.props;
    
    if (localStorage.getItem('successMessage')){
      
      const successMessage = localStorage.getItem('successMessage');
      const successRequest = localStorage.getItem('successRequest');
      
      const data = {
            CustomerGroupCode : localStorage.getItem('customerGroupCode'),
            DivisionCode      : localStorage.getItem('divisionCode'),
            ClientIDPassport  : localStorage.getItem('clientIDPassport'),
            ReferenceNo       : localStorage.getItem('referenceNo')
          }
      CustomerServices.getBookingRequest(data).then((response) =>{

          this.setState({avaliableBooking: response.data.BookingRequests[0],successMessage: successMessage, successRequest: successRequest });
      })
    }else{
        window.location = '/#/customercare/home';
    }
    
  }

  back(){
        localStorage.removeItem('successMessage');
        localStorage.removeItem('successRequest');
        localStorage.removeItem('customerGroupCode');
        localStorage.removeItem('divisionCode');
        localStorage.removeItem('clientIDPassport');
        localStorage.removeItem('referenceNo');
        window.location = '/#/customercare/home';
      
  }

  handleSubmit(e) {
      e.preventDefault();

  }

  render() {
  
    const { avaliableBooking } = this.state;
     
    let deliveryDateTime = "No appointment has been booked.";
    if (!avaliableBooking) {
        return false;
    }else{
        if (avaliableBooking.DeliveryDateTime){
          deliveryDateTime = moment(avaliableBooking.DeliveryDateTime).format('ll')+ ' Between '+avaliableBooking.TripServiceTime;
        }
    }

    return (
       
        <div className="App">
        {/* <Header/> */}
        <div className="header_content">
          <p className="welcome-text" style={headerColor}>Booking {this.state.successRequest}!</p>
          <div className="alert alert-success" role="alert">
              <p className="text">{this.state.successMessage}</p>
          </div>
          
         </div>
        <p className="order-no-text"><spam className="order_no_title" >Order No:</spam><spam className="order_no">{avaliableBooking.ReferenceValue}</spam> </p>
        <form name="" onSubmit={this.handleSubmit}  autoComplete="off">
                <div className="container-fluid" style={containerStyle}>
                  
                    <div className="row">
                      <div className="col-xs-12 col-lg-6">
                          <br />
                          <b>Customer Name</b><br />
                            {avaliableBooking.ClientName}
                          <p> 
                          <br />
                          <b>Date Of Delivery</b><br />
                          {deliveryDateTime}
                            <br />
                            <br />
                            <b>Delivery Address</b><br />
                            {avaliableBooking.DeliveryProvinceCode}, {avaliableBooking.DeliverySuburb}, {avaliableBooking.DeliveryTownCode}
                            <br />
                            </p>
                      </div>
                     
                  </div>
                  <hr />

                  <button type="button" className="btn btn-dark" onClick={this.back}>Done</button>
                           
                </div>
      
            </form>
        
        
        </div>
    );
  }
}
export default Success;