import * as FormElements from './FormElements';
import useMultiStepForm from '../../hooks/useMultiStepForm';
import * as s from './SignUpStyled';
import groupLogo from '../../assets/images/groupLogo.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import {
  AuthRequests,
  UserList,
} from '../../components/Common/TempDummyData/PostList';
import Modal from '../../components/Modal/Modal';
import { multiFilePostData, postData } from '../../api/Functions';
import { DISPATCH_CERTIFY_REQUEST } from '../../api/urls';

const SchoolAuthPage = () => {
  const currentUser = useSelector((state) => state.user);
  const [isActive, setActive] = useState(false);
  const [userInfo, setUserInfo] = useState({
    dispatchedUniversity: '',
    country: '',
    universityUrl: '',
    dispatchType: '',
    isDispatchConfirmed: true,
  });
  const [isFirstModalOpen, setFirstModalOpen] = useState(true);
  const [isLastModalOpen, setLastModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //마지막 단계에 인증 사진 있으면 활성화
    if (isLastStep && file) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, []);
  const updateUserInfo = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserInfo({ ...userInfo, [name]: value });
    console.log(userInfo);
  };
  const handleSubmitFE = (e) => {
    e.preventDefault();

    if (isFirstStep) {
      dispatch(setUser(userInfo));
      UserList.filter((user) => {
        if (user.userId === userInfo.userId) {
          user = { ...userInfo };
        }
      }); //지금 사용자 정보 불러와서 현재 사용자 id랑 매칭되는 사용자를 DB에서 검색한 후 유저 정보를 저장하는 방식인데
      //실제로 백 연결시 헤더에 현사용자 토큰 + 바디에 파견타입, 국가, 홈페이지, 파견교 담아서 API 호출
      //현재 체크 상태 파악해서 파견교 미정 true면 따로 API 호출

      next();
    } else {
      //마지막 단계
      //인증 요청 제출
      AuthRequests.unshift({
        user: currentUser,
        //photoURL: photoPreview,
        requestDate: new Date(),
      });
      setLastModalOpen(true);
    }
  };

  const handleSubmitBE = async (e) => {
    e.preventDefault();

    if (isLastStep) {
      if (!userInfo.isDispatchConfirmed) {
        // const request = postData()
      }
      const formData = new FormData();
      formData.append('fileList', file);
      const request = {
        dispatchedUniversity: userInfo.dispatchedUniversity,
        country: userInfo.country,
        universityUrl: userInfo.universityUrl,
        dispatchType: userInfo.dispatchType,
      };
      const json = JSON.stringify(request);
      const blob = new Blob([json], { type: 'application/json' });
      formData.append('dispatchCertifyApplyRequestDto', blob);
      const response = await multiFilePostData(
        DISPATCH_CERTIFY_REQUEST,
        formData,
        {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        },
      );
      if (response) {
        console.log(response);
        setLastModalOpen(true);
      }
    } else {
      next();
    }
  };
  const { currentTitle, currentStep, prev, next, isFirstStep, isLastStep } =
    useMultiStepForm([
      {
        title: '파견교 인증',
        element: (
          <FormElements.SchoolInfoForm
            state={userInfo}
            updateUserInfo={updateUserInfo}
            setActive={setActive}
          />
        ),
      },
      {
        title: '파견교 인증',
        element: (
          <FormElements.SchoolAuthForm
            state={userInfo}
            setFile={setFile}
          />
        ),
      },
    ]);
  return (
    <>
      <form onSubmit={handleSubmitBE}>
        <s.FormPage>
          <s.SectionWrapper>
            <s.TitleSection>
              <s.Logo src={groupLogo} />
              <img />
              <div className="on_exp">교환/방문학생 정보공유 커뮤니티, ON </div>
            </s.TitleSection>

            <s.ContentSection>
              <s.BackButton
                type="button"
                onClick={prev}
              >
                이전 단계
              </s.BackButton>
              <s.StyledH2>{currentTitle}</s.StyledH2>
              <s.Explanation style={{ marginBottom: '40px' }}>
                신뢰할 수 있는 커뮤니티를 위해 교환/방문교의 파견 사실여부를
                확인하고 있습니다. 교환/방문교 인증을 하지 않아도 커뮤니티와
                일기 서비스를 사용할 수 있지만 On 내 일부 기능(동행 구하기, 물품
                거래)이 제한됩니다.
              </s.Explanation>
              {currentStep}
            </s.ContentSection>
          </s.SectionWrapper>
          <s.ButtonSection>
            <s.TwoColumnWrapper>
              {isFirstStep ? (
                <s.PurpleButton
                  style={{
                    background: ' #d7dff4',
                    flexShrink: '1',
                    width: '15%',
                  }}
                >
                  건너뛰기
                </s.PurpleButton>
              ) : null}
              <s.PurpleButton disabled={!isActive}>
                {isLastStep ? '인증 요청하기' : '다음 단계'}
              </s.PurpleButton>
            </s.TwoColumnWrapper>
          </s.ButtonSection>
        </s.FormPage>
      </form>
      {isFirstModalOpen && (
        <Modal
          title="아직 파견교 인증을
          하지 않으셨네요!"
          content="파견교 미정/미인증 사용자는
          일부 활동이 제한될 수 있습니다."
          closeModal={() => {
            setFirstModalOpen(false);
          }}
        />
      )}
      {isLastModalOpen && (
        <Modal
          title="교환, 방문교 인증
      요청이 완료되었어요."
          content="인증이 완료되면 마이페이지에서
      일주일 이내로 확인할 수 있어요."
          closeModal={() => {
            setLastModalOpen(false);
          }}
          onExitModal={() => {
            nav('/admin');
          }}
        />
      )}
    </>
  );
};

export default SchoolAuthPage;
