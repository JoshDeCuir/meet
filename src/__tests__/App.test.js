// src/__tests__/App.test.js

import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {

  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild
  })

  test('renders list of events', () =>{
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render NumberOfEvents', () => {
    var thing = AppDOM.querySelector('#number-of-events');
    console.log("number = " + thing);
    expect(thing).toBeInTheDocument();
  });
});