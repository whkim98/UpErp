import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import EmployeeManagement from './components/Employee/EmployeeManagement';
import LoginForm from './components/Login/LoginForm';
import HumanResource from './components/Employee/HumanResource';
import Attendance from './components/Employee/Attendance';
import AddEmployee from './components/Employee/AddEmployee';
import Allowance from './components/Employee/Allowance';
// import EmployeeManagement from './EmployeeManagement';
// import ClientManagement from './ClientManagement';
// import ItemManagement from './ItemManagement';
// import PurchaseManagement from './PurchaseManagement';
// import SalesManagement from './SalesManagement';

const Root = () => {
    return (
        <Router>
            <Main />
            <Routes>
                <Route path="/employee-management" element={<EmployeeManagement />} />
                {/* <Route path="/client-management" element={<ClientManagement />} />
                <Route path="/item-management" element={<ItemManagement />} />
                <Route path="/purchase-management" element={<PurchaseManagement />} />
                <Route path="/sales-management" element={<SalesManagement />} /> */}
                <Route path="/loginform" element={<LoginForm/>}/>
                <Route path='/humanresources' element={<HumanResource/>}/>
                <Route path='/addEmployee' element={<AddEmployee/>}/>
                <Route path='/attendance' element={<Attendance/>}/>
                <Route path='/Allowance' element={<Allowance/>}/>
            </Routes>
        </Router>
    );
};

export default Root;
