import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./ViewCourse.module.css"; // Add styles for the subject list
import Navbar from "../Navbar.jsx";

const Subjects = () => {
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();

    const location = useLocation();

    // Access the query parameters from the location object
    const queryParams = new URLSearchParams(location.search);
    const courseName = queryParams.get("name");

    useEffect(() => {
        // Fetch all subjects and associated teacher
        fetch("/admin/subjects/all")
            .then((response) => response.json())
            .then((data) => setSubjects(data))
            .catch((error) => console.error("Error fetching subjects:", error));
    }, []);

    const handleAddSubject = () => {
        // Navigate to the Add Subject page
        navigate("/add-subject");
    };

    const handleViewStudents = (courseId) => {
        // Navigate to the student list page for the course
        navigate(`/course/${courseId}/students`);
    };

    return (
        <>
            <Navbar />
            <h1>{courseName}</h1>
            <div className={styles.container}>
                <div className={styles.buttonsContainer}>
                    <button className={styles.addButton} onClick={handleAddSubject}>
                        Add Subject
                    </button>
                    <button className={styles.viewButton} onClick={() => handleViewStudents()}>
                        View All Students
                    </button>
                </div>

                <h2 className={styles.heading}>Subjects List</h2>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Subject Name</th>
                        <th>Teacher</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {subjects.map((subject) => (
                        <tr key={subject.id}>
                            <td>{subject.id}</td>
                            <td>{subject.subjectName}</td>
                            <td>{subject.teacherName}</td>
                            <td>
                                <button
                                    className={styles.viewButton}
                                    onClick={() => navigate(`/subjects/${subject.id}`)}
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Subjects;