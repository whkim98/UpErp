import moment from 'moment';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

// 스타일링된 캘린더 래퍼
const StyledCalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  line-height: 5rem; /* 숫자의 위아래 간격 조정 */
`;

// 스타일링된 캘린더 컴포넌트
const StyledCalendar = styled(Calendar)`
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 850px;
  margin-right: 50px;
`;

const AddEmployeeHireDate = ({ handleDateChange }) => {
  const [date, setDate] = useState(new Date());

  // 날짜 변경 핸들러
  const onDateChange = (newDate) => {
    setDate(newDate);
    if (handleDateChange) {
      handleDateChange(newDate); // 부모 컴포넌트에 선택된 날짜 전달
    }
  };

  return (
    <div>
      <h1 style={{ marginLeft: '20px', fontSize: '20px' }}>Hire Date</h1>
      <StyledCalendarWrapper>
        <StyledCalendar
          value={date}
          onChange={onDateChange}
          formatDay={(locale, date) => moment(date).format("D")} // 일 숫자만 보이게
          formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션에서 년도만 보이게
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 월과 연도 형식
          calendarType="gregory" // 그레고리력 사용
          showNeighboringMonth={false} // 이웃 월 날짜 숨기기
          next2Label={null} // +1년, +10년 버튼 숨기기
          prev2Label={null} // -1년, -10년 버튼 숨기기
          minDetail="year" // 년 단위만 보기
        />
      </StyledCalendarWrapper>
      <p style={{ marginLeft: '20px' }}>선택날짜: {date.toDateString()}</p>
    </div>
  );
};

export default AddEmployeeHireDate;
