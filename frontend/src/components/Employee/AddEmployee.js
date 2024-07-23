import React, { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { useNavigate } from 'react-router-dom';
import AddEmployeeHireDate from './AddEmployeeHireDate';
import axios from 'axios';

const AddEmployee = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        department: '',
        email: '',
        phoneNumber: '',
        jobTitle: '',
        hireDate: new Date(),
    });

    const defaultProps = {
        options: top100Films,
        getOptionLabel: (option) => option.title,
    };

    const emailProps = {
        options: email,
        getOptionLabel: (option) => option.title,
    };

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, hireDate: date });
    };

    const handleSubmit = () => {
        axios.post('/addEmployee', formData)
            .then(response => {
                console.log(response.data);
                navigate(-1);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div>
            <h1 style={{marginLeft: '20px'}}>Add Employee</h1>
            <table style={{width: '500px', marginLeft: '20px'}}>
                <tr>
                    <td>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <CorporateFareIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
                            <Autocomplete
                                {...defaultProps}
                                id="department"
                                disableCloseOnSelect
                                onChange={(event, newValue) => setFormData({ ...formData, department: newValue?.title || '' })}
                                renderInput={(params) => (
                                <TextField {...params} label="Department" variant="standard" style={{width: '150px'}}/>
                                )}
                            />
                        </Box>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="firstName" label="First Name" variant="standard" onChange={handleInputChange} />
                            &nbsp;&nbsp;&nbsp;
                            <TextField id="lastName" label="Last Name" variant="standard" onChange={handleInputChange} />
                        </Box>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="email" label="E-Mail" variant="standard" style={{width: '100px'}} onChange={handleInputChange} />
                            @
                            <Autocomplete
                                {...emailProps}
                                id="emailDomain"
                                disableCloseOnSelect
                                onChange={(event, newValue) => setFormData({ ...formData, email: formData.email + '@' + (newValue?.title || '') })}
                                renderInput={(params) => (
                                <TextField {...params} variant="standard" label="Domain" style={{width: '234px'}}/>
                                )}
                            />
                        </Box>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <PhoneIphoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="phoneNumber" label="Phone Number(Except - )" variant="standard" style={{width: '347px'}} onChange={handleInputChange} />
                        </Box>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <WorkOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="jobTitle" label="Job Title" variant="standard" style={{width: '347px'}} onChange={handleInputChange} />
                        </Box>
                    </td>
                </tr>
            </table>
            <div style={{display: 'flex'}}>
                <AddEmployeeHireDate handleDateChange={handleDateChange} />
            </div>
            <Button style={{ color: 'black', marginLeft: '15px', marginBottom: '20px', border: '1px solid' }} onClick={handleSubmit}>
                SUBMIT
            </Button>
            <Button style={{ color: 'black', marginLeft: '15px', marginBottom: '20px', border: '1px solid' }} onClick={() => navigate(-1)}>
                BACK
            </Button>
        </div>
    );
};

const top100Films = [
    { title: '개발팀' },
    { title: '재무팀' },
    { title: '인사팀' },
    { title: '물류팀' },
]

const email = [
    { title: 'daum.net'},
    { title: 'naver.com'},
    { title: 'google.com'},
    { title: 'hanmail.net'},
]

export default AddEmployee;
