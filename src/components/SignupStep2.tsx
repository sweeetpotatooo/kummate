import React, { useState } from 'react';

const SignupStep2: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [studentId, setStudentId] = useState('');
  const [major, setMajor] = useState('');
  const [age, setAge] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [smoking, setSmoking] = useState(false);
  const [mbti, setMbti] = useState('');
  const [snoring, setSnoring] = useState(false);
  const [teethGrinding, setTeethGrinding] = useState(false);
  const [details, setDetails] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <h2>회원가입 - 2단계</h2>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="닉네임"
        required
      />
      <input
        type="text"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="학번"
        required
      />
      <input
        type="text"
        value={major}
        onChange={(e) => setMajor(e.target.value)}
        placeholder="학과"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="나이"
        required
      />
      <input
        type="file"
        onChange={handleImageUpload}
        required
      />
      <label>
        흡연 여부
        <input
          type="checkbox"
          checked={smoking}
          onChange={() => setSmoking(!smoking)}
        />
      </label>
      <input
        type="text"
        value={mbti}
        onChange={(e) => setMbti(e.target.value)}
        placeholder="MBTI"
        required
      />
      <label>
        코골이 여부
        <input
          type="checkbox"
          checked={snoring}
          onChange={() => setSnoring(!snoring)}
        />
      </label>
      <label>
        이갈이 여부
        <input
          type="checkbox"
          checked={teethGrinding}
          onChange={() => setTeethGrinding(!teethGrinding)}
        />
      </label>
      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="세부사항"
      />
    </div>
  );
};

export default SignupStep2;
