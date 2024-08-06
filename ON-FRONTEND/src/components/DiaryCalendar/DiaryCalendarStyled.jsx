import styled from 'styled-components';


export const DiaryCalendar = styled.div`


    .react-calendar__navigation__arrow.react-calendar__navigation__prev-button {

      font-size: 40px;
      position: absolute;
      top: 225px;
    }

    .react-calendar__navigation__arrow.react-calendar__navigation__next-button {

      font-size: 40px;
      position: absolute;
      top: 225px;
      right: 20px;
    }

    .react-calendar__navigation__label__labelText {
      font-size: 22px;
      position: absolute;
      top: 260px;
      right: 150px;
    }

    .react-calendar__navigation__label {
      font-weight: 600;
      font-family: Inter;
      padding: 10px;
    }

    .react-calendar {
    width: 350px;
    max-width: 100%;
    background: linear-gradient(-45deg,#DCDFFF, #D6EBFF);
    border: none;
    border-radius: 10px;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }
  
  .react-calendar--doubleView {
    width: 700px;
  }
  
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
    border-bottom: 2px dashed;
    border-color: white;
  }
  
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    color: white;
    font-size: 22px;
  }
  
  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }

  
  .react-calendar__month-view__weekdays {
    text-align: center;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }
  
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }
  
  
  .react-calendar__month-view__days__day--neighboringMonth,
  .react-calendar__decade-view__years__year--neighboringDecade,
  .react-calendar__century-view__decades__decade--neighboringCentury {
    color: #757575;
  }
  
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 0;
  }
  
  .react-calendar__tile {
    background: none;
    text-align: center;
    font: inherit;
    font-size: 0.833em;
    height: 60px;
  }
  
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    color: #ababab;
  }
  
  .react-calendar__month-view__days__day--neighboringMonth:disabled,
  .react-calendar__decade-view__years__year--neighboringDecade:disabled,
  .react-calendar__century-view__decades__decade--neighboringCentury:disabled {
    color: #cdcdcd;
  }
  
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
  }

  
.react-calendar__tile--now abbr {
background: #868EE8 !important;
color: white !important;
padding: 20% 40%;
font-size: 12px !important;
border-radius: 50% !important;
}

`;

export const Checkbox = styled.div`
  width: 14px;
  height: 14px;
  background: #D9D9D9;
  border-radius: 2px;
  margin: 5px auto;
`;