import styles from "./Courses.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar.jsx";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/admin/courses")
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error("Error fetching courses:", error));
    }, []);

    const handleAddCourse = () => {
        // You can navigate to the "Add Course" page or show a form/modal here
        navigate("/admin/add-course");
    };

    return (
        <>
            <Navbar/>
            <button className={styles.addButton} onClick={handleAddCourse}>
                Add Course
            </button>
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
                        <tr key={course.courseId}>
                            <td>{course.courseId}</td>
                            <td>{course.courseName}</td>
                            <td>{course.courseDescription}</td>
                            <td>
                                <button
                                    className={styles.viewButton}
                                    onClick={() => navigate(`./${course.courseId}?name=${course.courseName}`)}
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

export default Courses;
