import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeManagement = () => {
    const navigate = useNavigate();

    const handleNavigation = async (path) => {
            navigate(path);
    };

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }} style={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Button style={{ color: 'black' }} onClick={() => handleNavigation('/humanresources')}>인사관리</Button>
                    <Button style={{ color: 'black' }} >근태관리</Button>
                    <Button style={{ color: 'black' }} >품목관리</Button>
                </Box>
            </Box>
        </div>
    );
};

export default EmployeeManagement;