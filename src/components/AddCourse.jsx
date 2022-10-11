const AddCourse = () => {
    const goBack = (event) => {
        window.location.href = "/";
    }

    return <div className="container">
        <h1 style={{marginTop: "10px"}}>Edit Course</h1>

        <form>
            <div>
                <label style={{marginBottom: "20px", marginRight: "5px"}}>Title:</label>
                <input type="text"/>
            </div>

            <div>
                <label style={{marginBottom: "20px", marginRight: "5px"}}>Meets:</label>
                <input type="text"/>
            </div>
        </form>

        <button className="btn btn-danger" onClick={goBack}>CANCEL</button>
    </div>;
}

export default AddCourse;