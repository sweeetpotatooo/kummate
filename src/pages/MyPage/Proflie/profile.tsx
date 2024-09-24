import { useEffect, useState } from 'react';
import MyPage from '../myPage';
import styles from './profile.module.css';
import ProfileBasic from './profileBasic';
import ProfileTendency from './profileTendency';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { userMyprofile } from '../../../api';
import useFetch from '../../../hooks/useFetch';
import { UserProfile } from '../../../interface/interface';
import { Spin, message } from 'antd';

const defaultProfileImage = "/profile.svg";

const Profile: React.FC = () => {
  const userToken = useSelector((state: RootState) => state.user.data.token);

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(defaultProfileImage);

  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAge, setSelectedAge] = useState(0);
  const [selectedSmoke, setSelectedSmoke] = useState('');
  const [selectedMBTI, setSelectedMBTI] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');
  const [selectedActivityTime, setSelectedActivityTime] = useState('');
  const [myText, setMyText] = useState('');
  const [favoriteTag, setFavoriteTag] = useState<string[]>([]);

  const [, setProfileUpdated] = useState(false);

  const handleUpdateProfileSuccess = () => {
    setProfileUpdated(prevState => !prevState);
    // 프로필이 성공적으로 업데이트되었을 때 추가 작업을 수행할 수 있습니다.
  };
  const API_URL = 'http://localhost:3001';
  const {
    datas: profileData,
    isLoading: fetchProfileLoading,
    error: fetchProfileError,
    setUrl: setProfileUrl,
    setHeaders: setProfileHeaders,
    setMethod: setProfileMethod,
    setBody: setProfileBody,
  } = useFetch<UserProfile | null>("", "", {}, null);

  const handleProfile = () => {
    setProfileUrl(`${API_URL}/api/my`); // API 엔드포인트 설정
    setProfileMethod("GET");
    setProfileHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken.atk}`, // Bearer 토큰 형식으로 설정
    });
    setProfileBody(); // GET 요청이므로 바디 필요 없음
  };

  useEffect(() => {
    if (profileData) {
      setSelectedGender(profileData.gender === null ? '성별' : profileData.gender);
      setNickname(profileData.nickname);
      setSelectedAge(profileData.myAge === null ? 0 : profileData.myAge);
      setEmail(profileData.email);
      setProfileImage(profileData.image === null ? defaultProfileImage : profileData.image);
      setSelectedSmoke(profileData.isSmoker === true ? '합니다' : '하지 않습니다');
      setSelectedMBTI(profileData.mbti === null ? 'MBTI' : profileData.mbti);
      setSelectedRegion(profileData.region === null ? '지역' : profileData.region);
      setSelectedActivityTime(profileData.activityTime === null ? '활동 시간' : profileData.activityTime);
      setMyText(profileData.detail ?? '추가로 하고 싶은 말을 적어주세요! :)');
      setFavoriteTag(profileData.tags || []);
    }
  }, [profileData]);

  // 에러 발생 시 처리
  useEffect(() => {
    if (fetchProfileError) {
      console.error('프로필 정보를 불러오는 중 에러 발생:', fetchProfileError);
      message.error('프로필 정보를 불러오는 데 실패했습니다. 다시 시도해주세요.');
    }
  }, [fetchProfileError]);

  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <>
      <MyPage />
      <div className={styles.profileContainer}>
        {fetchProfileLoading ? (
          <Spin style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        ) : (
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
              selectedregion={selectedRegion}
              setSelectedregion={setSelectedRegion}
              selectedAgeGroup={selectedAgeGroup}
              setSelectedAgeGroup={setSelectedAgeGroup}
              selectedActivityTime={selectedActivityTime}
              setSelectedActivityTime={setSelectedActivityTime}
              mytext={myText}
              setMytext={setMyText}
              favoriteTag={favoriteTag}
              setFavoriteTag={setFavoriteTag}
              handleUpdateProfileSuccess={handleUpdateProfileSuccess}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
