import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Admin/Dashboard.jsx";
import Students from "./Components/Admin/Student/Students.jsx";
import RegisterStudent from "./Components/Admin/Student/RegisterStudent.jsx";
import StudentView from "./Components/Admin/Student/StudentView.jsx";
import EditStudent from "./Components/Admin/Student/EditStudent.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/students" element={<Students />} />
                <Route path="/admin/register/student" element={<RegisterStudent />} />
                <Route path="/admin/student-view/:id" element={<StudentView />} />
                <Route path="/admin/edit-student/:id" element={<EditStudent />} />



            </Routes>
        </Router>
    );
}

export default App;
