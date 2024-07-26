import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputLabel, MenuItem, Select, alpha, styled } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';

// 테이블 열 정의
const columns = [
    { width: 150, label: 'Supplier Name', dataKey: 'supplier_name' }, 
    { width: 150, label: 'Contact Name', dataKey: 'contact_name' }, 
    { width: 150, label: 'Phone', dataKey: 'phone' }, 
    { width: 250, label: 'Email', dataKey: 'email' }, 
    { width: 300, label: 'Address', dataKey: 'address' }, 
];

// 가상화 테이블 구성 요소
const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

// 고정된 헤더 콘텐츠 렌더링
function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric ? 'right' : 'left'}
          style={{ width: column.width, fontWeight: 'bold', fontSize: '1rem' }} 
          sx={{ backgroundColor: 'background.paper', borderBottom: '2px solid #ccc' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

// 행 콘텐츠 렌더링
function rowContent(index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

// 테이블 컴포넌트
export default function ReactVirtualizedTable() {
    const [order, setOrder] = useState('');
    const [tableData, setTableData] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/clientList');
                setTableData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        width: 'auto',
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

    const handleChange = async (event) => {
        const selectedOrder = event.target.value;
        setOrder(selectedOrder);

        try {
            const response = await axios.get('/api/orderby/suppliers', {
                params: { order: selectedOrder }
            });
            console.log('데이터', response.data);
            setTableData(response.data); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', width: '80%', marginBottom: '16px' }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <FormControl style={{ marginLeft: '16px', width: '150px' }}>
                    <InputLabel id="demo-simple-select-label">정렬</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={order}
                        label="정렬"
                        onChange={handleChange}
                    >
                        <MenuItem value={'supplier_name'}>이름순</MenuItem>
                        <MenuItem value={'contact_name'}>담당자순</MenuItem>
                        <MenuItem value={'address'}>주소순</MenuItem>
                    </Select>
                </FormControl>
            </div>
            
            <Paper style={{ height: 400, width: '80%' }}> 
                <TableVirtuoso
                    data={tableData} // 상태로부터 데이터를 전달
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                    style={{ width: '100%' }}
                />
            </Paper>
        </div>
    );
}
