import { useState } from "react";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        role: "TEACHER"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Registration successful!");
                setFormData({ name: "", email: "", contactNumber: "", role: "TEACHER" });
            } else {
                alert("Registration failed!");
            }
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Contact Number:
                <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Role:
                <select name="role" value={formData.role} onChange={handleChange} required>
                    <option value="TEACHER">Teacher</option>
                    <option value="STUDENT">Student</option>
                </select>
            </label>
            <br />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;