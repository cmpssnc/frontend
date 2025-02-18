import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const AdminDashboard = () => {
    const navigate = useNavigate();

    // post request to the /auth/logout rest endpoint
    function logout() {

    }

    return (
        <>
            <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            {/* Header */}
            <div className="w-full flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
                <h1 className="text-3xl font-bold">Welcome Admin</h1>
            </div>
        </div>
            </>
    );
};

export default AdminDashboard;