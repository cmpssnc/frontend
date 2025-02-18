import "./EditStudent.css";
import Navbar from "../Navbar.jsx";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {
    const { id } = useParams(); // Get student ID from URL
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        name: "",
        dob: "",
        contactNumber: "",
        gender: "MALE",
        address: "",
        enrolledCourseId: "",
    });

    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch student details
    useEffect(() => {
        fetch(`http://localhost:3000/admin/students/view/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setStudent({
                    name: data.name,
                    dob: data.dob,
                    contactNumber: data.contactNumber,
                    gender: data.gender,
                    address: data.address,
                    enrolledCourseId: "", // Default to empty; updated when courses load
                });
            })
            .catch(() => setError("Failed to fetch student details"));
    }, [id]);

    // Fetch courses for dropdown
    useEffect(() => {
        fetch("http://localhost:3000/admin/courses")
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch(() => console.error("Error fetching courses"));
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`http://localhost:3000/admin/students/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(student),
            });

            if (!response.ok) throw new Error("Failed to update student.");
            setSuccess("Student updated successfully!");

            // Redirect after update
            setTimeout(() => navigate("/admin/students"), 2000);
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <>
            <Navbar />
        <div className="edit-student-container">
            <div className="edit-student-form">
                <h2 className="edit-student-title">Edit Student</h2>

                {error && <p className="error-msg">{error}</p>}
                {success && <p className="success-msg">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" value={student.name}
                           onChange={handleChange} className="edit-input" required />

                    <input type="date" name="dob" value={student.dob}
                           onChange={handleChange} className="edit-input" required />

                    <input type="text" name="contactNumber" value={student.contactNumber}
                           onChange={handleChange} className="edit-input" required />

                    <select name="gender" value={student.gender}
                            onChange={handleChange} className="edit-select" required>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>

                    <textarea name="address" value={student.address}
                              onChange={handleChange} className="edit-textarea" required></textarea>

                    <select name="enrolledCourseId" value={student.enrolledCourseId}
                            onChange={handleChange} className="edit-select" required>
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course.courseId} value={course.courseId}>
                                {course.courseName}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="edit-btn save-btn">Update Student</button>
                </form>

                <button onClick={() => navigate(`/admin/student-view/${id}`)} className="edit-btn cancel-btn">
                    Back
                </button>
            </div>
        </div>
        </>
    );

};

export default EditStudent;