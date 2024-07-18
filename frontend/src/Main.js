import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Box, Button, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AccountCircle } from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Main = () => {

    //로그인 체크로 데이터 보내기
    const [email, setEmail] = useState('');
    const [employee_pw, setEmployee_pw] = useState('');

    const loginCheck = async () => {
        try {
            const response = await axios.post('/loginCheck', { email, employee_pw });
            if (response.data.success) {
                console.log('Login successful');
                handleClose();
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    const mvPage = (path) => {
        navigate(path);
    }

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }} style={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Button style={{ color: 'black' }} onClick={() => mvPage('/employee-management')}>인사관리</Button>
                    <Button style={{ color: 'black' }} onClick={() => mvPage('/client-management')}>거래처관리</Button>
                    <Button style={{ color: 'black' }} onClick={() => mvPage('/item-management')}>품목관리</Button>
                    <Button style={{ color: 'black' }} onClick={() => mvPage('/purchase-management')}>구매관리</Button>
                    <Button style={{ color: 'black' }} onClick={() => mvPage('/sales-management')}>판매관리</Button>
                </Box>

                <Box>
                    <Stack direction="row" spacing={2} style={{marginRight: '20px', marginTop: '5px'}}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>

                        {/* 모달로 로그인 */}
                        <Button onClick={handleOpen} style={{border: '1px solid', color: 'black'}}>Login</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description">
                                <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Login
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField id="input-with-sx" label="E-MAIL" variant="standard"
                                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField id="input-with-sx" label="PASSWORD" variant="standard"
                                    value={employee_pw} onChange={(e) => setEmployee_pw(e.target.value)}/>
                                </Box>

                                <br/>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Button style={{border: '1px solid', width: '15px', color: 'black'}}
                                    onClick={loginCheck}>제출</Button>
                                </Box>
                                </Typography>
                                </Box>
                            </Modal>

                    </Stack>
                </Box>
            </Box>
            <hr />
        </div>
    );
};

export default Main;
