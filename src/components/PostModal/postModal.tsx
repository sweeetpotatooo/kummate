// src/components/PostModal/postModal.tsx

import React, { useCallback, useEffect, useState } from "react";
import { Modal, Badge, Button } from "antd";
import styles from "./postModal.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import { API_URL } from "../../api";
import { userArticle } from "../../api";
import { PostModalProps } from "../../interface/interface";
import useFavorite from "../Favorite/useFavorite";
import useFetch from "../../hooks/useFetch";
import { useApply } from "../Apply/applyApi";
import { fetchFavorites } from "../Favorite/favoritesThunk";
import { toast } from "react-toastify";
import OtherUserProfile from "../../pages/MyPage/Applicant/otherUserProfile";

const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const userEmail = useSelector((state: RootState) => state.user.data.email);
  const userToken = useSelector((state: RootState) => state.user.data.token);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const favoritesStatus = useSelector(
    (state: RootState) => state.favorites.status
  );
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [authorProfile, setAuthorProfile] = useState(null);

  const handleNicknameClick = async () => {
    try {
      const response = await fetch(`${API_URL}/user/profile/${post.userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken.atk}`,
        },
      });
      const data = await response.json();
      setAuthorProfile(data.data);
      setIsProfileVisible(true);
    } catch (error) {
      console.error("프로필 정보를 가져오는 데 실패했습니다.", error);
      toast.error("프로필 정보를 가져오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const decodeHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleEditClick = () => {
    navigate(`/editPage/${post.id}`, { state: { post } });
  };

  const recruit = (recruiting: boolean) => {
    return recruiting ? "모집" : "마감";
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // 찜하기 상태 관리
  const [isFavorite, toggleFavorite] = useFavorite(post.id);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);

  // 신청 상태 관리
  const [isApplied, setIsApplied] = useState(false);

  // useApply 훅 사용
  const [saved, apply] = useApply(post.id);

  // isApplied 상태를 saved 상태에 따라 초기화
  useEffect(() => {
    setIsApplied(saved);
  }, [saved]);

  // 신청하기 버튼 클릭 핸들러
  const handleApplyClick = useCallback(async () => {
    try {
      await apply();
      setIsApplied(true);
      toast.success("신청이 완료되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error("신청 처리에 실패했습니다.");
    }
  }, [apply]);

  // 삭제하기
  const {
    isLoading: deleteLoading,
    isSuccess: deleteSuccess,
    error: deleteError,
    setUrl: setDeleteUrl,
    setHeaders: setDeleteHeaders,
    setMethod: setDeleteMethod,
    setBody: setDeleteBody,
  } = useFetch<unknown>("", "", {}, null);

  const handleDeleteClick = async () => {
    Modal.confirm({
      title: "이 포스트를 정말로 삭제하시겠습니까?",
      okText: "네",
      okType: "danger",
      cancelText: "아니오",
      onOk: async () => {
        setDeleteUrl(`${API_URL}/api/${userArticle}/${post.id}`);
        setDeleteMethod("DELETE");
        setDeleteHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken.atk}`,
        });
        setDeleteBody(null);
      },
    });
  };

  useEffect(() => {
    if (!deleteLoading && deleteSuccess) {
      setIsDeleted(true);
    } else if (!deleteLoading && deleteError) {
      console.error("Error:", deleteError);
      Modal.error({
        title: "에러 발생",
        content: "포스트를 삭제하는데 오류가 발생했습니다. 다시 시도해 주세요.",
      });
    }
  }, [deleteLoading, deleteSuccess, deleteError]);

  useEffect(() => {
    if (isDeleted) {
      Modal.success({
        title: "성공적으로 삭제되었습니다.",
        content: "이 포스트는 삭제되었습니다.",
        onOk: () => {
          window.location.reload();
        },
      });
    }
  }, [isDeleted]);

  useEffect(() => {
    console.log("Current User Email:", userEmail);
    console.log("Post Author Email:", post.email);
  }, [userEmail, post.email]);

  // 찜하기 버튼 클릭 핸들러
  const handleSaveClick = useCallback(async () => {
    try {
      setIsLoadingFavorite(true);
      await toggleFavorite();
    } catch (error) {
      console.error(error);
      toast.error("찜 처리에 실패했습니다.");
    } finally {
      setIsLoadingFavorite(false);
    }
  }, [toggleFavorite]);

  return (
    <>
      <Modal
        open={true}
        onOk={onClose}
        onCancel={onClose}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        {post.isRecruiting ? (
          <div>
            <Badge className={styles.badgePresent}>
              {recruit(post.isRecruiting)}
            </Badge>
            <div className={styles.titleContainer}>
              <span className={styles.title}>{post.title}</span>
              {userEmail !== post.email && (
                <button
                  onClick={handleSaveClick}
                  className={
                    isFavorite
                      ? `${styles.save} ${styles.saveActive}`
                      : styles.save
                  }
                  disabled={favoritesStatus === "loading" || isLoadingFavorite}
                >
                  {isFavorite ? "찜 취소" : "찜하기"}
                </button>
              )}
            </div>
            <div className={styles.content}>{decodeHTML(post.content)}</div>
            <div className={styles.ProfileContainer}>
              <span className={styles.ProfileContent}>
                <button
                  onClick={handleNicknameClick}
                  className={styles.nicknameButton}
                >
                  {post.nickname}
                </button>{" "}
                {formatDate(post.createDate)}
              </span>
              {userEmail === post.email ? (
                <div className={styles.buttonContainer}>
                  <Button
                    className={styles.editButton}
                    onClick={handleEditClick}
                  >
                    수정하기
                  </Button>
                  <Button
                    className={styles.deleteButton}
                    onClick={handleDeleteClick}
                  >
                    삭제하기
                  </Button>
                </div>
              ) : (
                <button
                  className={`${styles.apply} ${
                    isApplied ? styles.applyActive : ""
                  }`}
                  style={{ float: "right", marginTop: "10px" }}
                  onClick={handleApplyClick}
                  disabled={isApplied}
                >
                  신청하기
                </button>
              )}
            </div>
            <div className={styles.line}></div>
            <div className={styles.cardBadgeContainer}>
              <Badge className={styles.cardBadgeArea}>{post.region}</Badge>
              <Badge className={styles.cardBadgeAgeGroup}>
                {post.ageGroup}
              </Badge>
              <Badge className={styles.cardBadgeSmoke}>
                {post.smoke ? "흡연" : "비흡연"}
              </Badge>
            </div>
          </div>
        ) : (
          <div>
            <Badge className={styles.isBadgePresent}>
              {recruit(post.isRecruiting)}
            </Badge>
            <div className={styles.titleContainer}>
              <span className={styles.title}>{post.title}</span>
              {userEmail !== post.email && (
                <button
                  onClick={handleSaveClick}
                  className={
                    isFavorite
                      ? `${styles.save} ${styles.saveActive}`
                      : styles.save
                  }
                  disabled={favoritesStatus === "loading" || isLoadingFavorite}
                >
                  {isFavorite ? "찜 취소" : "찜하기"}
                </button>
              )}
            </div>
            <div className={styles.content}>{decodeHTML(post.content)}</div>
            <div className={styles.ProfileContainer}>
              <span className={styles.ProfileContent}>
                {post.nickname} {formatDate(post.createDate)}
              </span>
              {userEmail === post.email ? (
                <div className={styles.buttonContainer}>
                  <Button
                    className={styles.deleteButton}
                    onClick={handleDeleteClick}
                  >
                    삭제하기
                  </Button>
                </div>
              ) : (
                <button
                  className={`${styles.apply} ${
                    isApplied ? styles.applyActive : ""
                  }`}
                  style={{ float: "right", marginTop: "10px" }}
                  onClick={handleApplyClick}
                  disabled={isApplied}
                >
                  신청하기
                </button>
              )}
            </div>
            <div className={styles.line}></div>
            <div className={styles.cardBadgeContainer}>
              <Badge className={styles.cardBadgeArea}>{post.region}</Badge>
              <Badge className={styles.cardBadgeAgeGroup}>
                {post.ageGroup}
              </Badge>
              <Badge className={styles.cardBadgeSmoke}>
                {post.smoke ? "흡연" : "비흡연"}
              </Badge>
            </div>
          </div>
        )}
      </Modal>

      {/* OtherUserProfile 컴포넌트 추가 */}
      {isProfileVisible && authorProfile && (
        <OtherUserProfile
          visible={isProfileVisible}
          onClose={() => setIsProfileVisible(false)}
          userProfile={authorProfile}
        />
      )}
    </>
  );
};

export default PostModal;
