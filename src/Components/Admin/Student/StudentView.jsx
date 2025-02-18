import "./StudentView.css";
import Navbar from "../Navbar.jsx";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const StudentView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/admin/students/view/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch student details");
                }
                return response.json();
            })
            .then((data) => setStudent(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    const handleEdit = () => {
        navigate(`/admin/edit-student/${id}`);
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        try {
            const response = await fetch(`http://localhost:3000/admin/students/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete student");

            alert("Student deleted successfully");
            navigate("/admin/students");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleBack = () => {
        navigate("/admin/students");
    };

    if (loading) return <p>Loading student details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <>
            <Navbar />

        <div className={"full-page-container"}>
            <div className="student-container">
                <h2 className="student-title">Student Details</h2>


                <div className="student-details">
                    {student.photo && (
                        <img
                            src={`data:image/jpeg;base64,${btoa(
                                String.fromCharCode(...new Uint8Array(student.photo))
                            )}`}
                            alt="Student"
                            className="student-photo"
                        />
                    )}
                    <div className="student-info">
                        <p><strong>Name:</strong> {student.name}</p>
                        <p><strong>Date of Birth:</strong> {student.dob}</p>
                        <p><strong>Contact:</strong> {student.contactNumber}</p>
                        <p><strong>Gender:</strong> {student.gender}</p>
                        <p><strong>Address:</strong> {student.address}</p>
                        <p><strong>Enrolled Course:</strong> {student.enrolledCourseName}</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="student-actions">
                    <button onClick={handleEdit} className="student-btn edit-btn">
                        Edit Student
                    </button>
                    <button onClick={handleDelete} className="student-btn delete-btn">
                        Delete Student
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default StudentView;