import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactVirtualizedTable from './ReactVirtualizedTable'; // 경로를 맞춰주세요
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HumanResource = () => {

  


  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleNavigation = async(path) => {
    navigate(path);
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees'); // 데이터 가져오기
        console.log('Fetched employees data:', response.data); // 콘솔에 데이터 출력

        // 데이터 형식을 테이블에 맞게 변환
        const formattedData = response.data.map((employee, index) =>
          createData(
            index,
            employee.first_name,
            employee.last_name,
            employee.email,
            employee.phone,
            employee.hire_date,
            employee.job_title,
            employee.department,
            employee.salary
          )
        );
        
        setEmployees(formattedData); // 상태에 데이터 저장
      } catch (error) {
        console.error('에러메세지: ', error); // 콘솔에 에러 출력
        setError(error.message); // 에러 메시지 저장
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchEmployees();
  }, []); // 빈 배열은 컴포넌트가 마운트될 때만 실행됨

  if (loading) return <p>Loading...</p>;
  if (error) return <p>에러메세지: {error}</p>;


  return (
    <div>
        <ReactVirtualizedTable data={employees} />
        <Button style={{color: 'black', border: '1px solid', marginLeft: '15px'}} onClick={() => handleNavigation('/addEmployee')}>Add</Button>
        <Button style={{color: 'black', border: '1px solid', marginLeft: '15px'}} onClick={() => handleNavigation('/employeeD3')}>통계보기</Button>
    </div>
  );
};

// 데이터 생성 함수
function createData(id, first_name, last_name, email, phone, hire_date, job_title, department, salary) {
  return { id, first_name, last_name, email, phone, hire_date, job_title, department, salary };
}

export default HumanResource;
