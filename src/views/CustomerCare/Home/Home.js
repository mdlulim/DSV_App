import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Moment from 'react-moment';
import '../../../assets/css/bootstrap/bootstrap.min.css';
import classnames from 'classnames';
import { Session } from 'bc-react-session';
import CustomerServices from '../../../services/CustomerCareService';
import CancelAppointment from '../../../components/CancelAppointmentModal/CancelAppointment';
import './home.css';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { element } from 'prop-types';
import CustomerCareService from '../../../services/CustomerCareService';
var parseString = require('xml2js').parseString;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '40%'
  }
};
const modalButton ={
  width: '47%'
}
const marginTop = {
  marginTop: '-13px !important'
}
const modalButtonC ={
  width: '47%',
  marginLeft: '22px'
}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement')

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
};

var dateHeaderStyle = {
  'flexBasis': '60%'
};
var buttonTime = {'width': '100%', 'float': 'left','height': '29px',
  'backgroundColor': '#9997a2','borderRadius': '7px', 'textDecoration': 'none', 'textAlign': 'center','paddingTop': '1px'
}
var errorM ={'color': '#b71a1a','display': 'none'}
var selected_date_time ={'display': 'none'}
var display_timeslot = {'display': 'none'}
var display_success = {'display': 'none'}
var display_error = {'display': 'none'}

// ================= Modal CSS ==========================
const bgModal = {
  backgroundColor: 'rgba(0, 0, 0, 0.75)'
}
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

