// src/components/WritePageSelect/writePageSelect.tsx

import { Badge, Form, RadioChangeEvent } from "antd";
import styles from "./writePageSelect.module.css";
import { Radio } from "antd";
import { useState } from "react";
import { FormInstance } from "antd";
import { region, ageGroup } from "../../object/profileDropdown"; // 'smoke'는 더 이상 필요하지 않음

interface WritePageSelectProps {
  form: FormInstance;
}

const WritePageSelect: React.FC<WritePageSelectProps> = ({ form }) => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>("기숙사");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("나이");
  const [selectedSmoke, setSelectedSmoke] = useState<string>(""); // 'true' 또는 'false'

  // 지역 선택 시 호출되는 핸들러
  const handleRegionChange = (e: RadioChangeEvent) => {
    const regionValue = e.target.value;
    setSelectedArea(regionValue);
    form.setFieldsValue({ region: regionValue });
  };

  // 나이 선택 시 호출되는 핸들러
  const handleAgeGroupChange = (e: RadioChangeEvent) => {
    const ageGroupValue = e.target.value;
    setSelectedAgeGroup(ageGroupValue);
    form.setFieldsValue({ ageGroup: ageGroupValue });
  };

  // 흡연 여부 선택 시 호출되는 핸들러
  const handleSmokeChange = (e: RadioChangeEvent) => {
    const smokeValue = e.target.value; // 'true' 또는 'false'
    setSelectedSmoke(smokeValue);
    form.setFieldsValue({ smoke: smokeValue });
  };

  const handleToggleSearchBox = () => {
    setSearchBoxOpen(!searchBoxOpen);
  };

  // 흡연 여부를 표시하는 함수
  const renderSmokeBadge = () => {
    switch (selectedSmoke) {
      case "true":
        return "흡연";
      case "false":
        return "비흡연";
      default:
        return "흡연 여부";
    }
  };

  return (
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
            <Badge className={styles.cardBadgeSmoke}>{renderSmokeBadge()}</Badge>
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
                  value={selectedSmoke}
                  onChange={handleSmokeChange}
                >
                  <Radio value="true" className={styles.smokeRadioBtn}>
                    흡연
                  </Radio>
                  <Radio value="false" className={styles.smokeRadioBtn}>
                    비흡연
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritePageSelect;
