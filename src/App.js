import React, {useState} from 'react';
import TimekeepingForm from "./components/Timekeeping/TimekeepingForm";
import DataList from './components/DataList/DataList';
import { v4 as uuidv4 } from 'uuid';
import customersData from './__mocks/customersData'
import workingHoursData from './__mocks/workingHoursData';

const App = () => {
  const [workingHours, setWorkingHours] = useState(workingHoursData);

  const updateWorkingHours = (newEntry) => {
    setWorkingHours(prevEntries => {
      const updatedEntries = [...prevEntries];
      updatedEntries.unshift({...newEntry, id: uuidv4() } );
      return updatedEntries;
    });
  }

  return (
    <div className="App">
      <h1>Timetracker</h1>
      <TimekeepingForm onNewWorkingTimeEntry={updateWorkingHours} data={customersData} />
      <h2>Data List - All Entries</h2>
      <DataList data={workingHours} />
    </div>
  );
}

export default App;
