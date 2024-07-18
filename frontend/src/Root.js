import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import EmployeeManagement from './components/Employee/EmployeeManagement';
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
            </Routes>
        </Router>
    );
};

export default Root;
