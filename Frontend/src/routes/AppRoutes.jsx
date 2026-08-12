import {Routes,Route} from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import Practice from "../pages/Practice";
import Pyqs from "../pages/Pyqs";
import Mocktest from "../pages/Mocktest";
import AI from "../pages/AI";
import Profile from "../pages/Profile";
import Topics from "../pages/Topics";
import NumberofQuestions from "../pages/NumberofQuestions";
import PracticeSetup from "../pages/PracticeSetup";
import Test from "../pages/Test"
import TestResult from "../pages/TestResult";
import Pyqyear from "../pages/Pyqyear";

function Approutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard/>
                </ProtectedRoute>
            }/>
            <Route path="/test" element = {
                <ProtectedRoute>
                    <Test/>
                </ProtectedRoute>
            }/>
            <Route path="/ai" element={<ProtectedRoute>
                    <AI/>
                </ProtectedRoute>}/>
            <Route path="/pyq-years" element={<ProtectedRoute>
                    <Pyqyear/>
                </ProtectedRoute>}/>
            <Route path="/test-result" element={<ProtectedRoute>
                    <TestResult/>
                </ProtectedRoute>}/>
            <Route path="/pyqs" element={<ProtectedRoute>
                    <Pyqs/>
                </ProtectedRoute>}/>
            <Route path="/mocktest" element={<ProtectedRoute>
                    <Mocktest/>
                </ProtectedRoute>}/>
            <Route path="profile" element={<ProtectedRoute>
                    <Profile/>
                </ProtectedRoute>}/>
            <Route path="/practice" element={<ProtectedRoute>
                    <Practice/>
                </ProtectedRoute>}/>
            <Route path="/topics" element={<ProtectedRoute>
                    <Topics/>
                </ProtectedRoute>}/>
            <Route path="/session" element={<ProtectedRoute>
                    <NumberofQuestions/>
                </ProtectedRoute>}/>
            <Route path="/practice/session" element={<ProtectedRoute>
                    <PracticeSetup/>
                </ProtectedRoute>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    )
}

export default Approutes;