import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { black } from 'material-ui/styles/colors';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const title = {
  color: 'black'
}
const bodyS = {
  backgroundColor: '#edf2f7v'
}

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function cancelAppointment(){
    localStorage.setItem('error', 'you not allow to delete this message');
    console.log('cancel appointment');
  }

  return (
    <div>
      <a variant="outlined" id="cancel_appointment" className="btn btn-danger" color="primary" onClick={handleClickOpen}>
      Cancel Appointment
      </a>
      <Dialog
       id="ccs"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description" 
        style={bodyS}
      >
        <DialogTitle id="alert-dialog-slide-title" style={title}>Cancel Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to cancel this appointment?
          </DialogContentText>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
            Reason for cancellation
            </label>
            <textarea
            name="reason"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            req
            />
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={cancelAppointment} color="primary">
            Cancel Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}