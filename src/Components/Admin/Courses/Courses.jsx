import styles from "./Courses.module.css";
import React, { useEffect, useState } from "react";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/admin/courses")
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error("Error fetching courses:", error));
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Courses List</h2>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Course Name</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {courses.map(course => (
                    <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>{course.courseName}</td>
                        <td>{course.courseDescription}</td>
                        <td>
                            <button className={styles.viewButton} onClick={() => navigate(`/courses/${course.id}`)}>View</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Courses;