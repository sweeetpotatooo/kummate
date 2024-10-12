/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/MyPage/Profile/profile.tsx

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
  const [selectedGender, setSelectedGender] = useState('성별');
  const [selectedAge, setSelectedAge] = useState(0);
  const [selectedSmoke, setSelectedSmoke] = useState('');
  const [selectedMBTI, setSelectedMBTI] = useState('MBTI');
  const [selectedRegion, setSelectedRegion] = useState('기숙사');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(' ~ ');
  const [selectedActivityTime, setSelectedActivityTime] = useState('활동 시간');
  const [myText, setMyText] = useState('');
  const [favoriteTag, setFavoriteTag] = useState<string[]>([]);
  const [selectedStudent_id, setSelectedStudent_id] = useState(200000000);
  const [selectedDepartment, setSelectedDepartment] = useState('학과');

  const [, setProfileUpdated] = useState(false);

  // 프로필 정보 업데이트 후 상태를 다시 불러오기
  const handleUpdateProfileSuccess = () => {
    setProfileUpdated(prevState => !prevState)
    // 추가로 프로필 정보를 다시 불러올 수 있습니다.
  }
  const API_URL = 'http://localhost:3001';

  const [fetchProfileLoading, setFetchProfileLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        setSelectedStudent_id(data.student_id ?? 200000000); // 기본값 유지
        setSelectedDepartment(data.department ?? '학과'); // 기본값 유지
        setEmail(data.email ?? '');
        setProfileImage(data.image ?? defaultProfileImage);
        setSelectedSmoke(data.isSmoker === true ? '흡연' : '비흡연');
        setSelectedMBTI(data.mbti ?? 'MBTI');
        setSelectedRegion(data.region ?? '기숙사');
        setSelectedAgeGroup(data.ageGroup ?? ' ~ ');
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
              selectedStudent_id={selectedStudent_id}
              setSelectedStudent_id={setSelectedStudent_id}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
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
