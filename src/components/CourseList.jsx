const CourseList = ({courses}) => (
    <div className="course-list">
        { Object.entries(courses).map(([_, course]) => (
            <div className="card m-1 p-2" style={{width: '12rem'}} key={course.number}>
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
            </div>
        ))}
    </div>
);

export default CourseList;