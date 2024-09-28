import { useEffect, useState } from 'react';
import MyPage from '../myPage';
import styles from './profile.module.css';
import ProfileBasic from './profileBasic';
import ProfileTendency from './profileTendency';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { UserProfile } from '../../../interface/interface';
import { Spin, message } from 'antd';

const defaultProfileImage = "/profile.svg";

const Profile: React.FC = () => {
  console.log('Profile 컴포넌트 렌더링됨');
  const userToken = useSelector((state: RootState) => state.user.data.token);
  console.log('userToken:', userToken);
  console.log('userToken.atk:', userToken.atk);

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

  const [fetchProfileLoading, setFetchProfileLoading] = useState<boolean>(false);
  const [fetchProfileError, setFetchProfileError] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userToken || !userToken.atk) {
        console.error('토큰이 없습니다. 로그인이 필요한 페이지입니다.');
        return;
      }

      setFetchProfileLoading(true);
      setFetchProfileError(null);

      try {
        const response = await fetch(`${API_URL}/api/my`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken.atk}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: UserProfile = await response.json();
        console.log('받아온 프로필 데이터:', data);

        setSelectedGender(data.gender ?? '성별');
        setNickname(data.nickname ?? '');
        setSelectedAge(data.age ?? 0);
        setEmail(data.email ?? '');
        setProfileImage(data.image ?? defaultProfileImage);
        setSelectedSmoke(data.isSmoker === true ? '합니다' : '하지 않습니다');
        setSelectedMBTI(data.mbti ?? 'MBTI');
        setSelectedRegion(data.region ?? '지역');
        setSelectedAgeGroup(data.ageGroup?? ' ~ ')
        setSelectedActivityTime(data.activityTime ?? '활동 시간');
        setMyText(data.detail ?? '추가로 하고 싶은 말을 적어주세요! :)');
        setFavoriteTag(data.tags ?? []);
      } catch (error) {
        console.error('프로필 정보를 불러오는 중 에러 발생:', error);
        setFetchProfileError(error);
        message.error('프로필 정보를 불러오는 데 실패했습니다. 다시 시도해주세요.');
      } finally {
        setFetchProfileLoading(false);
      }
    };

    fetchProfile();
  }, [userToken]);

  return (
    <>
      <MyPage />
      <div className={styles.profileContainer}>
        {fetchProfileLoading ? (
          <Spin
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
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
              selectedRegion={selectedRegion}           
              setSelectedRegion={setSelectedRegion}    
              selectedAgeGroup={selectedAgeGroup}
              setSelectedAgeGroup={setSelectedAgeGroup}
              selectedActivityTime={selectedActivityTime}
              setSelectedActivityTime={setSelectedActivityTime}
              myText={myText}                           
              setMyText={setMyText}                     
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
