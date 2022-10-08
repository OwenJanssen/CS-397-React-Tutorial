const CourseList = ({courses, selectedList, updateSelectedList, conflictsWithSelected}) => {
    return <div className="course-list">
        {courses.map(([_, course]) => {
            const bg = selectedList.includes(course) ? 'deepskyblue' : conflictsWithSelected(course) ? 'indianred' : 'white';
            
            return <div className="card m-1 p-2" style={{width: '12rem', backgroundColor: bg}} 
                                            key={course.number} onClick={() => updateSelectedList(course)}>
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
            </div>})}
        </div>;};

export default CourseList;