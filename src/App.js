import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import Event from './components/Event';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import './App.css';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';


const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [infoAlert, setInfoAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [warningAlert, setWarningAlert] = useState('');
  

  useEffect(() => {
    if (navigator.onLine) {
        setWarningAlert('');
      } else {
        setWarningAlert('App is currently running in offline mode');
      }
      fetchData();
    }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === 'See all cities' ?
    allEvents : allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
};

  return (
    <div className="App">
      <div className='alerts-container'>
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null }
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null }
        {errorAlert.length ? <WarningAlert text={warningAlert} /> : null }
      </div>
      < CitySearch 
          allLocations={allLocations} 
          setCurrentCity={setCurrentCity}
          setInfoAlert={setInfoAlert}/>
      < NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert}/>
      <div className='charts-container'>
        < EventGenresChart events={events} />
        < CityEventsChart allLocations={allLocations} events={events} />
      </div>
      < EventList events={events} />
    </div>
  );
};
export default App;
