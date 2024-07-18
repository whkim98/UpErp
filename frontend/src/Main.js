import SearchIcon from '@mui/icons-material/Search';
import { Backdrop, Box, Button, CircularProgress, TextField } from '@mui/material';
import React from 'react';

const Main = () => {
    return (
        <div>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} style={{}}>
        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="메뉴 검색" variant="standard" />
        
        <Button style={{color: 'black'}}>인사관리</Button>
        <Button style={{color: 'black'}}>거래처관리</Button>
        <Button style={{color: 'black'}}>품목관리</Button>
        <Button style={{color: 'black'}}>구매관리</Button>
        <Button style={{color: 'black'}}>판매관리</Button>
            {/* <Backdrop
            sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
            <CircularProgress color="inherit" />
            </Backdrop> */}
        </Box>
        <hr/>
        </div>
    );
};

export default Main;