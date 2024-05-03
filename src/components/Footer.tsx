import { FunctionComponent } from 'react';
import styles from './Footer.module.css';
import { SiNotion } from "react-icons/si";
import { GithubOutlined } from "@ant-design/icons";
import { Button} from "antd"

const Footer:FunctionComponent = () => {
  	return (
    		<div className={styles.footer}>
      			<div className={styles.footerChild} />
      			<div className={styles.kummateParent}>
        				<b className={styles.kummate}>KUMMATE</b>
        				<b className={styles.copyright2024}>{`Copyright ⓒ 2024 by Kummate `}</b>
      			<Button
						shape="circle"
						icon={
							<GithubOutlined
								style={{ fontSize: "20px", color: "#6231ef" }}/>
						}
						/>
						<Button
						shape="circle"
						icon={
							<SiNotion
								style={{ fontSize: "20px", color: "#6231ef" }}/>
						}
						/>
						</div>
    		</div>);
};

export default Footer;
