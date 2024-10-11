// src/pages/RoomMate/roomMate.tsx

import styles from "./roomMate.module.css";
import PostCard from "../../components/PostCard/postCard";
import { Button, Pagination, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { API_URL } from "../../api";
import { Post, SearchQuery, PostData } from "../../interface/interface";
import { RedoOutlined } from "@ant-design/icons";
import SearchBar from "../../components/SearchBar/searchBar";
import useFetch from "../../hooks/useFetch";
import { UserProfile } from "../../interface/interface";
import { userMyprofile } from "../../api";
import { Searchsmoke, Searchregion } from "../../object/profileDropdown";

const RoomMate: React.FC = () => {
  // 상태 선언
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 상태
  const [showRecruiting, setShowRecruiting] = useState(true); // 모집 중인 게시글만 볼 것인지에 대한 상태
  const [posts, setPosts] = useState<Post[]>([]); // 게시글 목록 상태
  const [count, setCount] = useState(0); // 전체 게시글 개수 상태
  const isLogged = useSelector((state: RootState) =>
    Boolean(state.user.data.token.atk)
  ); // Redux 상태에서 사용자 로그인 여부를 확인
  const pageSize = 9; // 페이지당 게시글 수
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const [messageApi, contextHolder] = message.useMessage(); // Ant Design의 메시지 API 사용
  const [isSearched, setIsSearched] = useState(false); // 검색 여부 상태
  const [searchBoxOpen, setSearchBoxOpen] = useState(false); // 검색창 열림 여부 상태
  const [queryString, setQueryString] = useState(""); // 검색 쿼리 문자열 상태
  const [query, setQuery] = useState<SearchQuery>({
    area: "",
    ageGroup: "",
    smoke: "",
    gender: "",
  }); // 검색 필터링에 사용할 쿼리 상태

  const userToken = useSelector((state: RootState) => state.user.data.token); // Redux 상태에서 사용자 토큰 가져오기

  // 유저 프로필 정보를 가져오는 fetch 훅
  const {
    datas: profileData,
    setUrl: setProfileUrl,
    setHeaders: setProfileHeaders,
    setMethod: setProfileMethod,
    setBody: setProfileBody,
  } = useFetch<UserProfile | null>("", "GET", {}, null);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 사용자 프로필 API를 호출
    setProfileUrl(`${API_URL}/api/${userMyprofile}`);
    setProfileMethod("GET");
    setProfileHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken.atk}` || "",
    });
    setProfileBody(null);
  }, [setProfileBody, setProfileHeaders, setProfileMethod, setProfileUrl, userToken]);

  // 검색 결과를 처리하는 함수
  const handleSearchResults = (results: Post[]) => {
    setPosts(results); // 검색 결과로 게시글 목록 업데이트
    setIsSearched(true); // 검색 상태를 true로 변경
  };

  // 페이지네이션 처리를 위한 함수
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 현재 페이지 상태를 업데이트
  };

  // 글쓰기 페이지로 이동하는 함수
  const goToWritePage = () => {
    if (isLogged === true) {
      // 로그인 여부 확인
      if (profileData?.gender !== "null" && profileData?.gender) {
        // 사용자 프로필에 성별 정보가 있는지 확인
        navigate("/WritePage"); // 글쓰기 페이지로 이동
      } else {
        messageApi.info("내 정보를 입력 후 사용해주세요."); // 성별 정보가 없으면 메시지 표시
      }
    } else {
      messageApi.error("로그인이 필요합니다."); // 로그인이 안 되어 있으면 오류 메시지 표시
    }
  };

  // 새로고침 함수
  const refresh = () => {
    window.location.reload(); // 페이지를 새로고침
  };

  // smoke 값 변환 함수
  const getSmokeValue = (label: string): string => {
    const smokeOption = Searchsmoke.find((item) => item.label === label);
    return smokeOption ? smokeOption.value : "";
  };

  // **매핑 함수 수정 시작**

  // 성별 매핑 함수 (백엔드 Enum 값과 일치하도록 수정)
  const getGenderValue = (label: string): string => {
    switch (label) {
      case "남자":
        return "남자"; // 백엔드 Gender enum 값
      case "여자":
        return "여자"; // 백엔드 Gender enum 값
      default:
        return "";
    }
  };

  // 연령대 매핑 함수 (백엔드 Enum 값과 일치하도록 수정)
  const getAgeGroupValue = (label: string): string => {
    switch (label) {
      case "20 ~ 22":
        return "20 ~ 22"; // 백엔드 ageGroup enum 값
      case "23 ~ 25":
        return "23 ~ 25"; // 백엔드 ageGroup enum 값
      case "26 ~ ":
        return "26 ~ "; // 백엔드 ageGroup enum 값
      default:
        return "";
    }
  };

  // 지역 매핑 함수 (백엔드 Enum 값과 일치하도록 수정)
  const getRegionValue = (label: string): string => {
    switch (label) {
      case "모시래 4인실":
        return "모시래 4인실"; // 백엔드 Dorm enum 값
      case "모시래 3인실":
        return "모시래 3인실"; // 백엔드 Dorm enum 값
      case "해오름 4인실":
        return "해오름 4인실"; // 백엔드 Dorm enum 값
      case "해오름 3인실":
        return "해오름 3인실"; // 백엔드 Dorm enum 값
      default:
        return "";
    }
  };

  // **매핑 함수 수정 끝**

  // 검색 필터링 함수
  const handleSearch = async (
    searchQuery: SearchQuery,
    page = 1,
    size = 9,
    showRecruitingFlag?: boolean
  ) => {
    setQuery(searchQuery); // 검색 쿼리 상태 업데이트
    setIsSearched(true); // 검색 상태 업데이트

    const searchParamsObj: Record<string, string> = {
      page: page.toString(),
      size: size.toString(),
      // isRecruiting는 사용자가 명시적으로 선택한 경우에만 추가
    };

    if (typeof showRecruitingFlag === 'boolean') {
      searchParamsObj.isRecruiting = showRecruitingFlag.toString();
    }

    if (searchQuery.area !== "기숙사" && searchQuery.area !== "상관 없음") {
      const mappedRegion = getRegionValue(searchQuery.area);
      if (mappedRegion) {
        searchParamsObj.region = mappedRegion;
      }
    }

    if (searchQuery.ageGroup !== "나이" && searchQuery.ageGroup !== "상관 없음") {
      const mappedAgeGroup = getAgeGroupValue(searchQuery.ageGroup);
      if (mappedAgeGroup) {
        searchParamsObj.ageGroup = mappedAgeGroup;
      }
    }

    const smokeValue = getSmokeValue(searchQuery.smoke);
    if (smokeValue !== "") {
      searchParamsObj.smoke = smokeValue;
    }

    if (searchQuery.gender !== "성별" && searchQuery.gender !== "상관 없음") {
      const mappedGender = getGenderValue(searchQuery.gender);
      if (mappedGender) {
        searchParamsObj.gender = mappedGender;
      }
    }

    const searchParams = new URLSearchParams(searchParamsObj);
    const newQueryString = searchParams.toString();
    setQueryString(newQueryString); // 쿼리 문자열 상태 업데이트

    // **캐시 방지를 위한 콘솔 출력 (디버깅 용도)**
    console.log("Search Parameters:", searchParamsObj);

    try {
      const response = await fetch(
        `${API_URL}/api/articles/filter?${newQueryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken.atk}` || "",
          },
          cache: "no-cache", // 캐싱 방지
        }
      ); // 필터링된 검색 결과를 API로 요청

      if (response.status === 304) {
        throw new Error("데이터가 변경되지 않았습니다."); // 304 응답 처리
      }

      if (!response.ok) {
        throw new Error("서버 연결 실패"); // 응답이 실패하면 오류 발생
      }

      const data = await response.json(); // 응답 데이터를 JSON으로 변환
      if (data.code === 200) {
        handleSearchResults(data.data.articles);
        setSearchBoxOpen(!searchBoxOpen);
        setCount(data.data.totalCnt);
      } else {
        throw new Error("API Error: " + data.message);
      }
    } catch (error: unknown) {
      console.error("에러", error); // 오류 발생 시 콘솔에 출력
      setSearchBoxOpen(!searchBoxOpen); // 검색창 상태 토글
      messageApi.error("검색된 결과가 없습니다."); // 검색 결과가 없으면 메시지 표시
    }
  };

  // 데이터 fetch 훅 설정
  const {
    datas: fetchedData, // 가져온 데이터 상태
    isLoading: fetchDataLoading, // 데이터 로딩 상태
    isSuccess: fetchDataSuccess, // 데이터 성공적으로 가져왔는지 여부
    setUrl, // API 요청 URL 설정 함수
    setHeaders, // API 요청 헤더 설정 함수
    setMethod, // API 요청 메서드 설정 함수
    setBody, // API 요청 본문 설정 함수
  } = useFetch<PostData | null>("", "GET", {}, null); // useFetch 훅 사용

  useEffect(() => {
    if (isSearched === false) {
      setUrl(
        `${API_URL}/api/articles?page=${currentPage}&size=${pageSize}&isRecruiting=${showRecruiting}`
      );
    } else {
      setUrl(`${API_URL}/api/articles/filter?${queryString}`);
    }

    setMethod("GET");
    setHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken.atk}` || "",
    });
    setBody(null);
  }, [
    currentPage,
    showRecruiting,
    isSearched,
    setMethod,
    setHeaders,
    setBody,
    setUrl,
    queryString,
    pageSize,
    userToken,
  ]);

  useEffect(() => {
    if (fetchDataSuccess && fetchedData !== null) {
      try {
        console.log("Fetched data:", fetchedData);
        if (Array.isArray(fetchedData.data)) {
          // /api/articles 엔드포인트의 응답 처리
          setPosts(fetchedData.data);
          setCount(fetchedData.data.length);
        } else {
          // /api/articles/filter 엔드포인트의 응답 처리
          setPosts(fetchedData.data.articles || []);
          setCount(fetchedData.data.totalCnt || 0);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [fetchDataSuccess, fetchedData]);

  // 모집글과 전체글 토글 버튼
  const toggleRecruitOnly = () => {
    setShowRecruiting((prevShowRecruiting) => {
      const nextShowRecruiting = !prevShowRecruiting; // 현재 모집 중 필터 상태 토글

      if (isSearched === true) {
        handleSearch(query, currentPage, pageSize, nextShowRecruiting); // 검색된 상태라면 다시 검색 필터 적용
      }

      return nextShowRecruiting; // 다음 상태 반환
    });
  };

  return (
    <>
      <SearchBar onSearch={(searchQuery) => handleSearch(searchQuery, 1, pageSize, showRecruiting)} /> {/* 검색바 컴포넌트 렌더링 */}
      <div className={styles.roomMateContainer}>
        <div className={styles.roomMateTitle}>
          <div className={styles.roomMateTitleText}>룸메이트 구해요</div> {/* 타이틀 */}
          <div className={styles.roomMateBtn}>
            <Button className={styles.circleBtn} shape="circle" onClick={refresh}>
              <RedoOutlined /> {/* 새로고침 버튼 */}
            </Button>
            <Button onClick={toggleRecruitOnly}>
              {showRecruiting ? "진행중" : "마감"} {/* 모집 중/전체 보기 토글 버튼 */}
            </Button>
            <Button onClick={goToWritePage}>글쓰기</Button> {/* 글쓰기 버튼 */}
          </div>
        </div>
        <div className={styles.cardGrid}>
          {fetchDataLoading ? (
            <Spin
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            /> // 데이터를 로딩 중일 때 로딩 스피너 표시
          ) : (
            <PostCard posts={posts} /> // 데이터를 불러온 후 게시글 카드 렌더링
          )}
        </div>
        <Pagination
          className={styles.pagination}
          current={currentPage}
          onChange={handlePageChange}
          total={count}
          pageSize={pageSize}
        />{" "}
        {/* 페이지네이션 컴포넌트 */}
        {contextHolder} {/* 메시지 컨텍스트 홀더 */}
      </div>
    </>
  );
};

export default RoomMate;
