import React, { useState } from 'react';
import { Button, Form, Input, Select, Radio, Checkbox } from 'antd';
import styles from './Signup.module.css';

const { Option } = Select;

const SignupForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  return (
    <div className={styles.container}>
      <h1>회원가입</h1>
      <Form
        form={form}
        name="signup"
        onFinish={onFinish}
        initialValues={{
          gender: 'male',
          smoking: false,
          snoring: false,
          grinding: false,
        }}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="이름"
          rules={[{ required: true, message: '이름을 입력해주세요.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="성별"
          rules={[{ required: true, message: '성별을 선택해주세요.' }]}
        >
          <Radio.Group>
            <Radio value="male">남성</Radio>
            <Radio value="female">여성</Radio>
            <Radio value="other">기타</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="age"
          label="나이"
          rules={[{ required: true, message: '나이를 입력해주세요.' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="닉네임"
          rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="username"
          label="아이디"
          rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="비밀번호"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="studentId"
          label="학번"
          rules={[{ required: true, message: '학번을 입력해주세요.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="department"
          label="학과"
          rules={[{ required: true, message: '학과를 입력해주세요.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="smoking"
          valuePropName="checked"
          label="흡연 유무"
        >
          <Checkbox>흡연 여부</Checkbox>
        </Form.Item>

        <Form.Item
          name="mbti"
          label="MBTI"
          rules={[{ required: true, message: 'MBTI를 입력해주세요.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="snoring"
          valuePropName="checked"
          label="코골이 여부"
        >
          <Checkbox>코골이 여부</Checkbox>
        </Form.Item>

        <Form.Item
          name="grinding"
          valuePropName="checked"
          label="이갈이 여부"
        >
          <Checkbox>이갈이 여부</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupForm;
