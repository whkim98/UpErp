import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HumanResource = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees'); // 데이터 가져오기
        console.log('Fetched employees data:', response.data); // 콘솔에 데이터 출력
        setEmployees(response.data); // 상태에 데이터 저장
      } catch (error) {
        console.error('Error fetching employees:', error); // 콘솔에 에러 출력
        setError(error.message); // 에러 메시지 저장
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchEmployees();
  }, []); // 빈 배열은 컴포넌트가 마운트될 때만 실행됨

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Employee List</h1>
      {employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <li key={employee.employee_id}>
              {employee.email} - {employee.employee_pw} - {employee.last_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HumanResource;
