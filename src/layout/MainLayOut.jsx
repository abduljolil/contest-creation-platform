import { Outlet } from "react-router-dom";
import Footer from './../pages/shared/Footer/Footer';
import Navbar from "../pages/shared/Header/Navbar";

 
 
 const MainLayOut = () => {
    return (
        <div className="space-y-5">
             <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
 };
 
 export default MainLayOut;