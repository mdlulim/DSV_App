import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-12 col-md-offset-3">
                <div class="panel panel-primary">
                     <div class="panel-heading"> <h3 class="panel-title">Active Delivery Appointment</h3> </div> 
                     <div class="panel-body"> 
                        <h1>Welcome {user.firstName}!</h1>
                        <p>Your order has just been picked and packed, and ready to be handed over to the carrier. You can expect your order real soon now. Below you find the tracking link to follow your shipment any time. <br />
                        If the tracking information has not been updated after 2 business days, please contact our customer service. We will immediately start an investigation to locate your order. Please always refer to your order number 2100029890 when contacting us.   </p>
                        
                        {users.loading && <em>Loading users...</em>}
                        {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                        {users.items &&
                            <ul>
                                {users.items.map((user, index) =>
                                    <li key={user.id}>
                                        {user.firstName + ' ' + user.lastName}
                                    </li>
                                )}
                            </ul>
                        }
                        <p>
                            <Link to="/login">Logout</Link> 
                        </p>
                      </div> 
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };