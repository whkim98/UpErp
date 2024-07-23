import moment from 'moment';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 import
import styled from 'styled-components'; // styled-components를 사용하는 경우
import '../../CustomCalendar.css'; // 커스터마이즈된 CSS import

// StyledCalendarWrapper와 StyledCalendar 정의
const StyledCalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  line-height: 5rem; /* 숫자의 위아래 간격 조정 */
`;

const StyledCalendar = styled(Calendar)`
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 850px;
  margin-right: 50px;
`;

const Attendance = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <StyledCalendarWrapper>
        <StyledCalendar
          value={date}
          onChange={handleDateChange}
          formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
          formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
          calendarType="gregory" // 일요일 부터 시작
          showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
          next2Label={null} // +1년 & +10년 이동 버튼 숨기기
          prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
          minDetail="year" // 10년단위 년도 숨기기
        />
      </StyledCalendarWrapper>
      <p>선택 날짜: {date.toDateString()}</p>
    </div>
  );
};

export default Attendance;
