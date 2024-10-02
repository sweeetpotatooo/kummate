import { Input, Button, Form, message, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./signUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../Redux/user";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../api";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerificationConfirmed, setIsVerificationConfirmed] = useState(false);
  const [form] = Form.useForm();

  const mainpageLink = () => {
    navigate("/MainPage");
  };

  const registerUserStatus = useSelector(
    (state: RootState) => state.user.signUp
  );

  const onFinish = async (values: {
    email: string;
    password: string;
    nickname: string;
  }) => {
    if (!isVerificationConfirmed) {
      messageApi.error('이메일 인증을 완료해주세요.');
      return;
    }
  
    const result = await dispatch(registerUser(values));
  
    if (result.payload === true && registerUserStatus === true) {
      navigate('/');
    } else {
      messageApi.error('이메일 또는 닉네임이 중복되었습니다.');
    }
  };
  const sendVerificationCode = async () => {
    try {
      const values = await form.validateFields(["email"]); // 이메일 필드만 검증
      const email = values.email;
      console.log("Email being sent:", email);

      await axios.post(
        `${API_URL}/user/send-verification`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      messageApi.success("인증번호가 전송되었습니다.");
      setIsVerificationSent(true);
    } catch (error) {
      messageApi.error("인증번호 전송에 실패했습니다.");
    }
  };

  const confirmVerificationCode = async () => {
    try {
      const values = await form.validateFields(['email', 'verificationCode']);
      const email = values.email;
      const code = values.verificationCode;
  
      console.log('Email:', email);
      console.log('Code:', code);
  
      await axios.post(`${API_URL}/user/verify-code`, { email, code }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      messageApi.success('인증번호가 확인되었습니다.');
      setIsVerificationConfirmed(true);
    } catch (error) {
      messageApi.error('인증번호 확인에 실패했습니다.');
    }
  };

  return (
    <>
      <div className={styles.signUpContainer}>
        <b onClick={mainpageLink}> KUMMATE </b>
        <div className={styles.signUpBox}>
          <div className={styles.inputBox}>
            <span className={styles.SignUptitle}>회원가입</span>
            <Form
              form={form}
              name="signUp"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Row gutter={8}>
                <Col span={16}>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "이메일을 입력하세요." },
                      { type: "email", message: "올바른 이메일 형식을 입력하세요." },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Email"
                      style={{ width: "100%", height: 40 }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item>
                    <Button
                      type="primary"
                      onClick={sendVerificationCode}
                      style={{ width: "100%", height: 40 }}
                    >
                      인증번호 전송
                    </Button>
                  </Form.Item>
                </Col>
              </Row>

              {isVerificationSent && (
                <>
                  <Row gutter={8}>
                    <Col span={16}>
                      <Form.Item
                        name="verificationCode"
                        rules={[
                          { required: true, message: "인증번호를 입력하세요." },
                        ]}
                      >
                        <Input
                          prefix={<LockOutlined />}
                          placeholder="인증번호를 입력하세요."
                          style={{ width: "100%", height: 40 }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item>
                        <Button
                          type="primary"
                          onClick={confirmVerificationCode}
                          style={{ width: "100%", height: 40 }}
                          disabled={isVerificationConfirmed}
                        >
                          인증번호 확인
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}

              {/* 나머지 폼 항목들도 동일한 방식으로 수정 */}
              <Form.Item
                name="password"
                rules={[{ required: true, message: "비밀번호를 입력하세요." }]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="비밀번호를 입력하세요."
                  style={{ height: 40 }}
                />
              </Form.Item>
              <Form.Item
                name="passwordCheck"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "비밀번호를 한번 더 입력하세요." },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("비밀번호가 맞지 않습니다.")
                      );
                    },
                  }),
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="비밀번호를 한번 더 입력하세요."
                  style={{ height: 40 }}
                />
              </Form.Item>
              <Form.Item
                name="nickname"
                rules={[{ required: true, message: "닉네임을 입력하세요." }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="닉네임"
                  style={{ width: 300, height: 40 }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: 300, height: 40 }}
                  disabled={!isVerificationConfirmed}
                >
                  회원가입
                </Button>
              </Form.Item>
            </Form>
            <div className={styles.signUpText}>
              <span>회원이신가요?</span>
              <Link to="/">
                <span className={styles.signUpLink}>로그인 하기</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {contextHolder}
    </>
  );
};

export default SignUp;
