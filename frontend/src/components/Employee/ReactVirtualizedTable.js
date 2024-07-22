import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

// 테이블 열 정의
const columns = [
  { width: 150, label: 'First Name', dataKey: 'first_name' },
  { width: 150, label: 'Last Name', dataKey: 'last_name' },
  { width: 200, label: 'Email', dataKey: 'email' },
  { width: 150, label: 'Phone', dataKey: 'phone' },
  { width: 150, label: 'Hire Date', dataKey: 'hire_date' },
  { width: 150, label: 'Job Title', dataKey: 'job_title' },
  { width: 150, label: 'Department', dataKey: 'department' },
  { width: 120, label: 'Salary', dataKey: 'salary', numeric: true },
];

// 데이터 생성 함수
function createData(id, first_name, last_name, email, phone, hire_date, job_title, department, salary) {
  return { id, first_name, last_name, email, phone, hire_date, job_title, department, salary };
}

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
          style={{ width: column.width }}
          sx={{ backgroundColor: 'background.paper' }}
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
export default function ReactVirtualizedTable({ data }) {
  return (
    <Paper style={{ height: 600, width: '100%' }}>
      <TableVirtuoso
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
