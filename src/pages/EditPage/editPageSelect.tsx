// src/pages/editPage/editPageSelect.tsx

import { Badge, Form, RadioChangeEvent } from "antd"
import styles from "./editPageSelect.module.css"
import { Radio } from "antd"
import { useState, useEffect } from "react"
import { FormInstance } from "antd"
import { region, smoke, ageGroup } from "../../object/profileDropdown"
import { useLocation } from "react-router-dom"

interface EditPageSelectProps {
  form: FormInstance
}

const EditPageSelect: React.FC<EditPageSelectProps> = ({ form }) => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false)
  const [selectedArea, setSelectedArea] = useState<string>("기숙사")
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("연령대")
  const [selectedSmoke, setSelectedSmoke] = useState<string>("흡연")

  const editPost = useLocation().state.post

  const handleRegionChange = (e: RadioChangeEvent) => {
    const regionValue = e.target.value
    setSelectedArea(regionValue)
    form.setFieldsValue({ region: regionValue })
  }

  const handleAgeGroupChange = (e: RadioChangeEvent) => {
    const ageGroupValue = e.target.value
    setSelectedAgeGroup(ageGroupValue)
    form.setFieldsValue({ ageGroup: ageGroupValue })
  }

  const handleSmokeChange = (e: RadioChangeEvent) => {
    const smokeValue = e.target.value
    setSelectedSmoke(smokeValue)
    form.setFieldsValue({ smoke: smokeValue })
  }

  const handleToggleSearchBox = () => {
    setSearchBoxOpen(!searchBoxOpen)
  }

  useEffect(() => {
    if (editPost) {
      setSelectedArea(editPost.region)
      setSelectedAgeGroup(editPost.ageGroup)
      setSelectedSmoke(editPost.smoke ? "흡연" : "비흡연")

      form.setFieldsValue({
        region: editPost.region,
        ageGroup: editPost.ageGroup,
        smoke: editPost.smoke ? "흡연" : "비흡연",
      })
    }
  }, [editPost, form]) // 의존성 배열에 form 추가

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
                <span className={styles.require}>*</span>연령대
              </p>
              <Badge className={styles.cardBadgeAgeGroup}>
                {selectedAgeGroup}
              </Badge>
            </div>
            <div>
              <p className={styles.title}>
                <span className={styles.require}>*</span>흡연여부
              </p>
              <Badge className={styles.cardBadgeSmoke}>{selectedSmoke}</Badge>
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
                <p>기숙사</p>
                <div className={styles.areaRadioGroup}>
                  <Form.Item
                    name="region"
                    rules={[
                      {
                        required: true,
                        message: "기숙사를 선택해 주세요.",
                      },
                    ]}
                    initialValue={selectedArea} // 초기값 설정
                  >
                    <Radio.Group
                      onChange={handleRegionChange}
                      value={selectedArea}
                    >
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
                <p>연령대</p>
                <Form.Item
                  name="ageGroup"
                  rules={[
                    {
                      required: true,
                      message: "연령대를 선택해 주세요.",
                    },
                  ]}
                  initialValue={selectedAgeGroup} // 초기값 설정
                >
                  <Radio.Group
                    className={styles.ageGroupRadioGroup}
                    onChange={handleAgeGroupChange}
                    value={selectedAgeGroup}
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
                  initialValue={selectedSmoke} // 초기값 설정
                >
                  <Radio.Group
                    className={styles.smokeRadioGroup}
                    onChange={handleSmokeChange}
                    value={selectedSmoke}
                  >
                    {smoke.map((item, index) => (
                      <Radio
                        key={index}
                        value={item.smoke}
                        className={styles.smokeRadioBtn}
                      >
                        {item.smoke}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditPageSelect
