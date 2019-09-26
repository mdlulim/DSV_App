//import axios from 'axios';
import myBooking from '../data/bookings.json';
//import base64 from 'base-64';
import myBookingAvaliability from '../data/bookingAvaliability.json';
import { Session } from 'bc-react-session';

const session = Session.get();
const bookingAvaliability = (session.payload) ? session.payload.avaliableBookings : null;

class CustomerService {
    static async sendRequest(url, method, headers, body) {
        const options = {
            method: method,
            headers: new Headers(headers),
            mode: 'no-cors'
        };
    
        if (method.toLowerCase() !== 'get') {
            options.body = JSON.stringify(body);
        }
    
        return fetch(url, options);
    }
    
    
    // https://www.npmjs.com/package/base-64
 

    static async login(id_number, phone, email) {
        let booking = myBooking.BookingRequests.map((booking, key) =>{
             //return booking;
            // console.log(booking.NotificationEmailAddress);
             if((id_number == booking.ClientIDPassport) && (email == booking.NotificationEmailAddress)){
                return booking;
             }else{
                return {'result':false};
             }
        });
         return booking;
        // if((id_number == booking[0]['ClientIDPassport']) && (email == booking[0]['NotificationEmailAddress'])){
        //      this.mybooking = booking[0];   
        //      return booking;
            
        // }else{
        //     return false;
        // }

         // axios.get(url,{
        //     headers: {
        //         auth: {
        //             username: 'api.mounties.reco',
        //             password: 'MUJkx474'
        //         },
        //         mode: 'no-cors',
        //     }
        // }).then((res)=>{
        //     console.log(res);
        // }).catch((err)=>{
        //     console.log(err);
        // });
    }

    static async loginA() {
        var url = 'https://private.qa.api.dsv.com:8442/v1/ExternalBooking/BookingAvailability?CustomerGroupCode=RECO&DivisionCode=MSD&TownCode=RDB&SuburbName=RANDBURG&ClientName=Tom Smith&ClientIDPassport=8012120144084';
        
        //var headers = { 'Authorization': 'Basic ' + btoa('api.mounties.reco:MUJkx474') };
        await fetch(url, {
            method: 'GET',
            headers: { "Authorization": "Basic " + btoa("api.mounties.reco:MUJkx474") },
            mode: 'no-cors'
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        }); 
    }

    static async getBookingAvaliability(){
        let bookingAvaliability = myBookingAvaliability.BookingAvailabilitySlots.map((bookingAvaliability, key) =>{
            return bookingAvaliability;
       });

       return bookingAvaliability;
    }

    static async submitBookingRequest(deliveryDate){
      
        let requestType = session.payload.avaliableBookings.RequestType ;
        let divisionCode = session.payload.avaliableBookings.DivisionCode;
        let customerGroupCode = session.payload.avaliableBookings.CustomerGroupCode;
        let deliveryTownCode = session.payload.avaliableBookings.DeliveryTownCode;
        let deliverySuburb = session.payload.avaliableBookings.DeliverySuburb;
        let clientName = session.payload.avaliableBookings.ClientName;
        let clientIDPassport = session.payload.avaliableBookings.ClientIDPassport;
        let clientContactNo = session.payload.avaliableBookings.ClientContactTel;
        let clientDeliveryAddress1 = session.payload.avaliableBookings.ClientDeliveryAddress1;
        let clientDeliveryAddress2  = session.payload.avaliableBookings.ClientDeliveryAddress2;
        let clientDeliveryAddress3 = session.payload.avaliableBookings.ClientDeliveryAddress3;
        let referenceType = session.payload.avaliableBookings.ReferenceType; 
        let referenceValue = session.payload.avaliableBookings.ReferenceValue;
        let productCode = session.payload.avaliableBookings.ProductCode;
        let deliveryPostalCode = session.payload.avaliableBookings.DeliveryPostalCode;
        let deliveryCountryCode = session.payload.avaliableBookings.DeliveryCountryCode;
        let deliveryDateTime = deliveryDate.split(',')[1]+'T00:00:00';
        let tripSheetID = session.payload.avaliableBookings.TripSheetID;
        let tripServiceTime = deliveryDate.split(',')[0];
        let deliveryType = session.payload.avaliableBookings.DeliveryType;
        let deliveryProvinceCode = session.payload.avaliableBookings.DeliveryProvinceCode;
        let bookedBy = session.payload.avaliableBookings.BookedBy;
        // API Call
        //console.log(tripServiceTime);
        //console.log(requestType, divisionCode, customerGroupCode, deliveryTownCode, deliverySuburb, clientName, clientIDPassport, clientContactNo, clientDeliveryAddress1, clientDeliveryAddress2, clientDeliveryAddress3, referenceType, referenceValue, productCode, deliveryPostalCode, deliveryCountryCode, deliveryDateTime, tripSheetID, tripServiceTime, deliveryType, deliveryProvinceCode, bookedBy);
        const result ={status: 'success', message: 'Request for delivery date was successfully! '}
        return result;
    }

    static async logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
    }
}

export default CustomerService;
