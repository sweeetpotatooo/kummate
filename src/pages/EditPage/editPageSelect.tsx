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

const editPageSelect: React.FC<EditPageSelectProps> = ({ form }) => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false)
  const [selectedArea, setSelectedArea] = useState<string>("지역")
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("연령대")
  const [selectedSmoke, setSelectedSmoke] = useState<String>("흡연")

  const editPost = useLocation().state.post

  const handleRegionChange = (e: RadioChangeEvent) => {
    const region = e.target.value
    setSelectedArea(region)
    form.setFieldsValue({ region })
  }

  const handleAgeGroupChange = (e: RadioChangeEvent) => {
    const ageGroup = e.target.value
    setSelectedAgeGroup(ageGroup)
    form.setFieldsValue({ ageGroup })
  }

  const handleSmokeChange = (e: RadioChangeEvent) => {
    const smoke = e.target.value
    setSelectedAgeGroup(smoke)
    form.setFieldsValue({ smoke })
  }



  const handleToggleSearchBox = () => {
    setSearchBoxOpen(!searchBoxOpen)
  }

    useEffect(() => {
      if (editPost) {
        setSelectedArea(editPost.region)
        setSelectedAgeGroup(editPost.ageGroup)
        setSelectedSmoke(editPost.smoke)

      }
    }, [editPost])

  return (
    <>
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <div className={styles.searchBar} onClick={handleToggleSearchBox}>
            <div>
              <p className={styles.title}>
                <span className={styles.require}>*</span>지역
              </p>
              <Badge className={styles.cardBadgeArea}>{selectedArea}</Badge>
            </div>
            <div>
              <p className={styles.title}>
                <span className={styles.require}>*</span>기간
              </p>
              <Badge className={styles.cardBadgeAgeGroup}>{selectedAgeGroup}</Badge>
            </div>
            <div>
              <p className={styles.title}>
                <span className={styles.require}>*</span>보증금
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
                <p>기간</p>
                <Form.Item
                  name="ageGroup"
                  rules={[
                    {
                      required: true,
                      message: "연령대를 선택해 주세요.",
                    },
                  ]}
                >
                  <Radio.Group
                    className={styles.ageGroupRadioGroup}
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
                      message: "흡연 여부를 알려주세요.",
                    },
                  ]}
                >
                  <Radio.Group
                    className={styles.smokeRadioGroup}
                    value={selectedSmoke}
                    onChange={handleSmokeChange}
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

export default editPageSelect
