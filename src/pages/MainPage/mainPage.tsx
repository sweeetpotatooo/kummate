// MainPage.tsx

import React, { useState, useEffect } from "react";
import styles from "./mainPage.module.css";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import { message, Spin, Modal } from "antd";
import {
  API_URL,
} from "../../api";
import MainPostCard from "../../components/MainPostCard/mainPostCard";
import PostModal from "../../components/PostModal/postModal";
import RecommendModal from "../../components/RecommendModal/recommendModal";
import useFetch from "../../hooks/useFetch";
import { Post, User, FetchData, ApiResponse } from "../../interface/interface";
import RecommendCard from "../../components/RecommendCard/recommendCard";

const CustomRightArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button onClick={onClick} className={styles.customRightArrow}>
    <AiFillCaretRight className={styles.RightArrow} size={50} />
  </button>
);

const CustomLeftArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button onClick={onClick} className={styles.customLeftArrow}>
    <AiFillCaretLeft className={styles.LeftArrow} size={50} />
  </button>
);

const MainPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userToken = useSelector((state: RootState) => state.user.data.token);
  
  // 로그인 상태 체크
  const isLogged = useSelector((state: RootState) =>
    Boolean(state.user.data.token.atk),
  );

  const navigate = useNavigate();

  // 추천 룸메이트 패칭
  const {
    datas: recommendDatas,
    isSuccess: recommendSuccess,
    error: recommendError,
    setUrl: setRecommendUrl,
    setHeaders: setRecommendHeaders,
    setMethod: setRecommendMethod,
    setBody: setRecommendBody,
    isLoading: recommendLoading,
  } = useFetch<User[]>("", "", {}, null);

  // 게시글 패칭
  const {
    datas: postDatas,
    isSuccess: postSuccess,
    isLoading: postLoading,
    setUrl: setPostUrl,
    setHeaders: setPostHeaders,
    setMethod: setPostMethod,
    setBody: setPostBody,
  } = useFetch<FetchData | null>("", "", {}, null);

  // 유저 프로필 패칭
  const {
    datas: profileDatas,
    isSuccess: profileDatasSuccess,
    setUrl: setProfileDatasUrl,
    setHeaders: setProfileHeaders,
    setMethod: setProfileMethod,
    setBody: setProfileBody,
  } = useFetch<ApiResponse<User> | null>("", "", {}, null);

  // 추천 룸메이트 제목 설정
  let recommendTitle: React.ReactNode = "방갑고에서 추천하는 룸메이트를 만나보세요";
  if (!isLogged) {
    recommendTitle = "로그인 후 추천하는 룸메이트를 만나보세요";
  } else if (recommendError) {
    recommendTitle = (
      <>
        회원님의 정보를 입력 후 <br /> 추천하는 룸메이트를 만나보세요
      </>
    );
  }

  useEffect(() => {
    if (postSuccess && postDatas) {
      setPosts(postDatas.data.articles || []);
    }
  }, [postSuccess, postDatas, posts]);

  useEffect(() => {
    if (selectedUser) {
      console.log("Selected User:", selectedUser);
    }
  }, [selectedUser]);
  
  useEffect(() => {
    if (selectedUserProfile) {
      console.log("Selected User Profile:", selectedUserProfile);
    }
  }, [selectedUserProfile]);

  // 추천 룸메이트 데이터 패칭
  useEffect(() => {
    if (isLogged) {
      setRecommendUrl(`${API_URL}/user/similar?size=12`);
      setRecommendMethod("GET");
      setRecommendHeaders({
        Authorization: `Bearer ${userToken.atk}`,
        "Content-Type": "application/json",
      });
      setRecommendBody(null);
    }
  }, [isLogged, setRecommendUrl, setRecommendMethod, setRecommendHeaders, setRecommendBody, userToken.atk]);

  useEffect(() => {
    if (recommendSuccess) {
      setUsers(recommendDatas || []);
    }
  }, [recommendSuccess, recommendDatas]);

  // 메인 페이지 게시글 데이터 패칭
  useEffect(() => {
    setPostUrl(`${API_URL}/api/articles?page=1&size=12&isRecruiting=true`);
    setPostMethod("GET");
    setPostHeaders({
      "Content-Type": "application/json",
    });
    setPostBody(null);
  }, [setPostUrl, setPostMethod, setPostHeaders, setPostBody]);

  useEffect(() => {
    if (postSuccess && postDatas) {
      setPosts(postDatas.data.articles || []);
      console.log("Fetched posts:", postDatas.data.articles); // 추가된 로그
    }
  }, [postSuccess, postDatas]);

  // 유저 프로필 데이터 패칭
  useEffect(() => {
    if (selectedUser) {
      setProfileDatasUrl(`${API_URL}/user/profile/${selectedUser.user_id}`); // user_id 사용
      setProfileMethod("GET");
      setProfileHeaders({
        Authorization: `Bearer ${userToken.atk}`,
        "Content-Type": "application/json",
      });
      setProfileBody(null);
    }
  }, [selectedUser, userToken.atk, setProfileDatasUrl, setProfileMethod, setProfileHeaders, setProfileBody]);
  
  useEffect(() => {
    if (profileDatasSuccess&& profileDatas) {
      setSelectedUserProfile(profileDatas.data);
    }
  }, [profileDatasSuccess, profileDatas]);

  // 추천 룸메이트 오류 처리
  useEffect(() => {
    if (isLogged && recommendError) {
      Modal.error({
        title: "프로필 설정",
        content: "내 정보 설정 후 이용해주세요.",
        onOk: () => navigate("/MyPage"),
      });
    }
  }, [recommendError, navigate, isLogged]);

  const responsive = {
    XLarge: {
      breakpoint: { max: 18000, min: 1200 },
      items: 4,
      slidesToSlide: 4,
    },
    Large: {
      breakpoint: { max: 1200, min: 950 },
      items: 3,
      slidesToSlide: 3,
    },
    midiuem: {
      breakpoint: { max: 950, min: 700 },
      items: 2,
      slidesToSlide: 2,
    },
    small: {
      centermode: true,
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const handlePostClick = (post: Post) => {
    if (isLogged) {
      setSelectedPost(post);
    } else {
      messageApi.error("로그인이 필요합니다.");
    }
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleUserClick = (user: User) => {
    console.log("Selected user:", user); // 추가된 로그
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainPost}>
        <div className={styles.title}>룸메이트 구해요</div>
        <div className={styles.carouselWrapper}>
          {postLoading ? (
            <Spin
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ) : (
            <MultiCarousel
              responsive={responsive}
              infinite={false}
              draggable={true}
              showDots={false}
              customRightArrow={<CustomRightArrow />}
              customLeftArrow={<CustomLeftArrow />}
            >
              {posts.map((post) => (
                <div key={post.id} className={styles.carouselItem}>
                  <MainPostCard
                    post={post}
                    onClick={() => handlePostClick(post)}
                  />
                </div>
              ))}
            </MultiCarousel>
          )}
        </div>
      </div>
      <div className={styles.recommendPost}>
        <div className={styles.title}>{recommendTitle}</div>
        <div className={styles.carouselWrapper}>
          {recommendLoading ? (
            <Spin
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ) : users.length > 0 ? (
            <MultiCarousel
              responsive={responsive}
              infinite={false}
              draggable={true}
              showDots={false}
              customRightArrow={<CustomRightArrow />}
              customLeftArrow={<CustomLeftArrow />}
            >
              {users.map((user) => (
                <div key={user.user_id} className={styles.carouselItem}>
                  <RecommendCard
                    user={user}
                    onClick={() => handleUserClick(user)}
                  />
                </div>
              ))}
            </MultiCarousel>
          ) : (
            <p className={styles.noRecommend}>
              지금은 추천 받을 룸메이트가 없습니다 <br />
            </p>
          )}
        </div>
      </div>
      {selectedPost && (
        <PostModal post={selectedPost} onClose={handleCloseModal} />
      )}
      {selectedUser && selectedUserProfile &&(
        <RecommendModal
          user={selectedUser}
          userProfile={selectedUserProfile}
          visible={isModalVisible}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {contextHolder}
    </div>
  );
};

export default MainPage;
