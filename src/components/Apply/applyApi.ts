//src/components/Apply/applyApi.ts
import { useDispatch } from "react-redux"
import { API_URL, userApplicant, userAprove, userRefuse } from "../../api"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { RootState } from "../../Redux/store"
import { useSelector } from "react-redux"
import { fetchData } from "../../Redux/applyReducer"
import { setSaved } from "../../Redux/savedReducer"
import { Modal } from "antd"
import { ApplyProps } from "../../interface/interface"
// 신청
export const useApply = (postId: number, applyId?: number) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>()
  const isSaved = useSelector((state: RootState) => state.saved[postId])
  const userToken = useSelector((state : RootState) => state.user.data.token)

  const toggleApply = async () => {
    try {
      if (isSaved && applyId) {
        // 신청 취소 요청
        const response = await fetch(`${API_URL}/api/applicant/${applyId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken.atk}`,
          },
        })

        if (!response.ok) {
          if (response.status === 403) {
            Modal.error({
              title: "신청 취소가 불가능합니다",
              content: "신청을 취소할 권한이 없습니다.",
            })
          } else if (response.status === 404) {
            Modal.error({
              title: "신청을 찾을 수 없습니다",
              content: "신청 정보가 존재하지 않습니다.",
            })
          }
          throw new Error("신청 취소를 처리하는데 실패했습니다.")
        }

        // 신청 취소 성공 시 상태 업데이트
        dispatch(setSaved({ postId, isSaved: false }))
        dispatch(fetchData({
          showApply: false, // 신청 취소 시 내가 한 신청이 아닌 상태로 갱신
          currentPage: 1,
          userToken: userToken
        }))
        Modal.success({
          title: "신청이 취소되었습니다.",
          content: "신청을 성공적으로 취소하였습니다.",
        })
      } else {
        // 신청 요청
        const response = await fetch(`${API_URL}/api/applicant`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken.atk}`,
          },
          body: JSON.stringify({
            articleId: postId,
          }),
        })

        if (!response.ok) {
          if (response.status === 400) {
            Modal.error({
              title: "신청이 불가능합니다",
              content: "이미 신청했거나, 신청할 수 없는 게시글입니다.",
            })
          } 
          throw new Error("신청하기를 처리하는데 실패했습니다.")
        }

        // 신청 성공 시 상태 업데이트
        dispatch(setSaved({ postId, isSaved: true }))
        dispatch(fetchData({
          showApply: true,
          currentPage: 1,
          userToken: userToken
        }))
        Modal.success({
          title: "신청이 완료되었습니다.",
          content: "신청을 성공적으로 완료하였습니다.",
        })
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  return [isSaved, toggleApply] as const
}

// 승인
export const updateApprove = async (userToken: { atk: string }, userId: number, articleId: number) => {
  try {

    const response = await fetch(`${API_URL}/api/${userAprove}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken.atk}`,
      },
      body: JSON.stringify({
        "userId": userId,
        "articleId": articleId
      }),
    });

    console.log('updateApprove 응답 상태:', response.status);
    console.log('updateApprove 응답:', response);

    if (!response.ok) {
      throw new Error('매칭 승인 실패');
    }

    const approveData = await response.json();
    console.log('매칭 승인 데이터:', approveData.data);
    return approveData.data;

  } catch (error) {
    console.error('룸메이트 매칭 승인 오류:', error);
    throw error;
  }
};

// 거절
// applyApi.ts

export const updateRefuse = async (userToken: { atk: string }, applyId: number, articleId: number): Promise<ApplyProps> => {
  try {
    const response = await fetch(`${API_URL}/api/${userRefuse}/${applyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken.atk}`,
      },
      body: JSON.stringify({ applyId, articleId }), // articleId 추가
    });

    if (!response.ok) {
      throw new Error('매칭 거절 실패');
    }

    const refuseData = await response.json();
    return refuseData.data;

  } catch (error) {
    console.error('룸메이트 매칭 거절 오류:', error);
    throw error;
  }
};

// 삭제
export const updateDelete = async (userToken: { atk: string }, applyId: number) => {
  try {
    console.log('updateDelete - userTokenAtk:', userToken.atk);
    console.log('updateDelete - applyId:', applyId);

    const response = await fetch(`${API_URL}/api/${userApplicant}/${applyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken.atk}`,
      },
    });

    console.log('updateDelete 응답 상태:', response.status);
    console.log('updateDelete 응답:', response);

    if (!response.ok) {
      throw new Error('삭제 실패');
    }

    const deleteData = await response.json();
    console.log('삭제 데이터:', deleteData.data);
    return deleteData.data;

  } catch (error) {
    console.error('룸메이트 신청현황 삭제 오류:', error);
    throw error;
  }
};
