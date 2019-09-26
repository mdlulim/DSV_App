import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import CustomerService from '../../services/CustomerService'
import { display } from '@material-ui/system';

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

export default function ControlledExpansionPanels(props) {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const showHideTimeSlot = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  var dateHeaderStyle = {
    'flexBasis': '60%'
  };
  var buttonTime = {
    'width': '100%',
    'float': 'left',
    'height': '29px',
    'backgroundColor': '#9997a2',
    'borderRadius': '7px',
    'textDecoration': 'none',
    'textAlign': 'center',
    'paddingTop': '10px'
  }
  var errorM ={
    'color': '#b71a1a',
    'display': 'none'
  }
  var selected_date_time ={
    'display': 'none'
  }
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

  const handleSubmit = (e) =>{
      e.preventDefault();
      const form = e.currentTarget;
      const selectedDateTime = form.selected_date_time.value;
    
      if(!selectedDateTime){
        document.getElementById('errorM').style.display = 'block';
      }else{
        document.getElementById('errorM').style.display = 'none';
        CustomerService.submitBookingRequest(selectedDateTime).then((res) => {
          if(res.status == 'success'){
            console.log(res.status);
            // this.props.history.push({
            //   pathname: '/thankYou',
            //   data: selectedDateTime 
            // })
          }
        })
        
      }
  }

  const deliveryTimeSlots = (props.deliveryTimeSlots.length) ? props.deliveryTimeSlots : [];

  return (
    
    <div className={classes.root}>
       {/* <form onSubmit={handleSubmit}  autoComplete="off"> */}
      {deliveryTimeSlots.map((slot, index) => {
              const pos =index + 1;
              const panel= `panel${pos}`;
              
              return <div key={index}>
                        <ExpansionPanel expanded={expanded === panel} onChange={showHideTimeSlot(panel)}>
                        <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header" >
                        <Typography className={classes.heading} style={dateHeaderStyle}>{slot.deliveryDate}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div className="timeSlotButton">
                            <a href="#" id={index} name={slot.Time+','+slot.Date} onClick={selectedTime} size="small" color="primary" className="MuiButton-containedPrimary selectedTimeButton" style={buttonTime}>
                              {slot.Time}
                            </a>
                            </div>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </div>
                    
            })}
            <input className="input-form" name="selected_date_time" id="selected_date_time" style={selected_date_time} />
            <p id="errorM" style={errorM}>Please select delivery date and time to confirm your appointment!</p>
             <div>
                <Button id="confirm_appointment" type="submit" variant="contained" size="small" className="MuiButtonBase-root MuiButton-root jss441 MuiButton-contained MuiButton-sizeSmall">
                    Confirm Appointment
                </Button>
            </div>
          {/* </form>        */}
      </div>
     
  );
}