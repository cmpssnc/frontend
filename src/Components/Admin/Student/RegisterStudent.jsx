import React, { useState, useEffect } from "react";
import "./StudentRegistration.css";
import Navbar from "../Navbar.jsx";

const StudentRegistration = () => {
    const [student, setStudent] = useState({
        name: "",
        email: "",
        contactNumber: "",
        dateOfBirth: "",
        gender: "MALE",
        address: "",
        enrolledCourseId: "",
        role: "ROLE_STUDENT",
        photo: null,
    });

    const [courses, setCourses] = useState([]);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch courses for dropdown
    useEffect(() => {
        fetch("http://localhost:3000/admin/courses")
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((err) => {
                console.error("Error fetching courses:", err);
                setError("Could not load courses.");
            });
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    // Handle photo upload with size restriction
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 1024 * 1024) {
            setError("File size must be under 1MB.");
            return;
        }
        setError(null);
        setStudent({ ...student, photo: file });

        // Preview image
        const reader = new FileReader();
        reader.onloadend = () => setPhotoPreview(reader.result);
        reader.readAsDataURL(file);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const formData = new FormData();

        // Convert student object to JSON string and append it as a separate part
        formData.append(
            "student",
            new Blob([JSON.stringify({ ...student, photo: undefined })], { type: "application/json" })
        );

        // Append the photo file if uploaded
        if (student.photo) {
            formData.append("photo", student.photo);
        }

        try {
            const response = await fetch("http://localhost:3000/admin/register/student", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error(await response.text());
            setSuccess("Student registered successfully!");
            setStudent({
                name: "",
                email: "",
                contactNumber: "",
                dateOfBirth: "",
                gender: "MALE",
                address: "",
                enrolledCourseId: "",
                role: "ROLE_STUDENT",
                photo: null,
            });
            setPhotoPreview(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="student-registration">
                <h2>Register Student</h2>

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={student.name}
                        onChange={handleChange}
                        required
                    />

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={student.email}
                        onChange={handleChange}
                        required
                    />

                    {/* Contact Number */}
                    <input
                        type="text"
                        name="contactNumber"
                        placeholder="Contact Number"
                        value={student.contactNumber}
                        onChange={handleChange}
                        required
                    />

                    {/* Date of Birth */}
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={student.dateOfBirth}
                        onChange={handleChange}
                        required
                    />

                    {/* Gender Dropdown */}
                    <select
                        name="gender"
                        value={student.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>

                    {/* Address */}
                    <textarea
                        name="address"
                        placeholder="Address"
                        value={student.address}
                        onChange={handleChange}
                        required
                    ></textarea>

                    {/* Course Dropdown */}
                    <select
                        name="enrolledCourseId"
                        onChange={handleChange}
                        required
                    >
                        <option value="">{courses.length === 0 ? "Loading courses..." : "Select Course"}</option>
                        {courses.map((course) => (
                            <option key={course.courseId} value={course.courseId}>
                                {course.courseName}
                            </option>
                        ))}
                    </select>

                    {/* Photo Upload */}
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                        />
                        {photoPreview && (
                            <img
                                src={photoPreview}
                                alt="Preview"
                                className="photo-preview"
                            />
                        )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit">Register Student</button>
                </form>
            </div>
        </>
    );
};

export default StudentRegistration;
