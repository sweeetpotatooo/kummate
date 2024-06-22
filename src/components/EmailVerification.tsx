import React, { useState } from 'react';

const EmailVerification: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');

  const sendVerificationCode = () => {
    // 이메일 인증번호 전송 로직 (백엔드와 연동 필요)
    setCodeSent(true);
  };

  const verifyCode = () => {
    // 인증번호 확인 로직
    if (enteredCode === verificationCode) {
      setIsVerified(true);
    } else {
      alert('인증번호가 틀렸습니다.');
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        required
      />
      <button onClick={sendVerificationCode}>인증번호 전송</button>
      {codeSent && (
        <div>
          <input
            type="text"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            placeholder="인증번호 입력"
            required
          />
          <button onClick={verifyCode}>인증</button>
        </div>
      )}
      {isVerified ? <p>인증이 완료 되었습니다</p> : <p>인증이 필요합니다</p>}
    </div>
  );
};

export default EmailVerification;
