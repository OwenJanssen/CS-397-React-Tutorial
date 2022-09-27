const CourseList = ({courses}) => { 
    return (
    <div>
        { Object.entries(courses).map(([_, course]) => {
            console.log(course);
            return <div>{`${course.term} CS ${course.number}: ${course.title}`}</div>
        }) }
    </div>
);};

export default CourseList;