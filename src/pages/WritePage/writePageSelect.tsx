import { Badge, Form, RadioChangeEvent } from "antd"
import styles from "./writePageSelect.module.css"
import { Radio } from "antd"
import { useState } from "react"
import { FormInstance } from "antd"
import { region, ageGroup, smoke } from "../../object/profileDropdown"

interface WritePageSelectProps {
  form: FormInstance
}

const writePageSelect: React.FC<WritePageSelectProps> = ({ form }) => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false)
  const [selectedArea, setSelectedArea] = useState<string>("지역")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("나이")
  const [selectedPrice, setSelectedPrice] = useState<string>("흡연")


  const handleRegionChange = (e: RadioChangeEvent) => {
    const region = e.target.value
    setSelectedArea(region)
    form.setFieldsValue({ region })
  }

  const handlePeriodChange = (e: RadioChangeEvent) => {
    const ageGroup = e.target.value
    setSelectedPeriod(ageGroup)
    form.setFieldsValue({ageGroup})
  }


  const handleSmokeChange = (e: RadioChangeEvent) => {
    const smoke = e.target.value
    setSelectedPrice(smoke)
    form.setFieldsValue({ageGroup})
  }

  const handleToggleSearchBox = () => {
    setSearchBoxOpen(!searchBoxOpen)
  }

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
              <Badge className={styles.cardBadgePeriod}>{selectedPeriod}</Badge>
            </div>
            <div className={styles.lastDiv}>
              <p className={styles.title}>
                <span className={styles.require}>*</span>흡연 여부
              </p>
              <Badge className={styles.cardBadgePrice}>{selectedPrice}</Badge>
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
              <div className={styles.searchChoicePeriod}>
                <p>나이</p>
                <Form.Item
                  name="period"
                  rules={[
                    {
                      required: true,
                      message: "나이를 선택해 주세요.",
                    },
                  ]}
                >
                  <Radio.Group
                    className={styles.periodRadioGroup}
                    value={selectedPeriod}
                    onChange={handlePeriodChange}
                  >
                    {ageGroup.map((item, index) => (
                      <Radio
                        key={index}
                        value={item.ageGroup}
                        className={styles.periodRadioBtn}
                      >
                        {item.ageGroup}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className={styles.searchChoicePrice}>
                <p>흡연 여부</p>
                <Form.Item
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "희망 연령대을 선택해 주세요.",
                    },
                  ]}
                >
                  <Radio.Group
                    className={styles.priceRadioGroup}
                    value={selectedPeriod}
                    onChange={handleSmokeChange}
                  >
                    {smoke.map((item, index) => (
                      <Radio
                        key={index}
                        value={item.smoke}
                        className={styles.priceRadioBtn}
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

export default writePageSelect
