import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import HumanResource from './HumanResource';
import Attendance from './Attendance';
import Allowance from './Allowance';

const EmployeeManagement = () => {
    const [selectedComponent, setSelectedComponent] = useState('HumanResource'); 

    const handleNavigation = (component) => {
        setSelectedComponent(component);
    };

    const getButtonStyle = (component) => ({
        color: selectedComponent === component ? 'white' : 'black',
        backgroundColor: selectedComponent === component ? 'black' : 'white',
        border: '1px solid black',
    });

    return (
        <div>
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: '100%', 
                    margin: '20px 0' 
                }}
            >
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }}
                >
                    <Button
                        style={getButtonStyle('HumanResource')}
                        onClick={() => handleNavigation('HumanResource')}
                    >
                        인사관리
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                        style={getButtonStyle('Attendance')}
                        onClick={() => handleNavigation('Attendance')}
                    >
                        근태관리
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                        style={getButtonStyle('Allowance')}
                        onClick={() => handleNavigation('Allowance')}
                    >
                        수당관리
                    </Button>
                </Box>
            </Box>
            {selectedComponent === 'HumanResource' && <HumanResource />}
            {selectedComponent === 'Attendance' && <Attendance />}
            {selectedComponent === 'Allowance' && <Allowance />}
        </div>
    );
};

export default EmployeeManagement;
