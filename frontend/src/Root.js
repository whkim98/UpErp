import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import EmployeeManagement from './components/Employee/EmployeeManagement';
import HumanResource from './components/Employee/HumanResource';
import Attendance from './components/Employee/Attendance';
import AddEmployee from './components/Employee/AddEmployee';
import EmployeeD3 from './components/Employee/EmployeeD3';
import ClientManagement from './components/Client/ClientManagement';

const Root = () => {
    return (
        <Router>
            <Main />
            <Routes>
                <Route path="/employee-management" element={<EmployeeManagement />} />
                <Route path='/humanresources' element={<HumanResource/>}/>
                <Route path='/addEmployee' element={<AddEmployee/>}/>
                <Route path='/attendance' element={<Attendance/>}/>
                <Route path='/employeeD3' element={<EmployeeD3/>}/>
                <Route path='client-management' element={<ClientManagement/>}/>
            </Routes>
        </Router>
    );
};

export default Root;
