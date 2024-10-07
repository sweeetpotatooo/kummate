// src/pages/editPage/editPage.tsx

import React, { useState, useEffect } from "react"
import styles from "./editPage.module.css"
import EditPageSelect from "./editPageSelect"
import { Button, Input, Form, Modal } from "antd"
import { useNavigate, useLocation } from "react-router-dom"
import { Store } from "antd/lib/form/interface"
import { API_URL, userArticle } from "../../api"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import useFetch from "../../hooks/useFetch"

const EditPage: React.FC = () => {
  const [userContent, setUserContent] = useState("")
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const editPost = location.state.post

  useEffect(() => {
    if (editPost) {
      form.setFieldsValue({
        title: editPost.title,
        content: editPost.content,
        region: editPost.region,
        ageGroup: editPost.ageGroup,
        smoke: editPost.smoke,
        gender: editPost.gender,
      })
      setUserContent(editPost.content)
    }
  }, [editPost, form]) // 의존성 배열에 form 추가

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
    // smoke 값을 불리언으로 변환
    const smokeValue = values.smoke === "흡연" ? true : false;
  
    // 서버로 전송할 요청 바디 생성
    const requestBody = {
      ...values,
      smoke: smokeValue,
    };
  
    console.log("Submitting values:", requestBody); // 요청 바디 출력
  
    setUrl(`${API_URL}/api/${userArticle}/${editPost.id}`);
    setMethod("PUT");
    setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken.atk}`,
    });
    setBody(requestBody);
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      navigate("/RoomMate")
      Modal.success({
        title: "게시글 수정 완료",
        content: "게시글 수정이 완료되었습니다!",
      })
    } else if (!isLoading && error) {
      console.error("Error:", error)
      Modal.error({
        title: "서버 오류",
        content: "게시글을 서버에 전송하는데 실패했습니다.",
      })
    }
  }, [isLoading, isSuccess, navigate, error])

  const onFinishFailed = () => {
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
        <EditPageSelect form={form} />
        <Form.Item
          name="content"
          initialValue={userContent}
          rules={[
            {
              required: true,
              message: "내용을 작성해주세요.",
            },
          ]}
        >
          <textarea
            maxLength={4000}
            className={styles.textArea}
            onChange={(e) => setUserContent(e.target.value)}
            value={userContent}
          />
        </Form.Item>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.submitButton}
            type="primary"
            htmlType="submit"
          >
            수정
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default EditPage
