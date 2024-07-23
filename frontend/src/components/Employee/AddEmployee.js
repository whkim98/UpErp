import { AccountCircle } from '@mui/icons-material';
import { Autocomplete, Box, TextField } from '@mui/material';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import React from 'react';
import AddEmployeeHireDate from './AddEmployeeHireDate';

const AddEmployee = () => {
    const defaultProps = {
        options: top100Films,
        getOptionLabel: (option) => option.title,
      };

    const emailProps = {
        options: email,
        getOptionLabel: (option) => option.title,
    }

      
    return (
        <div>
            <table style={{width: '500px', marginLeft: '20px'}}>
                <tr>
                    <td>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <CorporateFareIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
                            <Autocomplete
                                {...defaultProps}
                                id="disable-close-on-select"
                                disableCloseOnSelect
                                renderInput={(params) => (
                                <TextField {...params} label="부서" variant="standard" style={{width: '150px'}}/>
                                )}
                            />
                        </Box>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" label="First Name" variant="standard" />
                            &nbsp;&nbsp;&nbsp;
                            <TextField id="input-with-sx" label="Last Name" variant="standard" />
                        </Box>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" label="E-Mail" variant="standard" style={{width: '100px'}}/>
                            @
                            <Autocomplete
                                {...emailProps}
                                id="disable-close-on-select"
                                disableCloseOnSelect
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
                            <TextField id="input-with-sx" label="Phone Number(Except - )" variant="standard" style={{width: '347px'}}/>
                        </Box>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <WorkOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" label="Job_Title" variant="standard" style={{width: '347px'}}/>
                        </Box>
                    </td>
                </tr>
            </table>
            <div style={{display: 'flex'}}>
                <AddEmployeeHireDate/>
            </div>
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