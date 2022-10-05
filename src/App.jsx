import Banner from "./components/Banner.jsx";
import CourseList from "./components/CourseList.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import { useState } from "react";

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
  const [schedule, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading schedule data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading schedule data...</h1>;
  if (!schedule) return <h1>No schedule data found</h1>;

  const updateSelectedList = (course) => setSelectedCoursesList(
    selectedCoursesList.includes(course) ? selectedCoursesList.filter(c => c !== course) : [...selectedCoursesList, course]);

  return <div className="container">
    <Banner text={schedule.title}/>
    <QuarterSelector selection={quarterSelection} setSelection={setQuarterSelection}/>
    <CourseList courses={Object.entries(schedule.courses).filter(([_, c]) => c.term===quarterSelection)} 
                selectedList={selectedCoursesList} updateSelectedList={updateSelectedList}/>
  </div>;
};

const App = () => (
  <div className="container">
    <QueryClientProvider client={queryClient}>
      <Main/>
    </QueryClientProvider>
  </div>
);

export default App;
