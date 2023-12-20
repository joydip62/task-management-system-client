import { Outlet } from "react-router-dom";
import Footer from "../pages/Shares/Footer/Footer";
import Navbar from "../pages/Shares/Navbar/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar/>
            <Outlet />
            <Footer/>
        </div>
    );
};

export default Main;