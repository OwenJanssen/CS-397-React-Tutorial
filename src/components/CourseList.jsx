import { useState } from "react";

const CourseList = ({courses}) => {
    const [selectedList, setSelectedList] = useState([]);

    const updateSelectedList = (courseNumber) => {
        if (selectedList.includes(courseNumber)) {
            setSelectedList(lst => lst.push(courseNumber));
        }
        else {
            setSelectedList(lst => lst.filter(cn => cn != courseNumber));
        }
    }
    
    return <div className="course-list">
        { courses.map(([_, course]) => {
            const [backgroundColor, setBackgroundColor] = useState('white');

            const updateSelected = () => {
                setBackgroundColor(backgroundColor === 'white' ? 'deepskyblue' : 'white');
                updateSelectedList(course.number);
            };

            return <div className="card m-1 p-2" style={{width: '12rem', backgroundColor: backgroundColor}} key={course.number} onClick={updateSelected}>
                <div className="card-body" style={{display: 'flex', flexFlow: 'column'}}>
                    <h5 className="card-title">
                        {`${course.term} CS ${course.number}`}
                    </h5>
                    <div className="card-text" style={{flex: '1 1 auto'}}>
                        {course.title}
                    </div>
                    <div className="seperator"/>
                    <div className="card-text">
                        {course.meets}
                    </div>
                </div>
            </div>;
        })}
    </div>
};

export default CourseList;