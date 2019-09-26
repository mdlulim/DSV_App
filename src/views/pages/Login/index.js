import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import logo from '../../../assets/images/mondo_logo.png';
import CustomerService from '../../../services/CustomerService';
import CustomerCareService from '../../../services/CustomerCareService';
import { Session } from 'bc-react-session';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id_number: '', 
            email: '',
            phone: '',
            submitted: false,
            loading: false,
            status: '',
            bookingData: [],
            error: ''
        };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
  
    componentDidMount() {
       // this.getBookingAvailable();
      
    }

    handleSubmit(e) {
        e.preventDefault();

        const { history } = this.props;
        const { id_number, phone, status, error } = this.state;
        this.setState({ submitted: true, loading: true });

        const postData = {
          'ClientIDPassport': '9603025469085',
          'ClientContactTel': 'DX190904_393'
         }

      CustomerCareService.getBookingRequest(postData).then((response) =>{

        // if(response.data.Successful == "Y"){
        //   console.log(response.data);
        // }
          console.log(response.data);
      });

      // CustomerService.login(id_number, phone, email).then((res) =>{
      //     if(res[0].result == false){
      //       let errorMessage = 'Unfortunately we were unable to find your details on our system. Please try again…';
      //       this.setState({  error:  errorMessage });
      //     }else{
      //         Session.start({ 
      //             payload: {
      //                 // (optional) any info you want to save on the persisten session
      //                 avaliableBookings: res[0]
      //             },
      //             expiration: 864000 
      //         });
      //         history.push('/home');
      //     }
      //   });
    }

    render() {
        const { id_number, email, submitted, error } = this.state;
        return (
        
            <div className="App">
                
                 <div className="imageLogo">
                     <img className="myLoginLogo" src={logo} alt="DSV Logo"/> <br />
                     <div className="myHeaderMenu"> </div>
                 </div>
                 
            <div className="login_content"> 
              <h1>Delivery Appointment</h1>
              <p className="login_text">hank you for placing your order with Mondo. In order to ensure a smooth delivery process, please login with the details below and confirm an appointment time that suits you...</p>
            <p className="login_error_message">{error}</p>
            </div>
              <div className="login_container">
                <form name="" onSubmit={this.handleSubmit}  autoComplete="off">
                <div className={'form-group' + (submitted && !id_number ? ' has-error' : '')}>
                            {submitted && !id_number &&
                                <div className="help-block">{error} </div>
                            }
                        </div>
                  
                  <TextField
                    id="standard-required"
                    label="Id Number"
                    name="id_number" 
                    value={id_number} 
                    onChange={this.handleChange}
                    className="MuiInputBase-input MuiInput-input"
                    margin="normal"
                  />
                  <p className="login_text">Please enter at least <b>ONE</b> of the fields below:</p>
                  <TextField
                    id="standard-required"
                    label="Phone Number"
                    className="MuiInputBase-input MuiInput-input"
                    margin="normal"
                  />
                  <p className="or-text">OR</p> 
                  <TextField
                    id="input_email"
                    label="Email Address"
                    name="email" 
                    value={email} 
                    onChange={this.handleChange}
                    className="MuiInputBase-input MuiInput-input "
                    margin="normal"
                  />
                  <br /><br />
                  <Button id="login_button" type="submit" color="primary" className="MuiButtonBase-root MuiButton-root jss2758 MuiButton-contained MuiButton-containedPrimary">
                    Login
                  </Button>
              
                </form>
            </div> 
            
            </div>
        );
    }
}

export default Login;