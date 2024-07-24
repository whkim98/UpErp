import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation 임포트
import axios from 'axios';
import { Box, Button, TextField, Modal, Typography, Avatar, Stack } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import MainContent from './MainContent';

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
    const [email, setEmail] = useState('');
    const [employee_pw, setEmployee_pw] = useState('');
    const [employee, setEmployee] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation(); // 현재 위치 정보 가져오기

    // 로그인 체크
    const loginCheck = async () => {
        try {
            const response = await axios.post('/api/loginCheck', { email, employee_pw });
            if (response.data.success) {
                console.log('Login successful');
                alert(`로그인되었습니다.`);
                setEmployee(response.data.employee);
                setIsLoggedIn(true); // 로그인 상태 업데이트
                handleClose();
            } else {
                console.log('Login failed');
                alert('ID 또는 PW가 일치하지 않습니다.');
                setEmployee_pw('');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('ID 또는 PW가 일치하지 않습니다.');
            setEmployee_pw('');
        }
    };

    // 로그아웃
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/logout');
            if (response.data.success) {
                console.log('Logout successful');
                setEmployee(null);
                setIsLoggedIn(false); // 로그아웃 상태 업데이트
                alert('로그아웃되었습니다.');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            alert('로그아웃 실패');
        }
    };

    // 세션 상태 확인
    const checkSession = async () => {
        try {
            const response = await axios.get('/api/currentUser');
            if (response.data.success) {
                setEmployee(response.data.user);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error checking session:', error);
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        checkSession(); // 컴포넌트가 마운트될 때 세션 상태 확인
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // 버튼 클릭 시 페이지 이동 처리
    const handleNavigation = async (path) => {
        if (isLoggedIn) {
            navigate(path);
        } else {
            alert('로그인 후 이용해 주세요.');
        }
    };

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
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            marginLeft: '10px'
                        }}
                    >
                        UpERP
                    </Typography>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Button style={{ color: 'black' }} onClick={() => handleNavigation('/employee-management')}>인사관리</Button>
                    <Button style={{ color: 'black' }} onClick={() => handleNavigation('/client-management')}>거래처관리</Button>
                    <Button style={{ color: 'black' }} onClick={() => handleNavigation('/item-management')}>품목관리</Button>
                    <Button style={{ color: 'black' }} onClick={() => handleNavigation('/purchase-management')}>구매관리</Button>
                    <Button style={{ color: 'black' }} onClick={() => handleNavigation('/sales-management')}>판매관리</Button>
                    <Button style={{ color: 'black' }} onClick={() => handleNavigation('/sales-management')}>공지사항</Button>
                </Box>

                <Box>
                    <Stack direction="row" spacing={2} style={{ marginRight: '20px', marginTop: '5px' }}>
                        <Avatar alt={employee ? employee.last_name : ""} src="/static/images/avatar/1.jpg" />
                        {isLoggedIn ? (
                            <Button onClick={handleLogout} style={{ border: '1px solid', color: 'black' }}>Logout</Button>
                        ) : (
                            <Button onClick={handleOpen} style={{ border: '1px solid', color: 'black' }}>Login</Button>
                        )}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Login
                                </Typography>
                                <Box id="modal-modal-description" sx={{ mt: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            id="input-with-sx"
                                            label="E-MAIL"
                                            variant="standard"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
                                        <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            id="input-with-sx"
                                            label="PASSWORD"
                                            variant="standard"
                                            type="password"
                                            value={employee_pw}
                                            onChange={(e) => setEmployee_pw(e.target.value)}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                        <Button
                                            style={{ border: '1px solid', color: 'black' }}
                                            onClick={loginCheck}
                                        >
                                            제출
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Modal>
                    </Stack>
                </Box>
            </Box>
            <hr />
            {location.pathname === '/' && <MainContent />} {/* 현재 경로가 루트('/')일 때만 MainContent 표시 */}
        </div>
    );
};

export default Main;
