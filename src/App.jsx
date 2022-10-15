import Banner from "./components/Banner.jsx";
import CourseList from "./components/CourseList.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import { useState } from "react";
import Modal from './components/Modal';
import { Button } from "bootstrap";
import SchedulePopup from "./components/SchedulePopup.jsx";
import AddCourse from "./components/AddCourse.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDbData } from "./utilities/firebase.js";

const quarters = {
  Fall: 'Fall',
  Winter: 'Winter',
  Spring: 'Spring'
};
const queryClient = new QueryClient();

const QuarterButton = ({quarter, selection, setSelection}) => (
  <div>
    <input type="radio" id={quarter} className="btn-check" checked={quarter === selection} autoComplete="off"
      onChange={() => setSelection(quarter)} />
    <label className="btn btn-success mb-1 p-2" htmlFor={quarter} style={{margin: 4, width: 75}}>
      { quarter }
    </label>
  </div>
);

const QuarterSelector = ({selection, setSelection}) => (
  <div className="btn-group">
    { 
      Object.keys(quarters).map(q => <QuarterButton key={q} quarter={q} selection={selection} setSelection={setSelection} />)
    }
  </div>
);

const Main = () => {
  const [quarterSelection, setQuarterSelection] = useState(() => Object.keys(quarters)[0]);
  const [selectedCoursesList, setSelectedCoursesList] = useState([]);
  const [showSchedulePopup, setShowSchedulePopup] = useState(false);
  const [schedule, error] = useDbData('/');

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (schedule === undefined) return <h1>Loading data...</h1>;
  if (!schedule) return <h1>No data found</h1>;
  
  const openSchedulePopup = () => setShowSchedulePopup(true);
  const closeSchedulePopup = () => setShowSchedulePopup(false);
  const updateSelectedList = (course) => setSelectedCoursesList(
    (selectedCoursesList.includes(course) ? 
      selectedCoursesList.filter(c => c !== course) : conflictsWithSelected(course) ? 
        selectedCoursesList : [...selectedCoursesList, course]));
  
  const isThereTimeConflict = (a, b) => {
    if (a === b) { return false; }
    if (a.term !== b.term) { return false; }

    const aMeets = a.meets;
    const bMeets = b.meets;

    const aDaysOfTheWeek = aMeets.split(' ')[0].split(/(?=[A-Z])/);
    const bDaysOfTheWeek = bMeets.split(' ')[0].split(/(?=[A-Z])/);

    if (aDaysOfTheWeek.filter(x => bDaysOfTheWeek.indexOf(x) !== -1).length === 0) { return false; }

    const aTimes = aMeets.split(' ')[1].split('-').map(time => time.split(':'));
    const aStart = parseInt(aTimes[0][0]) + parseInt(aTimes[0][1])/60;
    const aEnd = parseInt(aTimes[1][0]) + parseInt(aTimes[1][1])/60;

    const bTimes = bMeets.split(' ')[1].split('-').map(time => time.split(':'));
    const bStart = parseInt(bTimes[0][0]) + parseInt(bTimes[0][1])/60;
    const bEnd = parseInt(bTimes[1][0]) + parseInt(bTimes[1][1])/60;

    if (aEnd < bStart || bEnd < aStart) { return false; }

    return true;
  }

  const conflictsWithSelected = (course) => {
    return selectedCoursesList.filter(selectedCourse => isThereTimeConflict(course, selectedCourse)).length > 0;
  }

  return <div className="container">
    <Banner text={schedule.title}/>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <QuarterSelector selection={quarterSelection} setSelection={setQuarterSelection}/>
      <button className="btn btn-outline-dark" onClick={openSchedulePopup} style={{marginBottom: '4px'}}>
        Show Schedule
      </button>
    </div>
    <Modal open={showSchedulePopup} close={closeSchedulePopup}>
      <SchedulePopup selectedList={selectedCoursesList}/>
    </Modal>
    <CourseList courses={Object.entries(schedule.courses).filter(([_, c]) => c.term===quarterSelection)} 
                selectedList={selectedCoursesList} updateSelectedList={updateSelectedList} conflictsWithSelected={conflictsWithSelected}/>
  </div>;
};

const App = () => (
  <div className="container">
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Main/>
          }/>

          <Route path="/addCourse" element={
            <AddCourse />
          } />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </div>
);

export default App;
