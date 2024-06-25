import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { UseAuthContext } from "./context/authContext"; // Adjust context import based on how it's exported

const App = () => {
    const { user } = UseAuthContext(); // Assuming useAuthContext returns user state

    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={user ? <Layout><Home /></Layout> : <Navigate to="/signup" />} />


                <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />


                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
