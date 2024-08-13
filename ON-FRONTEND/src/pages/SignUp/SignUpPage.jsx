import useMultiStepForm from '../../hooks/useMultiStepForm';
import * as s from './SignUpStyled';
import * as FormElement from './FormElements';
import groupLogo from '../../assets/images/groupLogo.svg';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { UserList } from '../../components/Common/TempDummyData/PostList';
import { useNavigate } from 'react-router-dom';
import SignUpCompletePage from './SignUpCompletePage';

const SignUpPage = () => {
  const nav = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userId: UserList.length + 1, //백이랑 연결시 삭제
    email: '',
    password: '',
    nickName: '',
    name: '',
    age: '',
    gender: '',
    phone: '',
    is_dispatch_confirmed: true,
    dispatchedUniversity: '',
    univ_homepage: '',
    country: '',
    dispatchedType: '',
    userState: 'TEMPORARY',
  });
  const [isActive, setActive] = useState(false);
  const updateUserInfo = (e) => {
    if (e) {
      let name = e.target.name;
      let value = e.target.value;
      setUserInfo({ ...userInfo, [name]: value });
    }
  };
  const { currentTitle, currentStep, prev, next, isFirstStep, isLastStep } =
    useMultiStepForm([
      {
        title: '회원 가입을 위한 약관 동의',
        element: <FormElement.TermForm setActive={setActive} />,
      },

      {
        title: '정보 입력',
        element: (
          <FormElement.UserInfoForm1
            state={userInfo}
            updateUserInfo={updateUserInfo}
            setActive={setActive}
          />
        ),
      },
      {
        title: '정보 입력',
        element: (
          <FormElement.UserInfoForm2
            state={userInfo}
            updateUserInfo={updateUserInfo}
            setActive={setActive}
          />
        ),
      },
    ]);
  const animationDiv = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLastStep) {
      console.log('제출');
      // TODO: Request form
      UserList.unshift(userInfo);
      alert('Submitted!');
      nav('/signUp/complete');
      return false;
    }

    next(userInfo);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <s.FormPage>
          <s.SectionWrapper>
            <s.TitleSection>
              <s.Logo src={groupLogo} />
              <img />
              <div className="on_exp">교환/방문학생 정보공유 커뮤니티, ON </div>
            </s.TitleSection>

            <s.ContentSection ref={animationDiv}>
              <s.BackButton
                type="button"
                onClick={prev}
              >
                이전 단계
              </s.BackButton>
              <s.StyledH2 style={{ marginBottom: '40px' }}>
                {currentTitle}
              </s.StyledH2>
              {currentStep}
            </s.ContentSection>
          </s.SectionWrapper>
          <s.ButtonSection>
            <s.TwoColumnWrapper>
              {currentTitle === '파견교 인증' ? (
                <s.PurpleButton style={{ backgroundColor: ' #d7dff4' }}>
                  건너뛰기
                </s.PurpleButton>
              ) : null}
              <s.PurpleButton disabled={!isActive}>
                {isLastStep ? '회원 가입하기' : '다음 단계'}
              </s.PurpleButton>
            </s.TwoColumnWrapper>
          </s.ButtonSection>
        </s.FormPage>
      </form>
    </div>
  );
};

export default SignUpPage;
