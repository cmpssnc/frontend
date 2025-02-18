import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddCourse.module.css";
import Navbar from "../Navbar.jsx"; // You can create your own CSS styles for this form

const AddCourse = () => {
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const navigate = useNavigate();

    const handleCourseNameChange = (e) => {
        setCourseName(e.target.value);
    };

    const handleCourseDescriptionChange = (e) => {
        setCourseDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the form
        if (!courseName || !courseDescription) {
            alert("Both fields are required");
            return;
        }

        // Create the course object
        const newCourse = {
            courseName,
            courseDescription,
        };

        // Send POST request to the backend to add the course
        fetch("http://localhost:3000/admin/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCourse),
        })
            .then((response) => response.json())
            .then((data) => {
                // Optionally, navigate to the course list page or display success message
                alert("Course added successfully");
                navigate("/admin/courses");  // Redirect to the course list page
            })
            .catch((error) => {
                console.error("Error adding course:", error);
                alert("Failed to add course");
            });
    };

    return (
        <>
            <Navbar />
        <div className={styles.container}>
            <h2 className={styles.heading}>Add New Course</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="courseName">Course Name</label>
                    <input
                        type="text"
                        id="courseName"
                        value={courseName}
                        onChange={handleCourseNameChange}
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="courseDescription">Course Description</label>
                    <textarea
                        id="courseDescription"
                        value={courseDescription}
                        onChange={handleCourseDescriptionChange}
                        className={styles.textarea}
                        required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>Add Course</button>
            </form>
        </div>
            </>
    );
};

export default AddCourse;
