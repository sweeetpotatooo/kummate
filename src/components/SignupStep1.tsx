import React, { useState } from 'react';
import EmailVerification from '../components/EmailVerification';

const SignupStep1: React.FC = () => {
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2>회원가입 - 1단계</h2>
      <EmailVerification />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        required
      />
    </div>
  );
};

export default SignupStep1;
