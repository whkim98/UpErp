// Attendance.js
import moment from 'moment';
import React, { useState, } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 import
import styled from 'styled-components'; // styled-components를 사용하는 경우
import '../../CustomCalendar.css'; // 커스터마이즈된 CSS import
import { Box, Button, Divider, List, ListItem, ListItemText, Modal } from '@mui/material';
import axios from 'axios'; // HTTP 요청 라이브러리

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const StyledCalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  const [open, setOpen] = useState(false);
  const [sessionInfo, setSessionInfo] = useState(null);

  const attendanceInsert = () => {
    axios.get('/api/attendanceInsert')
    .then(response => {
        //여기 해야 함@@@@@@
    });
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleOpen = () => {
    fetchSessionInfo();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const fetchSessionInfo = async () => {
    try {
      const response = await axios.get('/api/sessionInfo');
      setSessionInfo(response.data);
    } catch (error) {
      console.error('에러:', error);
      setSessionInfo(null);
    }
  };

  const tileContent = ({ date, view }) => {
    if (moment(date).isSame(moment(), 'day') && view === 'month') {
      return (
        <Button onClick={handleOpen} style={{ color: 'black', fontSize: '20px' }}>출근</Button>
      );
    }
    return null;
  };

  return (
    <Container>
      <StyledCalendarWrapper>
        <StyledCalendar
          value={date}
          onChange={handleDateChange}
          tileContent={tileContent} // 날짜 셀에 콘텐츠 추가
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
      <p style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        선택 날짜: {formatDate(date)}
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
            <Box id="modal-modal-description" sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <List sx={style}>
                  {sessionInfo ? (
                    <>
                      <ListItem>
                        <ListItemText primary={'Name: ' + sessionInfo.last_name + sessionInfo.first_name} />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemText primary={'E-Mail: ' + sessionInfo.email} />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemText primary={'Department: ' + sessionInfo.department} />
                      </ListItem>
                    </>
                  ) : (
                    <ListItem>
                      <ListItemText primary="정보를 불러오는 중입니다." />
                    </ListItem>
                  )}
                  <Divider variant="middle" component="li" />
                  <br/>
                  <Button
                        style={{ border: '1px solid', color: 'black' }}
                        onClick={() => attendanceInsert()}
                    >
                        출근확정
                    </Button>
                </List>
                </Box>
            </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Attendance;
