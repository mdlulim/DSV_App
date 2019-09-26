import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ThankYou from './ThankYou';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ThankYou /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});