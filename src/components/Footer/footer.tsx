import { FunctionComponent } from 'react';
import styles from './footer.module.css';
import { SiNotion } from 'react-icons/si';
import { GithubOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Footer: FunctionComponent = () => {
  const handleGithubClick = () => {
    window.open ('https://github.com/sweeetpotatooo/kummate');
  };

  const handleNotionClick = () => {
    window.open ('https://www.notion.so/KUMMATE-7df8c7200a984e3aaddad9e6663d2ffd?pvs=4');
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footerChild} />
      <div className={styles.kummateParent}>
        <b className={styles.kummate}>KUMMATE</b>
        <b className={styles.copyright2024}>{`Copyright ⓒ 2024 by KUMMATE`}</b>
      </div>
      <div className={styles.socialButtons}>
        <Button
          shape="circle"
          icon={<GithubOutlined style={{ fontSize: '20px', color: '#38773e' }} />}
          aria-label="GitHub"
          className={styles.socialButton}
          onClick={handleGithubClick} 
        />
        <Button
          shape="circle"
          icon={<SiNotion style={{ fontSize: '20px', color: '#38773e' }} />}
          aria-label="Notion"
          className={styles.socialButton}
          onClick={handleNotionClick}
        />
      </div>
    </div>
  );
};

export default Footer;
