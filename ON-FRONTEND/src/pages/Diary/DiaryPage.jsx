import React, { useState, useRef } from 'react';
import BottomTabNav from '../../components/BottomTabNav/BottomTabNav';
import DiaryCalendar from '../../components/DiaryCalendar/DiaryCalendar';
import PageHeader from '../../components/PageHeader/PageHeader';
import DailyDiary from "../../components/DailyDiary";

import styled from 'styled-components';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DiaryPage.css';
import plus_button from '../../assets/images/addButton.svg';

const diaries = [
  { 
    content: '드디어 영국 도착했다!! 비행기 경유하느라 힘들었지만 그래도 캠퍼스를 실제로 보니깐 설렌다!! 기숙사 떨어졌지만 기숙사 배정 받았으면 맨날 학교 구경하고 좋았을 것 같다ㅜㅜ 그래도 지금 방도 학교 15분 거리라 학교 구경 많이많이 해야지 ㅎㅎ ',
    date: '2024.07.31',
    dday: 'D+1',
  },
  { 
    content: '지금은 드디어 출국하러 인천공항으로 가고 있다! 이제 진짜 교환 생활 시작이라닛 좋은 경험 많이 쌓고, 행복하게 후회 없이 하고 싶은 거 다 하고 오자!! 우선 두바이 경유할 때 한눈 팔지 말고 정신 잘 차리기!',
    date: '2024.07.30',
    dday: 'D-Day',
  },
];

const Diary = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [newDiaryVisible, setNewDiaryVisible] = useState(false);
  const datePickerRef = useRef(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCalendarOpen(false); // 날짜 선택 후 달력 닫기
  };

  const handleDateClick = () => {
    setCalendarOpen(!calendarOpen); // 달력 열기/닫기 토글
  };

  const handleAddDiaryClick = () => {
    setNewDiaryVisible(!newDiaryVisible); // NewDiary 표시 여부 토글
  };

  const todayDate = moment().format('YYYY.MM.DD');

  const calculateDDay = (date) => {
    if (!date) return '';
    const diffDays = moment(date).diff(moment(), 'days');
    if (diffDays === 0) {
      return '오늘';
    } else if (diffDays > 0) {
      return `D-${diffDays}`;
    } else {
      return `D+${Math.abs(diffDays)}`;
    }
  };

  return (
    <DiaryContainer>
      <PageHeader pageName="나의 일기" />
      <Content>
        <Information>
          <DDay>
            {selectedDate ? `${calculateDDay(selectedDate)}` : <DatePicker
                className='inputDate'
                placeholderText={'날짜 설정'} 
                ref={datePickerRef}
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                popperModifiers={{
                  offset: {
                    enabled: true,
                    offset: '0px, 10px',
                  },
                }}
                onClickOutside={() => setCalendarOpen(false)}
              />}
          </DDay>
          <div>
            <Today>{todayDate}</Today>
            <RightContainer>
              <SubText>나의 교환교</SubText>
              <SchoolContainer>
                <BigText>영국,</BigText>
                <BigText style={{color:"#3E73B2", marginLeft: "0.5em"}}>King’s College London</BigText>
              </SchoolContainer>
            </RightContainer>
          </div>
        </Information>
        <CalendarContainer>
          <DiaryCalendar />
        </CalendarContainer>
        <AddDiary onClick={handleAddDiaryClick}>
          <div>기록 남기기</div>
          <AddButton src={plus_button} />
        </AddDiary>
        {newDiaryVisible && (
          <NewDiary>
            <p style={{padding: "20px", color: "#D9D9D9"}}>교환 생활의 시작,<br/>윤서님의 교환 1일차 하루는 어땠나요?</p>
            <Save>저장하기</Save>
          </NewDiary>
        )}
        <DailyDiary items={diaries} />
      </Content>
      <BottomTabNav />
    </DiaryContainer>
  );
};

export default Diary;

const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 100px; // BottomTabNav 컴포넌트와의 간격을 확보
`;

const Information = styled.div`
  width: 100%;
  height: 30vh;
  position: relative;
`;

const DDay = styled.div`
  position: absolute;
  width: 130px;
  height: 130px;
  top: 30%;
  left: 6%;
  font-size: 1.2em !important;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #DCDFFF; // 이후 border에 그라데이션 추가하기
`;

const Today = styled.div`
  background: ${props => props.theme.lightPurple};
  margin-top: 4em;
  width: 6em;
  height: 1.5em;
  border-radius: 30px;
  margin-left: 10em;
  margin-top: 6em;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightContainer = styled.div`
  margin-top: 1em;
`;

const SubText = styled.div`
  margin-left: 2em;
  margin-bottom: 0.5em;
`;

const SchoolContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 1em;
`;

const BigText = styled.div`
  margin-top: 1vh;
  color: ${props => props.color || '#000000'};
  margin-left: ${props => props.spacing || '0'};
  font-weight: bold;
  font-family: 'Inter-Regular';
  font-size: 1em;
  margin-bottom: 3.5vh;
`;

const CalendarContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const AddDiary = styled.div`
  width: 30%;
  height: 5vh;
  margin-left: 1.5em;
  margin-top: 1em;
  margin-bottom: 1em;
  background: ${props => props.theme.lightPurple};
  color: white;
  border-radius: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  cursor: pointer; // 클릭 가능하도록 커서 변경
`;

const AddButton = styled.img`
  width: 6vw;
  height: 3vh;
  margin-left: 0.5em;
`;

const NewDiary = styled.div`
  width: 90%;
  height: 130px;
  margin-bottom: 10px;
  margin-left: 15px;
  border-radius: 15px;
  border: 0.5px solid ${props => props.theme.lightPurple};
  white-space: pre-wrap;
  text-align: left;
  display: flex;
  align-items: right;
  position: relative; // 상대 위치로 설정
`;

const Save = styled.div`
  width: 70px;
  height: 20px;
  border-radius: 9px;
  background: ${props => props.theme.blueGra};
  color: white;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute; // 절대 위치로 설정
  bottom: 10px; // 아래에서 10px 간격
  right: 10px; // 오른쪽에서 10px 간격
`;
