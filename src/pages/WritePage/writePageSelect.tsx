import { Badge, Form, RadioChangeEvent } from "antd" // Ant Design 라이브러리에서 Badge, Form, RadioChangeEvent 컴포넌트 임포트
import styles from "./writePageSelect.module.css" // CSS 모듈로 스타일 적용
import { Radio } from "antd" // Ant Design의 Radio 컴포넌트 임포트
import { useState } from "react" // React의 useState 훅 임포트
import { FormInstance } from "antd" // Ant Design의 FormInstance 타입 임포트
import { region, ageGroup, smoke } from "../../object/profileDropdown" // 외부 파일에서 지역, 나이, 흡연 여부 선택지 가져오기

// WritePageSelect 컴포넌트의 props 인터페이스 정의 (폼 인스턴스 필요)
interface WritePageSelectProps {
  form: FormInstance
}

// WritePageSelect 컴포넌트 정의
const writePageSelect: React.FC<WritePageSelectProps> = ({ form }) => {
  // 지역, 나이, 흡연 여부 선택값을 관리하는 상태 변수
  const [searchBoxOpen, setSearchBoxOpen] = useState(false) // 검색 상자가 열려있는지 여부를 제어하는 상태 변수
  const [selectedArea, setSelectedArea] = useState<string>("지역") // 선택된 지역 저장
  const [selectedPeriod, setSelectedPeriod] = useState<string>("나이") // 선택된 나이 저장
  const [selectedPrice, setSelectedPrice] = useState<string>("흡연") // 선택된 흡연 여부 저장

  // 지역 선택 시 호출되는 핸들러
  const handleRegionChange = (e: RadioChangeEvent) => {
    const region = e.target.value // 선택된 지역 값을 가져옴
    setSelectedArea(region) // 선택된 지역 상태 업데이트
    form.setFieldsValue({ region }) // 폼 필드에 지역 값을 설정
  }

  // 나이 선택 시 호출되는 핸들러
  const handlePeriodChange = (e: RadioChangeEvent) => {
    const ageGroup = e.target.value // 선택된 나이 값을 가져옴
    setSelectedPeriod(ageGroup) // 선택된 나이 상태 업데이트
    form.setFieldsValue({ ageGroup }) // 폼 필드에 나이 값을 설정
  }

  // 흡연 여부 선택 시 호출되는 핸들러
  const handleSmokeChange = (e: RadioChangeEvent) => {
    const smoke = e.target.value // 선택된 흡연 여부 값을 가져옴
    setSelectedPrice(smoke) // 선택된 흡연 여부 상태 업데이트
    form.setFieldsValue({ smoke }) // 폼 필드에 흡연 여부 값을 설정
  }

  // 검색 상자 열고 닫기 상태를 토글하는 함수
  const handleToggleSearchBox = () => {
    setSearchBoxOpen(!searchBoxOpen) // 현재 상태의 반대값으로 설정 (열고 닫기)
  }

  return (
    <>
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          {/* 검색 바 클릭 시 검색 상자 열기/닫기 */}
          <div className={styles.searchBar} onClick={handleToggleSearchBox}>
            <div>
              {/* 기숙사 선택 섹션 */}
              <p className={styles.title}>
                <span className={styles.require}>*</span>기숙사
              </p>
              {/* 선택된 지역 값 배지로 표시 */}
              <Badge className={styles.cardBadgeArea}>{selectedArea}</Badge>
            </div>
            <div>
              {/* 나이 선택 섹션 */}
              <p className={styles.title}>
                <span className={styles.require}>*</span>나이
              </p>
              {/* 선택된 나이 값 배지로 표시 */}
              <Badge className={styles.cardBadgePeriod}>{selectedPeriod}</Badge>
            </div>
            <div className={styles.lastDiv}>
              {/* 흡연 여부 선택 섹션 */}
              <p className={styles.title}>
                <span className={styles.require}>*</span>흡연 여부
              </p>
              {/* 선택된 흡연 여부 값 배지로 표시 */}
              <Badge className={styles.cardBadgePrice}>{selectedPrice}</Badge>
            </div>
          </div>

          {/* 검색 상자가 열려있으면 선택 메뉴 표시 */}
          <div
            className={
              searchBoxOpen
                ? styles.searchChoiceContainer // 상자가 열렸을 때
                : styles.searchChoiceContainerHide // 상자가 닫혔을 때
            }
          >
            <div className={styles.searchChoiceBox}>
              {/* 지역 선택 라디오 그룹 */}
              <div className={styles.searchChoiceArea}>
                <p>지역</p>
                <div className={styles.areaRadioGroup}>
                  <Form.Item
                    name="region" // 폼 필드 이름
                    rules={[
                      {
                        required: true, // 필수 항목
                        message: "지역을 선택해 주세요.", // 미선택 시 표시할 메시지
                      },
                    ]}
                  >
                    <Radio.Group onChange={handleRegionChange}>
                      {/* 지역 목록을 반복하여 라디오 버튼으로 렌더링 */}
                      {region.map((item, index) => (
                        <Radio
                          key={index} // 고유 키 값
                          value={item.region} // 지역 값 설정
                          className={styles.areaRadioBtn}
                        >
                          {item.region} {/* 지역 이름 표시 */}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>

              {/* 나이 선택 라디오 그룹 */}
              <div className={styles.searchChoicePeriod}>
                <p>나이</p>
                <Form.Item
                  name="period" // 폼 필드 이름
                  rules={[
                    {
                      required: true, // 필수 항목
                      message: "나이를 선택해 주세요.", // 미선택 시 표시할 메시지
                    },
                  ]}
                >
                  <Radio.Group
                    className={styles.periodRadioGroup}
                    value={selectedPeriod} // 선택된 나이 값
                    onChange={handlePeriodChange} // 나이 선택 변경 핸들러
                  >
                    {/* 나이 목록을 반복하여 라디오 버튼으로 렌더링 */}
                    {ageGroup.map((item, index) => (
                      <Radio
                        key={index} // 고유 키 값
                        value={item.ageGroup} // 나이 값 설정
                        className={styles.periodRadioBtn}
                      >
                        {item.ageGroup} {/* 나이 그룹 이름 표시 */}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </div>

              {/* 흡연 여부 선택 라디오 그룹 */}
              <div className={styles.searchChoicePrice}>
                <p>흡연 여부</p>
                <Form.Item
                  name="price" // 폼 필드 이름
                  rules={[
                    {
                      required: true, // 필수 항목
                      message: "흡연 여부를 선택해 주세요.", // 미선택 시 표시할 메시지
                    },
                  ]}
                >
                  <Radio.Group
                    className={styles.priceRadioGroup}
                    value={selectedPeriod} // 선택된 흡연 여부 값
                    onChange={handleSmokeChange} // 흡연 여부 선택 변경 핸들러
                  >
                    {/* 흡연 여부 목록을 반복하여 라디오 버튼으로 렌더링 */}
                    {smoke.map((item, index) => (
                      <Radio
                        key={index} // 고유 키 값
                        value={item.smoke} // 흡연 여부 값 설정
                        className={styles.priceRadioBtn}
                      >
                        {item.smoke} {/* 흡연 여부 표시 */}
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
