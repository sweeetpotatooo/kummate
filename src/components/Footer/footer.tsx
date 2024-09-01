import styles from "./footer.module.css"
import { SiNotion } from "react-icons/si"
import { GithubOutlined } from '@ant-design/icons';
import { Button } from "antd"
import { FunctionComponent } from 'react';

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
    <>
      <div className={styles.footerContainer}>
        <div className={styles.footerBox}>
          <div className={styles.footerDesc}>
            <div className={styles.info}>
              <p>KUMMATE</p>
            </div>
          </div>
          <div className={styles.footerOwner}>
            <div className={styles.footerGit}>
              <Button
                onClick={handleNotionClick} // Notion 버튼 클릭 시 handleNotionClick 함수 호출
                shape="circle"
                icon={
                  <SiNotion style={{ fontSize: "20px", color: "#006400" }} />
                }
              />
              <Button
                onClick={handleGithubClick} // GitHub 버튼 클릭 시 handleGithubClick 함수 호출
                shape="circle"
                icon={
                  <GithubOutlined style={{ fontSize: "20px", color: "#006400" }} />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
