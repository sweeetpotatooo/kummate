import React, { useState } from 'react';

const preferences = ['조용한', '활발한', '청결한', '비흡연자', '규칙적인 생활'];

const SignupStep3: React.FC = () => {
  const [likes, setLikes] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);

  const togglePreference = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <div>
        <h3>이런 룸메이트는 좋아요</h3>
        {preferences.map((pref) => (
          <button
            key={pref}
            onClick={() => togglePreference(likes, setLikes, pref)}
            style={{ backgroundColor: likes.includes(pref) ? 'green' : 'white' }}
          >
            {pref}
          </button>
        ))}
      </div>
      <div>
        <h3>이런 룸메이트는 싫어요</h3>
        {preferences.map((pref) => (
          <button
            key={pref}
            onClick={() => togglePreference(dislikes, setDislikes, pref)}
            style={{ backgroundColor: dislikes.includes(pref) ? 'red' : 'white' }}
          >
            {pref}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SignupStep3;
