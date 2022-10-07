const SchedulePopup = ({selectedList}) => {
    return (selectedList.length === 0) ? 
        <div>You have not selected any courses. To do so click on a course to add it.</div> :
        <div style={{display: 'flex', flexFlow: 'column'}}>
            {selectedList.map(course => <div style={{whiteSpace: 'break-spaces', marginBottom: '10px'}}>
                {`${course.term} CS ${course.number}: ${course.title}\n @ ${course.meets}`}
            </div>)}
        </div>;
}

export default SchedulePopup;