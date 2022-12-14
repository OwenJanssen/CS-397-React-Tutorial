import {useState} from 'react';
import { useDbUpdate } from "../utilities/firebase";

const AddCourse = (props) => {
    const [update, result] = useDbUpdate("/courses/"+props.id);
    const [title, setTitle] = useState("");
    const [meetingTime, setMeetingTime] = useState("");

    const updateTitle = (event) => {
        setTitle(event.target.value);
    };

    const updateMeetingTime = (event) => {
        setMeetingTime(event.target.value);
    };

    const goBack = (event) => {
        window.location.href = "/";
    };

    const titleInvalid = () => {
        return title.length < 2;
    };

    const meetingTimeInvalid = () => {
        const re = /([M|W|F|Th|Tu]+)\s(\d+):(\d\d)-(\d+):(\d\d)/;
        return meetingTime.length > 0 && !re.test(meetingTime);
    }

    const canSubmit = () => {
        return !titleInvalid() && !meetingTimeInvalid();
    }

    const submit = (evt) => {
        evt.preventDefault();
        if (canSubmit()) {
            update({
                [props.id]: {
                "meets": meetingTime,
                "title": title
                }
            });
            goBack();
        }
    };

    return <div className="container">
        <h1 style={{marginTop: "10px"}}>Edit Course</h1>

        <form onSubmit={submit}>
            <div>
                <label style={{marginBottom: "20px", marginRight: "5px"}}>Title:</label>
                <input type="text" value={title} onChange={updateTitle}/>
                {titleInvalid() && <div style={{marginBottom: "20px", background: 'red', width: 'fit-content', whiteSpace: 'pre'}}> Course title must be at least 2 characters long </div>}
            </div>

            <div>
                <label style={{marginBottom: "20px", marginRight: "5px"}}>Meets:</label>
                <input type="text" value={meetingTime} onChange={updateMeetingTime}/>
                {meetingTimeInvalid() && <div style={{marginBottom: "20px", background: 'red', width: 'fit-content', whiteSpace: 'pre'}}> Meeting time must contain days and start-end, e.g., MWF 12:00-13:20 </div>}
            </div>

            <button className={canSubmit() ? "btn btn-success" : "btn btn-danger"} style={{marginBottom: "10px"}}>SUBMIT</button>
        </form>

        <button className="btn btn-danger" onClick={goBack}>CANCEL</button>
    </div>;
}

export default AddCourse;