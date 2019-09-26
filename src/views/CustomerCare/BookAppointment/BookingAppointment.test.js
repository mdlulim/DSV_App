import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import BookingAppointment from './Home';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><BookingAppointment /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});