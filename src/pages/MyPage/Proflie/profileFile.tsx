// src/pages/MyPage/Profile/profileFile.tsx
import styles from './profile.module.css'
import { Modal, Upload } from "antd"
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { API_URL } from '../../../api'
import { ProfileFileProps } from '../../../interface/interface'

const ProfileFile = (props: ProfileFileProps) => {
  const userToken = useSelector((state : RootState) => state.user.data.token)

  // 사진 업로드 전 처리
  const beforeUpload = (file: File) => {
    const fileTypes = ['image/jpeg', 'image/png']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!fileTypes.includes(file.type)) {
      Modal.warning({
        title: '이미지 형식 오류',
        content: 'JPEG 또는 PNG 이미지만 업로드 가능합니다.',
      })
      return false
    }

    if (file.size > maxSize) {
      Modal.warning({
        title: '이미지 크기 초과',
        content: '이미지 크기는 10MB를 초과할 수 없습니다.',
      })
      return false
    }

    handleImageUpload(file)
    return false // 자동 업로드 방지
  }

  // 이미지 업로드 처리
  const handleImageUpload = async (file: File | Blob) => {
    const formData = new FormData()
    formData.append("file", file) // 백엔드가 'file' 필드로 받도록 설정

    try {
      const response = await fetch(`${API_URL}/api/my/image/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken.atk}`,
        },
        body: formData,
      })

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json()
          Modal.error({
            title: "이미지 업로드 실패",
            content: errorData.message || "이미지 업로드에 실패했습니다.",
          })
        } else {
          throw new Error('이미지 업로드 실패')
        }
        return
      }

      const responseData = await response.json()

      if(responseData.imageUrl) {
        props.setProfileImage(responseData.imageUrl)
        Modal.success({
          title: "이미지 업로드 완료",
          content: "프로필 이미지가 성공적으로 업데이트되었습니다.",
        })
      } else {
        throw new Error('이미지 URL이 응답에 포함되지 않았습니다.')
      }

    } catch (error) {
      console.error(error)
      Modal.error({
        title: '이미지 업로드 실패',
        content: '이미지 업로드에 실패했습니다. 다시 시도해주세요.',
      })
    }
  }

  return (
    <>
      <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={beforeUpload}>
        <img className={styles.profilePhoto} src={props.profileImage} alt="Profile" />
      </Upload>
    </>
  )
}

export default ProfileFile
