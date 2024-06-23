import React, { useState } from 'react';
import EmailVerification from './EmailVerification';
import styles from './SignupStep1.module.css';

const SignupStep1: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendVerification = () => {
    if (email) {
      // Send verification code logic
      setVerificationSent(true);
      setErrorMessage('');
    } else {
      setErrorMessage('이메일을 입력해주세요.');
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode === '1234') { // example verification code
      setIsVerified(true);
      setErrorMessage('');
    } else {
      setErrorMessage('인증이 필요합니다.');
    }
  };

  const handleNextStep = () => {
    if (!isVerified) {
      setErrorMessage('인증이 필요합니다.');
    } else if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
    } else {
      // Proceed to next step
      setErrorMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.header}>회원가입</h2>
        <div className={styles.inputField}>
          <label className={styles.label}>이메일</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className={styles.button} onClick={handleSendVerification}>
          인증번호 전송
        </button>
        {verificationSent && (
          <>
            <div className={styles.inputField}>
              <label className={styles.label}>인증번호</label>
              <input
                type="text"
                className={styles.input}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
            <button className={styles.button} onClick={handleVerifyCode}>
              확인
            </button>
          </>
        )}
        <div className={styles.inputField}>
          <label className={styles.label}>비밀번호</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>비밀번호 확인</label>
          <input
            type="password"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button className={styles.button} onClick={handleNextStep}>
          다음
        </button>
      </div>
    </div>
  );
};

export default SignupStep1;
