import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await API.post("/auth/logout");
        navigate("/");
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
                <h1 className="text-xl font-bold text-indigo-600">
                    FinanceTracker
                </h1>

                <div className="space-x-6">
                    <Link to="/dashboard" className="hover:text-indigo-600">
                        Dashboard
                    </Link>

                    <Link to="/transactions" className="hover:text-indigo-600">
                        Transactions
                    </Link>
                    <Link to="/budget" className="hover:text-indigo-600">
                        Budget
                    </Link>


                    <button
                        onClick={handleLogout}
                        className="text-red-500 hover:text-red-700"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
