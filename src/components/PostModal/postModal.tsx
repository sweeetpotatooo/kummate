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

const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const userEmail = useSelector((state: RootState) => state.user.data.email);
  const userToken = useSelector((state: RootState) => state.user.data.token); // userToken 정의
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const favoritesStatus = useSelector((state: RootState) => state.favorites.status);

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
  const [isFavorite, toggleFavorite] = useFavorite(post.id); // [isFavorite, toggleFavorite]
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);

  // 신청 상태
  const [, toggleApply] = useApply(post.id);
  const [applyIsSaved, setApplyIsSaved] = useState(false);
  const applySave = applyIsSaved
    ? `${styles.apply} ${styles.applyActive}`
    : styles.apply;

  // 신청하기
  const handleApplyClick = useCallback(async () => {
    try {
      await toggleApply();
      setApplyIsSaved((prevIsSaved) => !prevIsSaved);
    } catch (error) {
      console.error(error);
      toast.error("신청 처리에 실패했습니다.");
    }
  }, [toggleApply]);

  // 신청 현황 가져오기
  // Removed manual fetchFavoriteStatus and fetchApplyStatus

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
        setDeleteBody(null); // DELETE 요청에는 body가 필요 없을 수 있습니다
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
                className={isFavorite ? `${styles.save} ${styles.saveActive}` : styles.save}
                disabled={favoritesStatus === 'loading' || isLoadingFavorite} // 로딩 시 버튼 비활성화
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
                <Button className={styles.editButton} onClick={handleEditClick}>
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
                className={applySave}
                style={{ float: "right" }}
                onClick={handleApplyClick}
              >
                신청하기
              </button>
            )}
          </div>
          <div className={styles.line}></div>
          <div className={styles.cardBadgeContainer}>
            <Badge className={styles.cardBadgeArea}>{post.region}</Badge>
            <Badge className={styles.cardBadgeAgeGroup}>{post.ageGroup}</Badge>
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
                className={isFavorite ? `${styles.save} ${styles.saveActive}` : styles.save}
                disabled={favoritesStatus === 'loading' || isLoadingFavorite} // 로딩 시 버튼 비활성화
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
                className={applySave}
                style={{ float: "right" }}
                onClick={handleApplyClick}
              >
                신청하기
              </button>
            )}
          </div>
          <div className={styles.line}></div>
          <div className={styles.cardBadgeContainer}>
            <Badge className={styles.cardBadgeArea}>{post.region}</Badge>
            <Badge className={styles.cardBadgeAgeGroup}>{post.ageGroup}</Badge>
            <Badge className={styles.cardBadgeSmoke}>
              {post.smoke ? "흡연" : "비흡연"}
            </Badge>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PostModal;
