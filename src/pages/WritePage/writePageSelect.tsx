import { Badge, Form, RadioChangeEvent } from "antd";
import styles from "./writePageSelect.module.css";
import { Radio } from "antd";
import { useState } from "react";
import { FormInstance } from "antd";
import { region, ageGroup, smoke } from "../../object/profileDropdown";

interface WritePageSelectProps {
  form: FormInstance;
}

const WritePageSelect: React.FC<WritePageSelectProps> = ({ form }) => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>("지역");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("나이");
  const [selectedSmoke, setSelectedSmoke] = useState<boolean | null>(null); // 초기값을 null로 설정

  // 지역 선택 시 호출되는 핸들러
  const handleRegionChange = (e: RadioChangeEvent) => {
    const region = e.target.value;
    setSelectedArea(region);
    form.setFieldsValue({ region });
  };

  // 나이 선택 시 호출되는 핸들러
  const handleAgeGroupChange = (e: RadioChangeEvent) => {
    const ageGroup = e.target.value;
    setSelectedAgeGroup(ageGroup);
    form.setFieldsValue({ ageGroup });
  };

  // 흡연 여부 선택 시 호출되는 핸들러
  const handleSmokeChange = (e: RadioChangeEvent) => {
    const smokeStr = e.target.value;
    const smoke = smokeStr === 'true'; // 문자열을 boolean으로 변환
    setSelectedSmoke(smoke); // 상태 업데이트
    form.setFieldsValue({ smoke }); // 폼 필드 값 설정
  };

  const handleToggleSearchBox = () => {
    setSearchBoxOpen(!searchBoxOpen);
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <div className={styles.searchBar} onClick={handleToggleSearchBox}>
            <div>
              <p className={styles.title}>
                <span className={styles.require}>*</span>기숙사
              </p>
              <Badge className={styles.cardBadgeArea}>{selectedArea}</Badge>
            </div>
            <div>
              <p className={styles.title}>
                <span className={styles.require}>*</span>나이
              </p>
              <Badge className={styles.cardBadgeAgeGroup}>{selectedAgeGroup}</Badge>
            </div>
            <div className={styles.lastDiv}>
              <p className={styles.title}>
                <span className={styles.require}>*</span>흡연 여부
              </p>
              <Badge className={styles.cardBadgeSmoke}>
                {selectedSmoke === null
                  ? "흡연"
                  : selectedSmoke === true
                  ? "흡연"
                  : "비흡연"}
              </Badge>
            </div>
          </div>

          <div
            className={
              searchBoxOpen
                ? styles.searchChoiceContainer
                : styles.searchChoiceContainerHide
            }
          >
            <div className={styles.searchChoiceBox}>
              <div className={styles.searchChoiceArea}>
                <p>지역</p>
                <div className={styles.areaRadioGroup}>
                  <Form.Item
                    name="region"
                    rules={[
                      {
                        required: true,
                        message: "지역을 선택해 주세요.",
                      },
                    ]}
                  >
                    <Radio.Group onChange={handleRegionChange}>
                      {region.map((item, index) => (
                        <Radio
                          key={index}
                          value={item.region}
                          className={styles.areaRadioBtn}
                        >
                          {item.region}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>

              <div className={styles.searchChoiceAgeGroup}>
                <p>나이</p>
                <Form.Item
                  name="ageGroup"
                  rules={[
                    {
                      required: true,
                      message: "나이를 선택해 주세요.",
                    },
                  ]}
                >
                  <Radio.Group
                    className={styles.AgeGroupRadioGroup}
                    value={selectedAgeGroup}
                    onChange={handleAgeGroupChange}
                  >
                    {ageGroup.map((item, index) => (
                      <Radio
                        key={index}
                        value={item.ageGroup}
                        className={styles.ageGroupRadioBtn}
                      >
                        {item.ageGroup}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </div>

              <div className={styles.searchChoiceSmoke}>
                <p>흡연 여부</p>
                <Form.Item
                  name="smoke"
                  rules={[
                    {
                      required: true,
                      message: "흡연 여부를 선택해 주세요.",
                    },
                  ]}
                >
                  <Radio.Group
                    className={styles.SmokeRadioGroup}
                    value={selectedSmoke ? 'true' : 'false'} // 상태를 문자열로 변환하여 설정
                    onChange={handleSmokeChange}
                  >
                    <Radio value="false" className={styles.smokeRadioBtn}>
                      하지 않습니다
                    </Radio>
                    <Radio value="true" className={styles.smokeRadioBtn}>
                      합니다
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WritePageSelect;
