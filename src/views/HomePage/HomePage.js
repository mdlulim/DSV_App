import React from 'react';
import Moment from 'react-moment';
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
class HomePage extends React.Component{
   
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            loading: false,
            // avaliableBooking: [],
            error: '',
            deliveryTimeSlots: [],
        };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

  handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }
  async componentDidMount() {
    const { history } = this.props;
    const { avaliableBooking } = this.state;
    let deliveryTimeSlots = [];
    if(session.payload.avaliableBookings){
      
      let booking = session.payload.avaliableBookings;
      console.log(session.payload.avaliableBookings);
      this.setState({avaliableBooking: booking});
    }else{
      history.push('/login');
    }
    deliveryTimeSlots = await this.getAvaliabilitySlots();
    this.setState({ deliveryTimeSlots: deliveryTimeSlots });
    //console.log(CustomerServices.getBookingAvaliability());
    
  }

  handleSubmit(e) {
      e.preventDefault();

  }

  async getAvaliabilitySlots(){
     const timeSlots = [];
     let counter = 1;
     await CustomerServices.getBookingAvaliability().then((res) => {
        res.map((booking) => {
          var sDate = booking.ServiceDate;

          var myDate = sDate.split('T')[0];
          var sTime = booking.ServiceTime;
          let day = this.getDayName(myDate);
          let month = this.getMonth(myDate);
          let deliveryDate = day+', '+ new Date(myDate).getDate()+' '+month+' '+new Date(myDate).getFullYear();
          var CurrentDate = new Date();
          var current_date = CurrentDate.getFullYear()+'-'+CurrentDate.getMonth()+'-'+CurrentDate.getDate();
          var serviceDate = new Date(myDate);
          var service_date = serviceDate.getFullYear()+'-'+serviceDate.getMonth()+'-'+serviceDate.getDate();
          console.log(current_date+' '+ serviceDate);
          if(current_date <= service_date && (counter <= 5)){
            timeSlots.push({'Date': myDate, 'Time': sTime, 'deliveryDate': deliveryDate});
          }
          
          counter++;
        });
      });
      const sortedArray  = timeSlots; //.sort((a,b) => new Moment(a.Date).format('YYYY-MM-DD') - new Moment(b.Date).format('YYYY-MM-DD'));
      return sortedArray;
  }
  
  getDayName(date){
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date(date);
    var dayName = days[d.getDay()];
    return dayName
  }

  getMonth(date){
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date(date);
    return monthNames[d.getMonth()];
  }
   
  render() {
    const { avaliableBooking, submitted, loading, error, deliveryTimeSlots } = this.state;
    const bookedDate = "No appointment has been booked.";
    if (!avaliableBooking) {
        return false;
    }else{
        if (avaliableBooking.BookedDate){
          bookedDate = avaliableBooking.BookedDate;
        }
    }
    return (
       
        <div className="App">
        {/* <Header/> */}
        <div className="header_content">
          <p className="welcome-text">Welcome {avaliableBooking.ClientName}</p>
          <p className="text">You are now logged into the Delivery Booking Portal.</p>
          <p className="text">You have not set an appointment slot as yet, please can you select from the options below...</p>
        </div>
        <p className="order-no-text">Order No.: {avaliableBooking.ReferenceValue}</p>
        <form name="" onSubmit={this.handleSubmit}  autoComplete="off">
          <div className="main-container">
              <div className="main-left">
                   <p> <b>Date Of Delivery</b><br />
                   {bookedDate}
                    <br />
                    <br />
                    <b>Delivery Address</b><br />
                    {avaliableBooking.DeliveryProvinceCode}, {avaliableBooking.DeliverySuburb}, {avaliableBooking.DeliveryTownCode}
                    <br />
                    <Button id="login_button" type="submit" color="primary" size="small" className="MuiButtonBase-root MuiButton-root jss2758 MuiButton-contained MuiButton-containedPrimary">
                        Set Appointment
                    </Button>
                    </p>
              </div>
              <div className="main-right">
                  <div className="slot_header">
                    Please choose a new delivery time...
                  </div>
                  <DeliveryTime deliveryTimeSlots={deliveryTimeSlots} />
                  <br />
              </div>
              <div className="logout_div">
              <Button id="logout_botton" type="button" color="primary" className="MuiButton-root">LOGOUT</Button> 
                    <br />
                    <br />
              </div>        
        </div> 
          
        </form>
        
        
        </div>
    );
  }
}
export default HomePage;