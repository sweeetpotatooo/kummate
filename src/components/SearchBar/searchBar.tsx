import { SearchOutlined } from "@ant-design/icons";
import { Badge, Radio, Button, RadioChangeEvent } from "antd";
import {
  Searchregion,
  Searchgender,
  SearchageGroup, // 나이 필터
  Searchsmoke, // 흡연 여부 필터
} from "../../object/profileDropdown"; // 검색 필터에 사용될 데이터 import
import styles from "../../components/SearchBar/searchBar.module.css"; // 스타일링 import
import { useState } from "react"; // 상태 관리를 위해 useState 사용
import { RoomMateSearchProps } from "../../interface/interface"; // 컴포넌트 Prop 타입 정의

const SearchBar: React.FC<RoomMateSearchProps> = ({ onSearch }) => {
  // 검색창의 열림/닫힘 상태를 관리하는 state
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  // 지역, 나이, 흡연 여부, 성별 필터의 선택된 값을 관리하는 state
  const [selectedArea, setSelectedArea] = useState("기숙사");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("나이");
  const [selectedSmoke, setSelectedSmoke] = useState("흡연"); // 흡연 여부 필터 state
  const [selectedGender, setSelectedGender] = useState("성별");

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = () => {
    // 선택된 필터 값을 기반으로 검색 쿼리 객체 생성
    const query = {
      area: selectedArea,
      ageGroup: selectedAgeGroup,
      smoke: selectedSmoke, // 흡연 여부 필터 추가
      gender: selectedGender,
    };

    // 부모 컴포넌트에 검색 쿼리 전달
    onSearch?.(query);
    // 검색창 닫기
    setSearchBoxOpen(!searchBoxOpen);
  };

  // 검색창 열림/닫힘 상태를 토글하는 함수
  const handleToggleSearchBox = () => {
    setSearchBoxOpen(!searchBoxOpen);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        {/* 검색 바 - 클릭 시 검색창이 열림 */}
        <div className={styles.searchBar} onClick={handleToggleSearchBox}>
          {/* 지역 필터 */}
          <div>
            <p>지역</p>
            <Badge className={styles.cardBadgeArea}>{selectedArea}</Badge>
          </div>
          {/* 나이 필터 */}
          <div>
            <p>나이</p>
            <Badge className={styles.cardBadgePeriod}>{selectedAgeGroup}</Badge>
          </div>
          {/* 흡연 여부 필터 */}
          <div>
            <p>흡연 여부</p>
            <Badge className={styles.cardBadgePrice}>{selectedSmoke}</Badge>
          </div>
          {/* 성별 필터 */}
          <div className={styles.lastDiv}>
            <p>성별</p>
            <Badge className={styles.cardBadgeGender}>{selectedGender}</Badge>
          </div>
          {/* 검색 아이콘 - 클릭 시 검색 수행 */}
          <SearchOutlined
            className={styles.searchIcon}
            onClick={() => handleSearch()}
            style={{ fontSize: 20, color: "#b9b9b9" }}
          />
        </div>
        {/* 검색창이 열렸을 때 표시되는 필터 선택 영역 */}
        {searchBoxOpen && (
          <div className={styles.searchChoiceContainer}>
            <div className={styles.searchChoiceBox}>
              {/* 지역 선택 필터 */}
              <div className={styles.searchChoiceArea}>
                <p>기숙사</p>
                <div className={styles.areaRadioGroup}>
                  <Radio.Group
                    onChange={(e) => setSelectedArea(e.target.value)}
                  >
                    {Searchregion.map((item, index) => (
                      <Radio
                        key={index}
                        value={item.region}
                        className={styles.areaRadioBtn}
                      >
                        {item.region}
                      </Radio>
                    ))}
                  </Radio.Group>
                </div>
              </div>
              {/* 나이 선택 필터 */}
              <div className={styles.searchChoicePeriod}>
                <p>나이</p>
                <Radio.Group
                  className={styles.periodRadioGroup}
                  value={selectedAgeGroup}
                  onChange={(e) => setSelectedAgeGroup(e.target.value)}
                >
                  {SearchageGroup.map((item, index) => (
                    <Radio
                      key={index}
                      value={item.ageGroup}
                      className={styles.periodRadioBtn}
                    >
                      {item.ageGroup}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
              {/* 흡연 여부 선택 필터 */}
              <div className={styles.searchChoicePrice}>
                <p>흡연</p>
                <Radio.Group
                  className={styles.priceRadioGroup}
                  value={selectedSmoke}
                  onChange={(e) => setSelectedSmoke(e.target.value)}
                >
                  {Searchsmoke.map((item, index) => (
                    <Radio
                      key={index}
                      value={item.smoke}
                      className={styles.priceRadioBtn}
                    >
                      {item.smoke}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
              {/* 성별 선택 필터 */}
              <div className={styles.searchChoiceGender}>
                <p>성별</p>
                <Radio.Group
                  className={styles.genderRadioGroup}
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                >
                  {Searchgender.map((item, index) => (
                    <Radio
                      key={index}
                      value={item.name}
                      className={styles.genderRadioBtn}
                    >
                      {item.name}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
            </div>
            {/* 검색 버튼 */}
            <Button
              className={styles.searchChoiceBtn}
              type="primary"
              onClick={() => handleSearch()}
            >
              검색하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