class Home extends React.Component{
   
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
            modalIsOpen: false,
            errorMessage: '',
            bookData: {}
        };
      this.redirectToBooking = this.redirectToBooking.bind(this);
      this.toggleBox = this.toggleDateTimeSlots.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.cancelAppoint = this.cancelAppoint.bind(this);

      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      
    }

    openModal() {
      this.setState({modalIsOpen: true});
    }
  
    afterOpenModal() {
      // references are now sync'd and can be accessed.
      this.subtitle.style.color = 'rgb(60, 57, 57';
    }
  
    closeModal() {
      this.setState({modalIsOpen: false});
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
    //console.log(session.payload.success);
    Modal.setAppElement('body');

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
          ReferenceNo       : "DX190917_415"
        };

     const data ={
          CustomerGroupCode : 'RECO',
          DivisionCode      : "MSD",
          ClientIDPassport  : "9603025469085",
          ReferenceValue    : "000137841401"
        };

     CustomerCareService.findBookingRequest(data).then((response) => {
        console.log(response.data);
     })
     this.setState({bookData: postData});
      CustomerServices.getBookingRequest(postData).then((res) => {
         
        if(res.data.Successful === "Y"){
         
          const postData ={
                            CustomerGroupCode : res.data.BookingRequests[0].CustomerGroupCode,
                            DivisionCode      : res.data.BookingRequests[0].DivisionCode,
                            TownCode          : res.data.BookingRequests[0].DeliveryTownCode,
                            SuburbName        : res.data.BookingRequests[0].DeliverySuburb,
                            ClientName        : res.data.BookingRequests[0].ClientName,
                            ClientIDPassport  : res.data.BookingRequests[0].ClientIDPassport,
                          };
                         // console.log(postData);
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
     const that = this;
     const data = {
              ReferenceNo            : avaliableBooking.ReferenceNo,
              RequestType            :1,
              DivisionCode           : avaliableBooking.DivisionCode,
              CustomerGroupCode      : avaliableBooking.CustomerGroupCode,
              ClientName             : avaliableBooking.ClientName,
              ClientIDPassport       : avaliableBooking.ClientIDPassport,
              ClientContactNo        : avaliableBooking.ClientContactTel,
              ClientDeliveryAddress1 : avaliableBooking.ClientDeliveryAddress1,
              ClientDeliveryAddress2 : avaliableBooking.ClientDeliveryAddress2,
              ClientDeliveryAddress3 : avaliableBooking.ClientDeliveryAddress3,
              ReferenceType          : avaliableBooking.ReferenceType,
              ReferenceValue         : avaliableBooking.ReferenceValue,
              DeliveryTownCode       : avaliableBooking.DeliveryTownCode,
              DeliverySuburb         : avaliableBooking.DeliverySuburb,
              DeliveryPostalCode     : avaliableBooking.DeliveryPostalCode,
              DeliveryCountryCode    : avaliableBooking.DeliveryCountryCode,
              DeliveryDateTime       : deliveryDate,
              TripSheetID            : avaliableBooking.TripSheetID,
              TripServiceTime        : deliveryTime,
              NotificationSMS        : avaliableBooking.NotificationSMS,
              NotificationEmail      : avaliableBooking.NotificationEmail,
              NotificationCalendar   : avaliableBooking.NotificationCalendar,
              DeliveryType           : avaliableBooking.DeliveryType,
              DeliveryProvinceCode   : avaliableBooking.DeliveryProvinceCode,
              ThirdPartyDelivery     : avaliableBooking.ThirdPartyDelivery, 
              ActionUser             : 'peterh',
              StatusID               :  1
        }
        CustomerServices.updateBookingRequest(data).then((response) =>{
          console.log(response)
          parseString(response.data, function (err, result) {
            if( result.BookingRequestResponse.Successful[0] === "N"){
              var message = result.BookingRequestResponse.Messages[0]['d2p1:string'][0];
              that.setState({ errorMessage: message});
              document.getElementById('errorId').style.display = 'block';
            
            }else{
              var message = result.BookingRequestResponse.Messages[0]['d2p1:string'][0];
              localStorage.setItem('successMessage', message);
              localStorage.setItem('successRequest', 'Updated');
              localStorage.setItem('customerGroupCode', data.CustomerGroupCode);
              localStorage.setItem('divisionCode', data.DivisionCode);
              localStorage.setItem('clientIDPassport', data.ClientIDPassport);
              localStorage.setItem('referenceNo', data.ReferenceNo);
              history.push('/customercare/success');
            }
        });

        })
   
  }

  async updateComponent(){
       document.getElementById('display_timeslot').style ="block";
  }
  
  async redirectToBooking(){
      const { history } = this.props;
      history.push('/customercare/new_booking');
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
   
  cancelAppoint(e){
    e.preventDefault();
    let reason = e.currentTarget.reason.value;
    const { history } = this.state;
    const that = this;
    const data = {
            CustomerGroupCode : this.state.bookData.CustomerGroupCode,
            DivisionCode      : this.state.bookData.DivisionCode,
            ClientIDPassport  : this.state.bookData.ClientIDPassport,
            ReferenceNo       : this.state.bookData.ReferenceNo,
            CancellationReason: reason

          }
    CustomerServices.cancelBookingRequest(data).then((response) =>{
     
      parseString(response.data, function (err, result) {
        console.log(result)
        if( result.CancelBookingRequestResponse.Successful[0] === "N"){
          var message = result.CancelBookingRequestResponse.Messages[0]['d2p1:string'][0];
          that.setState({ errorMessage: message});
          document.getElementById('errorId').style.display = 'block';
          that.setState({modalIsOpen: false});
        }else{
          var message = result.CancelBookingRequestResponse .Messages[0]['d2p1:string'][0];
          localStorage.setItem('successMessage', message);
          localStorage.setItem('successRequest', 'Cancelled');
          localStorage.setItem('customerGroupCode', data.CustomerGroupCode);
          localStorage.setItem('divisionCode', data.DivisionCode);
          localStorage.setItem('clientIDPassport', data.ClientIDPassport);
          localStorage.setItem('referenceNo', data.ReferenceNo);
          window.location = '#/customercare/success';
        }
    });
    })
   
    console.log(data );
  }

  render() {
    const { avaliableBooking, bookingRequest, deliveryTimeSlots, errorMessage } = this.state;
     
    let deliveryDateTime = "No appointment has been booked.";
    if (!avaliableBooking) {
        return false;
    }else{
        if (avaliableBooking.DeliveryDateTime){
          deliveryDateTime = moment(avaliableBooking.DeliveryDateTime).format('ll')+ ' Between '+avaliableBooking.TripServiceTime;
        }
    }


    return (
       
      <div className="animated fadeIn">
        
        {/* <Header/> */}
          <div className="header_content">
            <p className="welcome-text">Welcome</p>
            <p className="text">Please see booking details and options below.</p>
            
          </div>
          <div>
          <div id="errorId" className="alert alert-warning" role="alert" style={display_error}>
                {errorMessage}
            </div>
       
          <Modal
                          isOpen={this.state.modalIsOpen}
                          onAfterOpen={this.afterOpenModal}
                          onRequestClose={this.closeModal}
                          style={customStyles}
                          contentLabel="Example Modal"
                        >
                        <form onSubmit={this.cancelAppoint} autoComplete="off">
                          <h2 ref={subtitle => this.subtitle = subtitle} >Cancel Appointment?</h2>
                          
                          <div>Are you sure you want to cancel this appointment? This cannot be
                                  undone and the Customer will be notified by SMS and email that their
                                  appointment has been canceled.
                          </div>
                          <div className="form-group">
                            <hr />
                              <label htmlFor="exampleFormControlTextarea1">
                              Reason for cancellation
                              </label>
                              <textarea
                              name="reason"
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              />
                              <br />
                              <center>
                                  <button className="btn btn-danger" onClick={this.closeModal} style={modalButton}>No</button>
                                  <button className="btn btn-primary" style={modalButtonC}>Yes, Cancel Appointment</button>
                              </center>
                          </div>
                          </form>
                      </Modal>
      </div>
          
            <p className="order-no-text"><span className="order_no_title" >Order No:</span><span className="order_no">{bookingRequest.ReferenceValue}</span> </p>
          
            <form name="" onSubmit={this.handleSubmit}  autoComplete="off">
                <div className="container-fluid" style={containerStyle}>
                  
                    <div className="row">
                      <div className="buttton_container">
                      <div className="row">
                      <div className="col-xs-12 col-lg-12">
                            <button type="button" id="update_booking" className="btn btn-success" onClick ={this.updateComponent} >Update Booking</button>
                            <button type="button" id="book_appointment" className="btn btn-primary" onClick={this.redirectToBooking}>Book Appointment</button>
                            <a id="cancel_appointment" className="btn btn-danger" color="primary" onClick={this.openModal}>Cancel Appointment</a>
                            </div>
                            {/* <div className="col-xs-12 col-lg-6">
                            <CancelAppointment />
                              </div> */}
                              </div>
                      </div> 
                      
                      
                      <div className="col-xs-12 col-lg-6">
                          <br />
                          <b>Customer Name</b><br />
                            {bookingRequest.ClientName}
                          <p> 
                          <br />
                          <b>Date Of Delivery</b><br />
                          {deliveryDateTime}
                            <br />
                            <br />
                            <b>Delivery Address</b><br />
                            {bookingRequest.DeliveryProvinceCode}, {bookingRequest.DeliverySuburb}, {bookingRequest.DeliveryTownCode}
                            <br />
                            </p>
                      </div>
                      {/* {opened && ( */}
                      <div id="display_timeslot" className="col-xs-12 col-lg-6" style={display_timeslot}>
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
export default Home;