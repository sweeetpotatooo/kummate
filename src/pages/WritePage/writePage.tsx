import React, { useEffect } from "react"
import styles from "./writePage.module.css"
import "react-quill/dist/quill.snow.css"
import WritePageSelect from "./writePageSelect"
import { Button, Input, Form, Modal } from "antd"
import { useNavigate } from "react-router-dom"
import { Store } from "antd/lib/form/interface"
import { API_URL } from "../../api"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import useFetch from "../../hooks/useFetch"

const WritePage: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const userToken = useSelector((state: RootState) => state.user.data.token)

  const {
    isLoading,
    isSuccess,
    error,
    setUrl,
    setHeaders,
    setMethod,
    setBody,
  } = useFetch<unknown>("", "", {}, null)

  const onFinish = async (values: Store) => {
    console.log("Token: ", userToken);  // 토큰 출력하여 확인
    if (!userToken) {
      Modal.error({
        title: "로그인 필요",
        content: "로그인된 상태가 아닙니다. 다시 로그인해주세요.",
      });
      return;
    }
    
    const modifiedValues = {
      ...values,
      smoke: values.smoke === 'true', // 문자열을 boolean으로 변환
    };
    console.log("Modified Values:", modifiedValues); // 추가된 로그
    // API URL 설정
    setUrl(`${API_URL}/api/articles`);
    
    // POST 메소드 설정
    setMethod("POST");
    
    // 헤더 설정 (Authorization 헤더에 사용자 토큰 포함)
    setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken.atk}`, // 정확한 토큰 사용
    });
  
    // 수정된 폼 데이터를 서버에 전송
    setBody(modifiedValues); // 수정된 값을 서버로 전송
  };
  
  
  useEffect(() => {
    if (!isLoading && isSuccess) {
      // 성공 시 페이지 이동 및 성공 메시지 출력
      navigate("/RoomMate")
      Modal.success({
        title: "게시글 작성 완료",
        content: "게시글 작성이 완료되었습니다!",
      })
    } else if (!isLoading && error) {
      // 오류 발생 시 오류 메시지 출력
      console.error("Error:", error)
      Modal.error({
        title: "서버 오류",
        content: "게시글을 서버에 전송하는데 실패했습니다.",
      })
    }
  }, [isLoading, isSuccess, navigate, error])

  const onFinishFailed = () => {
    // 입력이 누락되었을 때의 처리
    Modal.error({
      title: "입력 오류",
      content: "모든 입력을 완료해 주세요.",
    })
  }

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
      <div className={styles.container}>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "제목을 입력해 주세요.",
            },
          ]}
        >
          <Input placeholder="제목" className={styles.titleInput} />
        </Form.Item>
        <div className={styles.require}>* 필수 입력 항목</div>
        <WritePageSelect form={form} />
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: "내용을 작성해주세요.",
            },
          ]}
        >
          <textarea className={styles.textArea} maxLength={4000} />
        </Form.Item>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.submitButton}
            type="primary"
            htmlType="submit"
          >
            등록
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default WritePage
