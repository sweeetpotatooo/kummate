//src/pages/MyPage/Proflie/profileBasic.tsx
import { Input, Button, Form, Modal } from "antd" // Ant Design UI 라이브러리에서 필요한 컴포넌트 임포트
import { UserOutlined, MailOutlined } from "@ant-design/icons" // Ant Design의 아이콘 임포트
import styles from './profile.module.css' // 스타일 모듈 임포트
import { useSelector } from "react-redux" // Redux의 useSelector 훅을 사용해 Redux 상태 접근
import { RootState } from "../../../Redux/store" // Redux store의 타입을 정의하는 RootState 임포트
import { ProfileBasicProps } from "../../../interface/interface" // 컴포넌트 props 타입 정의를 위한 인터페이스 임포트
import { API_URL, userMyprofileNickname } from '../../../api' // API 엔드포인트 임포트
import ProfileFile from "./profileFile" // 프로필 사진 파일 관리용 컴포넌트 임포트

// ProfileBasic 컴포넌트 - 프로필 기본 정보를 수정하는 기능을 제공
const ProfileBasic = (props: ProfileBasicProps) => {
  // Redux store에서 사용자 토큰을 가져옴 (로그인 상태 확인에 사용)
  const userToken = useSelector((state: RootState) => state.user.data.token)

  // 프로필 기본 정보 (닉네임) 수정 함수
  const handleProfileBasicChange = async ({ nickname }: { nickname: string}) => {
    const updatedProfileData = { nickname: nickname } // 수정된 닉네임을 객체로 구성

    try {
      await updateProfile(updatedProfileData) // 닉네임 업데이트 API 호출
    } catch (error) {
      console.error('프로필 업데이트 실패', error) // 에러 발생 시 콘솔에 에러 출력
    }
  }
  // 닉네임 수정 API 호출 함수
  const updateProfile = async (profileData: { nickname: string }) => {
    try {
      // fetch API를 사용하여 서버에 PATCH 요청을 보냄
      const response = await fetch(`${API_URL}/api/${userMyprofileNickname}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // 요청이 JSON 형식임을 명시,
          Authorization: `Bearer ${userToken.atk}`, // Authorization 헤더에 사용자 토큰 추가
        },
        body: JSON.stringify(profileData), // 수정된 닉네임을 JSON 형식으로 서버에 전송
      })

      // 서버 응답이 실패한 경우
      if (!response.ok) {
        if (response.status === 400) {
          // 닉네임 중복에 대한 에러 처리
          Modal.error({
            title: "오류",
            content: "닉네임이 중복되었습니다.",
          })
        }
        throw new Error('프로필 기본 정보 업데이트 실패') // 일반적인 실패 처리
      } else {
        // 성공 시, 성공 모달을 보여줌
        Modal.success({
          title: "닉네임 수정 완료",
          content: "닉네임 수정이 완료되었습니다!",
        })
      }

      // 서버 응답에서 JSON 데이터를 파싱하여 닉네임을 업데이트
      const responseData = await response.json()
      props.setNickname(responseData.data.nickname) // 부모 컴포넌트에서 닉네임 상태 업데이트
    } catch (error) {
      console.error('프로필 기본정보 업데이트 오류', error) // 오류 발생 시 콘솔에 출력
    }
  }

  return (
    <div className={styles.profilePhotoBox}>
      <div>
        {/* 프로필 이미지 관리 컴포넌트 */}
        <ProfileFile profileImage={props.profileImage} setProfileImage={props.setProfileImage}/>
      </div>
      {/* Ant Design의 Form 컴포넌트를 사용하여 프로필 수정 폼 구성 */}
      <Form
        name="profileBasicUpdate"
        initialValues={{ remember: true }} // 초기 값 설정
        onFinish={handleProfileBasicChange} // 폼 제출 시 닉네임 수정 함수 호출
        className={styles.profileformBox}
      >
        {/* 현재 닉네임을 표시하는 div */}
        <div className={styles.originNickname}>{props.nickname} 님</div>

        {/* 이메일 표시 Input (읽기 전용) */}
        <Input
          prefix={<MailOutlined />} // 이메일 입력창 앞에 아이콘 표시
          placeholder="이메일입니다."
          type="email"
          value={props.email} // props로 전달된 이메일 값
          style={{ width: 200, height: 40, textAlign: 'center', marginBottom: 12 }}
          readOnly // 읽기 전용 필드
        />

        {/* 닉네임 입력 필드 (Ant Design Form.Item 사용) */}
        <Form.Item
          name="nickname" // 폼의 필드 이름
          initialValue={props.nickname} // 기존 닉네임을 초기 값으로 설정
          rules={[
            { required: true, message: "새로운 닉네임을 입력하세요." }, // 필수 입력 필드
            { type: "string", message: "기존 닉네임과 같습니다." }, // 문자열 타입 검증
          ]}
        >
          {/* 새로운 닉네임 입력 필드 */}
          <Input
            prefix={<UserOutlined />} // 사용자 아이콘 표시
            placeholder="새로운 닉네임을 입력하세요." // 닉네임 입력 필드
            onChange={(e) => e.target.value } // 입력값 변경 시 처리 (현재는 실제 로직 없음)
            style={{ width: 200, height: 40, textAlign: 'center' }}
          />
        </Form.Item>

        {/* 제출 버튼 */}
        <Button 
          className={styles.basicBtn} 
          type="primary" 
          htmlType="submit" // 폼 제출 버튼
          style={{ width: 70, height: 30, fontSize: 10, borderRadius: 20 }}
        >
          닉네임 수정
        </Button>
      </Form>
    </div>
  )
}

export default ProfileBasic
