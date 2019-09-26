import axios from 'axios';
import myBooking from '../data/bookings.json';
import base64 from 'base-64';
import Config from '../config';
import myBookingAvaliability from '../data/bookingAvaliability.json';
import { Session } from 'bc-react-session';

const session = Session.get();
const bookingAvaliability = (session.payload) ? session.payload.avaliableBookings : null;
const base_url ="http://139.59.187.168/bookit-ajax/";

const epic_base_url = Config.API.EPIC_BASE_URL;
const epic_username = Config.EPIC_API_USERNAME;
const epic_password = Config.EPIC_API_PASSWORD;


class CustomerCareService {
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
    
   static async getOrder(data){
        const url = base_url+"get/?function=GetOrder";
        const options = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                crossdomain: true,
            }
        };
        return await axios.post(url, data, options);
   }
   
   static async getBookingRequest(data){
        const url = base_url+"get/?function=GetBookingRequest";
        const options = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                crossdomain: true,
            }
        };
        return await axios.post(url, data, options);

    }

    static async getBookingAvaliability(data) {
        const url = base_url+"get/?function=BookingAvailability";
        const options = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                crossdomain: true,
            }
        };
        return await axios.post(url, data, options);
    }

    static async createBookingRequest(data){
        const url = base_url+"?function=BookingRequest";
        const options = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                crossdomain: true,
            }
        };
        return await axios.post(url, data, options);
        
    }
     
    static async updateBookingRequest(data){
        const url = base_url+"?function=UpdateBookingRequest";
        const options = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                crossdomain: true,
            }
        };
        return await axios.post(url, data, options);
    }

    static async cancelBookingRequest(data){
        const url = base_url+"?function=CancelBookingRequest";
        const options = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                crossdomain: true,
            }
        };
        return await axios.post(url, data, options);
    }

    static async findBookingRequest(data) {
        const url = base_url+"get/?function=FindBookingRequest";
        const options = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                crossdomain: true,
            }
        };
        return await axios.post(url, data, options);
    }


    static async logout() {
        // remove user from local storage to log user out bPDg2i
        Session.destroy();
        localStorage.removeItem('user');
    }
}

export default CustomerCareService;
