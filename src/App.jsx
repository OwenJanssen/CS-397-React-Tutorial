import Banner from "./components/Banner.jsx";
import CourseList from "./components/CourseList.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';

const queryClient = new QueryClient();

const Main = () => {
  const [schedule, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading schedule data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading schedule data...</h1>;
  if (!schedule) return <h1>No schedule data found</h1>;

  return <div className="container">
      <Banner text={schedule.title}/>
      <CourseList courses={schedule.courses}/>
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
