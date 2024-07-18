import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

const Main = () => {
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
            // vertical padding + font size from searchIcon
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

                    <Button style={{ color: 'black' }}>인사관리</Button>
                    <Button style={{ color: 'black' }}>거래처관리</Button>
                    <Button style={{ color: 'black' }}>품목관리</Button>
                    <Button style={{ color: 'black' }}>구매관리</Button>
                    <Button style={{ color: 'black' }}>판매관리</Button>
                </Box>

                <Box>
                    <Stack direction="row" spacing={2} style={{marginRight: '20px', marginTop: '5px'}}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                    </Stack>
                </Box>
            </Box>
            <hr />
        </div>
    );
};

export default Main;
