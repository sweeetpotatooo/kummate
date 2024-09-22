import { useEffect, useState } from 'react'; // React 훅 import
import MyPage from '../myPage'; // 마이페이지 컴포넌트 import
import styles from './profile.module.css'; // CSS 모듈 import
import ProfileBasic from './profileBasic'; // 기본 프로필 정보 컴포넌트 import
import ProfileTendency from './profileTendency'; // 프로필 성향 컴포넌트 import
import { useSelector } from 'react-redux'; // Redux 상태 관리 훅 import
import { RootState } from '../../../Redux/store'; // Redux 상태 타입 정의 import
import { userMyprofile } from '../../../api'; // API 경로 import
import useFetch from '../../../hooks/useFetch'; // 커스텀 훅 import
import { UserProfile } from '../../../interface/interface'; // 인터페이스 정의 import
import { Spin } from 'antd'; // 로딩 스피너 컴포넌트 import

// 기본 프로필 이미지 경로 설정
const defaultProfileImage = "/profile.svg";

const Profile: React.FC = () => {
  // Redux에서 사용자 토큰 가져오기
  const userToken = useSelector((state: RootState) => state.user.data.token);

  // 기본 프로필 정보 상태
  const [nickname, setNickname] = useState(''); // 닉네임 상태
  const [email, setEmail] = useState(''); // 이메일 상태
  const [profileImage, setProfileImage] = useState(defaultProfileImage); // 프로필 이미지 상태

  // 프로필 성향 상태
  const [selectedGender, setSelectedGender] = useState(''); // 성별 상태
  const [selectedAge, setSelectedAge] = useState(0); // 나이 상태
  const [selectedSmoke, setSelectedSmoke] = useState(''); // 흡연 여부 상태
  const [selectedMBTI, setSelectedMBTI] = useState(''); // MBTI 상태
  const [selectedregion, setSelectedregion] = useState(''); // 지역 상태
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(''); // 선호 나이대 상태
  const [selectedActivityTime, setSelectedActivityTime] = useState(''); // 활동 시간 상태
  const [mytext, setMytext] = useState(''); // 상세 정보 상태
  const [favoriteTag, setfavoriteTag] = useState<string[]>([]); // 선호 태그 상태

  // 프로필 업데이트 감지 상태 (사용하지 않는 상태)
  const [, setProfileUpdated] = useState(false);

  // 프로필 업데이트 성공 시 상태 변경 콜백 함수
  const handleUpdateProfileSuccess = () => {
    setProfileUpdated(prevState => !prevState); // 상태를 반전시켜 업데이트를 감지
  };

  // 프로필 정보를 가져오는 커스텀 훅 사용
  const {
    datas: profileData, // 가져온 프로필 데이터
    isLoading: fetchProfileLoading, // 로딩 상태
    setUrl: setProfileUrl, // URL 설정 함수
    setHeaders: setProfileHeaders, // 헤더 설정 함수
    setMethod: setProfileMethod, // HTTP 메서드 설정 함수
    setBody: setProfileBody, // 바디 설정 함수
  } = useFetch<UserProfile | null>("", "", {}, null);

  // 프로필 정보 불러오는 함수
  const handleProfile = () => {
    setProfileUrl(`/api/${userMyprofile}`); // API URL 설정
    setProfileMethod("GET"); // GET 메서드 설정
    setProfileHeaders({
      "Content-Type": "application/json", // 헤더 설정
      Authorization: userToken.atk.toString(), // 인증 토큰 추가
    });
    setProfileBody(); // 바디 설정 없음
  };

  // 프로필 데이터를 가져왔을 때 상태 업데이트
  useEffect(() => {
    if (profileData) {
      setSelectedGender(profileData.gender === 'null' ? '성별' : profileData.gender); // 성별 설정
      setNickname(profileData.nickname); // 닉네임 설정
      setSelectedAge(profileData.myAge === null ? 0 : profileData.myAge); // 나이 설정
      setEmail(profileData.email); // 이메일 설정
      setProfileImage(profileData.image === null ? defaultProfileImage : profileData.image); // 이미지 설정
      setSelectedSmoke(profileData.isSmoker === true ? '합니다' : '하지 않습니다'); // 흡연 여부 설정
      setSelectedMBTI(profileData.mbti === 'null' ? 'mbti' : profileData.mbti); // MBTI 설정
      setSelectedregion(profileData.region === 'null' ? '여기' : profileData.region); // 지역 설정 
      setSelectedActivityTime(profileData.activityTime === 'null' ? '오전오후' : profileData.activityTime); // 활동 시간 설정
      setMytext(profileData.detail ?? '추가로 하고 싶은 말을 적어주세요! :)'); // 상세 정보 설정
      setfavoriteTag(profileData.tags); // 태그 설정
    }
  }, [profileData]); // profileData가 변경될 때 실행

  // 컴포넌트가 처음 렌더링될 때 프로필 정보 불러오기
  useEffect(() => {
    handleProfile(); // 프로필 정보 요청 함수 호출
  }, []);

  return (
    <>
      <MyPage /> {/* 마이페이지 컴포넌트 렌더링 */}
      <div className={styles.profileContainer}>
        {fetchProfileLoading ? (
          // 로딩 중일 때 스피너 표시
          <Spin style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        ) : (
          // 프로필 정보 표시
          <>
            <ProfileBasic 
              nickname={nickname} 
              setNickname={setNickname}
              email={email}
              setEmail={setEmail}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
            />
            <ProfileTendency
              selectedGender={selectedGender} 
              setSelectedGender={setSelectedGender}
              selectedAge={selectedAge}
              setSelectedAge={setSelectedAge}
              selectedSmoke={selectedSmoke}
              setSelectedSmoke={setSelectedSmoke}
              selectedMBTI={selectedMBTI}
              setSelectedMBTI={setSelectedMBTI}
              selectedregion={selectedregion}
              setSelectedregion={setSelectedregion}
              selectedAgeGroup={selectedAgeGroup}
              setSelectedAgeGroup={setSelectedAgeGroup}
              selectedActivityTime={selectedActivityTime}
              setSelectedActivityTime={setSelectedActivityTime}
              mytext={mytext}
              setMytext={setMytext}
              favoriteTag={favoriteTag}
              setFavoriteTag={setfavoriteTag}
              handleUpdateProfileSuccess={handleUpdateProfileSuccess}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
