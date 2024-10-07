//src/Redux/localStorage.ts
import { UserState } from "../interface/interface"

// 상태를 로컬 스토리지에 저장하는 함수
export const saveToLocalStorage = (state: UserState) => {
  try {
    const token = state.data

    // 토큰이 존재할 때만 로컬 스토리지에 저장
    if (token) {
      console.log("Saving to Local Storage:", state); // 저장 직전에 상태 확인
      const stateString = JSON.stringify(state)
      localStorage.setItem("state", stateString)  // 상태를 문자열로 변환하여 로컬 스토리지에 저장
    }
  } catch (error) {
    console.warn(error)  // 에러가 발생하면 경고 출력
  }
}

// 로컬 스토리지에서 상태를 불러오는 함수
export const loadFromLocalStorage = (): UserState | undefined => {
  try {
    const serializedState = localStorage.getItem("state")  // 로컬 스토리지에서 상태 가져오기
    if (serializedState === null) return undefined  // 상태가 없으면 undefined 반환
    return JSON.parse(serializedState) as UserState  // 문자열을 객체로 변환하여 반환
  } catch (error) {
    console.warn(error)  // 에러가 발생하면 경고 출력
    return undefined  // 에러가 발생하면 undefined 반환
  }
}
