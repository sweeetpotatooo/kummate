import { FunctionComponent } from 'react';
import styles from './Footer.module.css';
import { SiNotion } from 'react-icons/si';
import { GithubOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Footer: FunctionComponent = () => {
  const handleGithubClick = () => {
    // GitHub 버튼 클릭 시 실행할 코드 작성
    window.open ('https://github.com/sweeetpotatooo/kummate');
  };

  const handleNotionClick = () => {
    // Notion 버튼 클릭 시 실행할 코드 작성
    window.open ('https://www.notion.so/KUMMATE-7df8c7200a984e3aaddad9e6663d2ffd?pvs=4');
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footerChild} />
      <div className={styles.kummateParent}>
        <b className={styles.kummate}>KUMMATE<em>완벽한 룸메이트</em></b>
        <b className={styles.copyright2024}>{`Copyright ⓒ 2024 by Kummate`}</b>
      </div>
      <div className={styles.socialButtons}>
        <Button
          shape="circle"
          icon={<GithubOutlined style={{ fontSize: '20px', color: '#38773e' }} />}
          aria-label="GitHub"
          className={styles.socialButton}
          onClick={handleGithubClick} // GitHub 버튼 클릭 시 handleGithubClick 함수 호출
        />
        <Button
          shape="circle"
          icon={<SiNotion style={{ fontSize: '20px', color: '#38773e' }} />}
          aria-label="Notion"
          className={styles.socialButton}
          onClick={handleNotionClick} // Notion 버튼 클릭 시 handleNotionClick 함수 호출
        />
      </div>
    </div>
  );
};

export default Footer;
