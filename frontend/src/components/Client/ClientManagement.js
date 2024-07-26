import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import Client from './Client';
import Buy from './Buy';
import Sale from './Sale';

const ClientManagement = () => {

    const [selectedComponent, setSelectedComponent] = useState('client'); 

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
                        style={getButtonStyle('buy')}
                        onClick={() => handleNavigation('buy')}
                    >
                        구매관리
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                        style={getButtonStyle('sale')}
                        onClick={() => handleNavigation('sale')}
                    >
                        판매관리
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                        style={getButtonStyle('client')}
                        onClick={() => handleNavigation('client')}
                    >
                        거래처관리
                    </Button>
                    &nbsp;&nbsp;
                </Box>
            </Box>
            {selectedComponent === 'client' && <Client />}
            {selectedComponent === 'buy' && <Buy />}
            {selectedComponent === 'sale' && <Sale />}
        </div>
    );
};

export default ClientManagement;
