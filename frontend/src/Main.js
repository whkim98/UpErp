import SearchIcon from '@mui/icons-material/Search';
import { Backdrop, Box, Button, CircularProgress, TextField } from '@mui/material';
import React from 'react';

const Main = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} style={{}}>
        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="With sx" variant="standard" />
        
        <Button style={{color: 'black'}}>인사정보</Button>
        <Button style={{color: 'black'}}>거래처등록</Button>
        <Button style={{color: 'black'}}>품목등록</Button>
        <Button style={{color: 'black'}}>구매입력</Button>
        <Button style={{color: 'black'}}>판매입력</Button>
            {/* <Backdrop
            sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
            <CircularProgress color="inherit" />
            </Backdrop> */}
        </Box>

    );
};

export default Main;