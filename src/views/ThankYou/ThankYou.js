import React from 'react';
import Moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
//  import Header from '../../../components/Header/Herder';
import DeliveryTime from '../../components/DeliveryTime/DeliveryTime';
import Button from '@material-ui/core/Button';
import { Session } from 'bc-react-session';
import CustomerServices from '../../services/CustomerService'


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
const session = Session.get();
const { payload } = Session.get();

class ThankYou extends React.Component{
   
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            loading: false,
            // avaliableBooking: [],
            error: '',
        };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
        console.log('test');
    }

  handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }
  async componentDidMount() {
    const { history } = this.props;
    //const { avaliableBooking } = this.state;
    // let deliveryTimeSlots = [];
    // if(session.payload.avaliableBookings){
    //   // 
    //   let booking = session.payload.avaliableBookings;
    //   this.setState({avaliableBooking: booking});
    // }else{
    //   history.push('/login');
    // }
    // deliveryTimeSlots = await this.getAvaliabilitySlots();
    // this.setState({ deliveryTimeSlots: deliveryTimeSlots });
    //console.log(CustomerServices.getBookingAvaliability());
    
  }

  handleSubmit(e) {
      e.preventDefault();

  }


  render() {
    const { avaliableBooking, submitted, loading, error, deliveryTimeSlots } = this.state;
    // if (!avaliableBooking) {
    //     return false;
    // }else{
    //     if (avaliableBooking.BookedDate){
    //       bookedDate = avaliableBooking.BookedDate;
    //     }
    // }
    return (
       
        <div className="App">
        {/* <Header/> */}
        <div className="header_content">
          <p className="welcome-text">Thank you!</p>
          <p className="text">Thank you! Your booking for the following date and time has been confirmed.</p>
          <p className="text"><b>Please ensure you have the following documents available when the courier arrives:</b></p>
           <ol>
               <li>Original ID</li>
               <li>Copy of front + back of ID or copy of green ID book</li>
               <li>Proof of residence (Not older than 3 months)</li>
           </ol>
        </div>
        <p className="thank_you_order_no_text">Order No.: XXX</p>
        <form name="" onSubmit={this.handleSubmit}  autoComplete="off">
          <div className="thank_you_main_container">
                    <br />
                    <b>Delivery Address</b><br />
                    {/* {avaliableBooking.DeliveryProvinceCode}, {avaliableBooking.DeliverySuburb}, {avaliableBooking.DeliveryTownCode} */}
                    <br />
        </div> 
        <b>Please note</b>
              <p>You cannot amend this booking. If you need to do so, please contact our call centre.</p>
              <h2>086 123 6666</h2>
              customercare@buymondo.co.za
              <br />
              <br />
              <Button id="thank_you_logout_botton" type="button" color="primary" className="MuiButton-root">LOGOUT</Button>
              <br />
              <br />
        </form>
        
        
        </div>
    );
  }
}
export default ThankYou;