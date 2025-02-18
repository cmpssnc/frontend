import "./Students.css";
import Navbar from "../Navbar.jsx";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Students = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("none");
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/admin/courses")
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((err) => console.error("Error fetching courses:", err));
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        setStudents([]);

        try {
            const response = await fetch(
                `http://localhost:3000/admin/students/filter?name=${searchQuery}&course=${selectedCourse !== "none" ? selectedCourse : ""}`
            );
            if (!response.ok) throw new Error("Failed to fetch students");
            const data = await response.json();
            setStudents(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar/>
            <button
                onClick={() => navigate("/admin/register/student")}
                className="btn btn-warning px-4 py-2 rounded"
            >
                Add Student
            </button>
            <div className="container">
                <div className="p-4 w-full max-w-4xl mx-auto">
                    {/* Header & Add Student Button */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Filter Students</h2>
                    </div>

                    {/* Search & Filter */}
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Enter student name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border p-2 flex-1 rounded"
                        />
                        <select
                            name="course"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option value="none">None</option>
                            {courses.map((course) => (
                                <option key={course.courseId} value={course.courseName}>
                                    {course.courseName}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Search
                        </button>
                    </div>

                    {/* Loading/Error Handling */}
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Students Table */}
                    <table className="table table-striped w-full border-collapse border mt-4">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Contact Number</th>
                            <th className="border p-2">Course</th>
                            <th className="border p-2">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <tr key={student.id} className="border">
                                    <td className="border p-2">{student.id}</td>
                                    <td className="border p-2">{student.name}</td>
                                    <td className="border p-2">{student.contactNumber}</td>
                                    <td className="border p-2">{student.courseName}</td>
                                    <td className="border p-2 text-center">
                                        <button
                                            onClick={() => navigate(`/admin/student-view/${student.id}`)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-2 text-center">
                                    No students found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Students;