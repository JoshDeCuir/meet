import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import Event from './components/Event';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import './App.css';


const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  
  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === 'See all cities' ?
    allEvents : allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
};

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      < CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity}/>
      < NumberOfEvents setCurrentNOE={setCurrentNOE} />
      < EventList events={events} />
      < Event />
    </div>
  );
};
export default App;