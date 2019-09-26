import React from 'react';
import Moment from 'react-moment';

import '../../../assets/css/bootstrap/bootstrap.min.css';
import classnames from 'classnames';
import { Session } from 'bc-react-session';
import CustomerServices from '../../../services/CustomerCareService';
import './home.css';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//mport { Container } from '@material-ui/core';
var parseString = require('xml2js').parseString;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
     fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));
const containerStyle = {
  background: '#dee2e6',
  marginTop: '-11px'
}
const marginTop = {
  marginTop: '-13px !important'
}
var dateHeaderStyle = {
  'flexBasis': '60%'
};
var buttonTime = {'width': '100%', 'float': 'left','height': '29px',
  'backgroundColor': '#9997a2','borderRadius': '7px', 'textDecoration': 'none', 'textAlign': 'center','paddingTop': '1px'
}
var errorM ={'color': '#b71a1a','display': 'none'}
var selected_date_time ={'display': 'none'}
var display_timeslot = {'display': 'none'}
var display_error = {'display': 'none'}
const session = Session.get();

const  selectedTime = (e) => {
  e.preventDefault();
  var datetime = e.currentTarget.name;
  document.getElementById('selected_date_time').value = datetime;
  resetSelectButton(e.currentTarget.id);
  if(datetime){
    document.getElementById('confirm_appointment').style.background = '#05407d';
    
  }
};
const resetSelectButton = (index)=>{
  var selectedTimeButton = document.getElementsByClassName('selectedTimeButton');
  for (var i=0; i<selectedTimeButton.length; i++) {
    if (index == i) {
      selectedTimeButton[i].style.backgroundColor = '#05407d';
    } else {
      selectedTimeButton[i].style.backgroundColor = '#999a9a';
    }
  }
}
const Collapse = (props) => {
  const { deliveryTimeSlots } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
      const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
  return <div className={classes.root} style={marginTop}>
      {/* <form onSubmit={handleSubmit}  autoComplete="off"> */}
      {deliveryTimeSlots.map((slot, index) => {
              const pos =index + 1;
              const panel= `panel${pos}`;
              
              return <div key={index}>
                        <ExpansionPanel expanded={expanded === panel} onChange={handleChange(panel)}>
                        <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header" >
                        <Typography className={classes.heading} style={dateHeaderStyle}>{slot.deliveryDate}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div className="timeSlotButton">
                            <a href="#" id={index} name={slot.Time+','+slot.Date} onClick={selectedTime} size="small" color="primary" className="btn btn-secondary btn-sm selectedTimeButton" style={buttonTime}>
                              {slot.Time}
                            </a>
                            </div>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </div>
                    
            })}
            
            <p id="errorM" style={errorM}>Please select delivery date and time to confirm your appointment!</p>
            <button id="confirm_appointment" type="submit" variant="contained" size="small" className="MuiButtonBase-root MuiButton-root jss441 MuiButton-contained MuiButton-sizeSmall">
                    Confirm Appointment
                </button>
</div>;
}

class BookingAppointment extends React.Component{
   
    constructor(props) {
        super(props);

        this.state = {
            activeTab: new Array(4).fill('1'),
            submitted: false,
            loading: false,
            modal: false,
            error: '',
            deliveryTimeSlots: [],
            bookingRequest: '',
            opened: false,
            request: null,
            errorMessage: '',
            selectedDate: "No appointment has been booked."
        };
      this.toggleBox = this.toggleDateTimeSlots.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }
    
    toggleDateTimeSlots() {
      const { opened } = this.state;
      this.setState({
        opened: !opened,
      });
    }

  handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }
  async componentDidMount() {

    const { history } = this.props;
    if(session.payload.avaliableBookings){
      
      let booking = session.payload.avaliableBookings;

      this.setState({avaliableBooking: booking});
    }else{
     // history.push('/login');
    }
    
     const postData ={
      CustomerGroupCode : 'RECO',
      DivisionCode      : "MSD",
      ClientIDPassport  : "9603025469085",
      ReferenceNo       : "DX190913_413"

     };
      CustomerServices.getBookingRequest(postData).then((res) => {
        console.log(res.data.BookingRequests)
        if(res.data.Successful === "Y"){
          const postData ={
                            CustomerGroupCode : res.data.BookingRequests[0].CustomerGroupCode,
                            DivisionCode      : res.data.BookingRequests[0].DivisionCode,
                            TownCode          : res.data.BookingRequests[0].DeliveryTownCode,
                            SuburbName        : res.data.BookingRequests[0].DeliverySuburb,
                            ClientName        : res.data.BookingRequests[0].ClientName,
                            ClientIDPassport  : res.data.BookingRequests[0].ClientIDPassport,
                          };
           
          this.getAvaliabilitySlots(postData).then((response) =>{
             let deliveryTimeSlots = response;
            
             this.setState({ deliveryTimeSlots: deliveryTimeSlots });
          })
          
          this.setState({bookingRequest: res.data.BookingRequests[0], avaliableBooking: res.data.BookingRequests[0]});
        }
    })
    
  }

  handleSubmit(e) {
      e.preventDefault();
      const { history } = this.props;
     let dateTime = e.currentTarget.selected_date_time.value;
     var  deliveryTime = dateTime.split(',')[0];
     var deliveryDate = dateTime.split(',')[1]+'T00:00:00';
     const { avaliableBooking } = this.state;
     var convert = require('xml-js');
     const that = this;
     const postData     = {
      DivisionCode       : avaliableBooking.DivisionCode,
      CustomerGroupCode  : avaliableBooking.CustomerGroupCode,
      DeliveryTownCode   : avaliableBooking.DeliveryTownCode,
      DeliverySuburb     : avaliableBooking.DeliverySuburb,
      ClientName         : avaliableBooking.ClientName,
      ClientIDPassport   : avaliableBooking.ClientIDPassport,
      ClientContactNo    : avaliableBooking.ClientContactTel,
      ClientDeliveryAddress1 : avaliableBooking.ClientDeliveryAddress1,
      ClientDeliveryAddress2 : avaliableBooking.ClientDeliveryAddress2,
      ClientDeliveryAddress3 : avaliableBooking.ClientDeliveryAddress3,
      ReferenceType          : avaliableBooking.ReferenceType,
      DeliveryProvinceCode   : avaliableBooking.DeliveryProvinceCode,
      ReferenceValue         : "000137841401",
      ProductCode            : avaliableBooking.ProductCode,
      DeliveryPostalCode     : avaliableBooking.DeliveryPostalCode,
      DeliveryCountryCode    : avaliableBooking.DeliveryCountryCode,
      TripSheetID            : avaliableBooking.TripSheetID,  //coming from avaliabilty time slots
      DeliveryType           : avaliableBooking.DeliveryType,
      BookedBy               : 12122, //avaliableBooking.BookedBy,
      DeliveryDateTime       : deliveryDate,
      TripServiceTime        : deliveryTime
    }
     
        CustomerServices.createBookingRequest(postData).then((response) =>{
          parseString(response.data, function (err, result) {
              if( result.BookingRequestResponse.Successful[0] === "N"){
                var message = result.BookingRequestResponse.Messages[0]['d2p1:string'][0];
                that.setState({ errorMessage: message});
                document.getElementById('errorId').style.display = 'block';
              }else{
                var message = result.BookingRequestResponse.Messages[0]['d2p1:string'][0];
                var referenceNo = result.BookingRequestResponse.ReferenceNo[0]
                localStorage.setItem('successMessage', message);
                localStorage.setItem('successRequest', 'Created');
                localStorage.setItem('customerGroupCode', postData.CustomerGroupCode);
                localStorage.setItem('divisionCode', postData.DivisionCode);
                localStorage.setItem('clientIDPassport', postData.ClientIDPassport);
                localStorage.setItem('referenceNo', referenceNo);
               history.push('/customercare/success');
              }
          });
        })
   
  }

  async getAvaliabilitySlots(postData){
     const timeSlots = [];
     let counter = 1;

     await CustomerServices.getBookingAvaliability(postData).then((res) =>{
     return res.data.BookingAvailabilitySlots.map((booking) => {
             var currentDate  = moment().format('YYYY-MM-DD');
             var serviceDate  = moment(booking.ServiceDate).format('YYYY-MM-DD');
             var deliveryDate = moment(booking.ServiceDate).format('llll');
             var timeSlot     = booking.ServiceTime;
             
              if (currentDate <= serviceDate && (counter <= 5)) {
                timeSlots.push({'Date': serviceDate, 'Time': timeSlot, 'deliveryDate': deliveryDate});
              }
              counter++;
            })
    })
      const sortedArray  = timeSlots ; //.sort((a,b) => new Moment(a.Date).format('YYYY-MM-DD') - new Moment(b.Date).format('YYYY-MM-DD'));
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
    const { errorMessage, bookingRequest, deliveryTimeSlots, selectedDate } = this.state;
    
    return (
       
      <div className="animated fadeIn">
        
        {/* <Header/> */}
          <div className="header_content">
            <p className="welcome-text">Welcome</p>
            <p className="text">Please see booking details and options below.</p>
            <div id="errorId" className="alert alert-warning" role="alert" style={display_error}>
                {errorMessage}
            </div>
          </div>
          
            <p className="order-no-text"><spam className="order_no_title" >Order No:</spam><spam className="order_no">{bookingRequest.ReferenceValue}</spam> </p>
          
          <form name="" onSubmit={this.handleSubmit}  autoComplete="off">
                <div className="container-fluid" style={containerStyle}>
                  
                    <div className="row">
                      <div className="buttton_container">
                         <h3 className="title_booking">Book New Appointment</h3>
                      </div> 
                      <div className="col-xs-12 col-lg-6">
                          <br />
                          <b>Customer Name</b><br />
                            {bookingRequest.ClientName}
                          <p> 
                          <br />
                          <b>Date Of Delivery</b><br />
                          {selectedDate}
                            <br />
                            <br />
                            <b>Delivery Address</b><br />
                            {bookingRequest.DeliveryProvinceCode}, {bookingRequest.DeliverySuburb}, {bookingRequest.DeliveryTownCode}
                            <br />
                            </p>
                      </div>
                      {/* {opened && ( */}
                      <div id="display_timeslot" className="col-xs-12 col-lg-6">
                        
                        <br />
                          <p  className="tittle_timeSlot">Please choose a new delivery time…</p> 
                          <Collapse deliveryTimeSlots={deliveryTimeSlots} />
                          <input className="input-form" name="selected_date_time" id="selected_date_time" style={selected_date_time} />
                          <br />
                      </div>
                      {/* )} */}
                  </div>
                </div>
      
            </form>
        
        </div> 
    );
  }
}
export default BookingAppointment;