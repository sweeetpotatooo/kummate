import { Store, NamePath } from "antd/lib/form/interface"

export interface Token {
  readonly atk: string
  readonly rtk: string
}

export interface UserState {
  readonly isLogged: boolean
  readonly signUp?: boolean
  readonly data: {
    readonly email: string
    readonly token: Token
  }
  readonly email?: string 
  readonly status: "idle" | "loading" | "fulfilled" | "error"
  readonly accessToken?: string
  readonly error?: string
}

export interface LoginValues {
  readonly email: string
  readonly password: string
}

export interface Post {
  readonly id: number;
  readonly email?: string;
  readonly title: string;
  readonly nickname: string;
  readonly content: string;
  readonly gender: string;
  readonly createDate: string;
  readonly region: string;
  readonly ageGroup: string;
  readonly smoke: boolean;
  readonly isRecruiting: boolean;
  readonly image?: string;
}

export interface User {
  readonly id: number
  readonly user_id: number
  readonly nickname: string
  readonly image: string
  readonly email: string
  readonly gender: string
  readonly isSmoker: boolean
  readonly mbti: string
  readonly region: string
  readonly age: number
  readonly activityTime: string
  readonly favoriteTag: string[]
  readonly hateTag: string
  readonly myText: string
  readonly student_id: number
  readonly department: string
  readonly post: Post
  readonly detail: string
}

export interface ModalProps {
  readonly visible?: boolean
  readonly onClose: () => void
}

export interface PostModalProps extends ModalProps {
  readonly post: Post
}

export interface Props {
  readonly posts: Post[]
  readonly currentPage?: number
  readonly showRecruiting?: boolean
  readonly isSearched?: boolean
  readonly initialPosts?: string
  readonly Resultsposts?: Post[]
}

export interface GlobalState extends UserState {
  readonly msg: string
  readonly kakao: boolean
  readonly google: boolean
  readonly token: Token
}

export interface profileTendencyDropdown {
  readonly genderBoxOpen: boolean
  readonly departmentBoxOpen: boolean
  readonly smokeBoxOpen: boolean
  readonly MBTIBoxOpen: boolean
  readonly regionBoxOpen: boolean
  readonly ageGroupBoxOpen: boolean
  readonly activityTimeBoxOpen: boolean
}

export interface profileBasicValues {
  readonly nickname?: string
  readonly email?: string
}

export interface userProfileData extends profileBasicValues {
  readonly password?: string
  readonly gender?: string
  readonly isSmoke?: boolean
  readonly mbti?: string
  readonly region?: string
  readonly ageGroup:string
  readonly age?: number
  readonly student_id?: number
  readonly department?: string;
  readonly activityTime?: string
  readonly favoriteTag?: string[]
  readonly hateTag?: string
  readonly myText?: string
}

export interface ProfileBasicProps extends profileBasicValues {
  readonly setEmail: React.Dispatch<React.SetStateAction<string>>
  readonly setNickname: React.Dispatch<React.SetStateAction<string>>
  readonly profileImage: string
  readonly setProfileImage: React.Dispatch<React.SetStateAction<string>>
}

export interface ProfileFileProps {
  readonly profileImage: string
  readonly setProfileImage: React.Dispatch<React.SetStateAction<string>>
}

export interface profileTendencyProps {
  readonly selectedGender: string
  readonly setSelectedGender: React.Dispatch<React.SetStateAction<string>>
  readonly selectedAge: number
  readonly setSelectedAge: React.Dispatch<React.SetStateAction<number>>
  readonly selectedSmoke: string
  readonly setSelectedSmoke: React.Dispatch<React.SetStateAction<string>>
  readonly selectedMBTI: string
  readonly setSelectedMBTI: React.Dispatch<React.SetStateAction<string>>
  readonly selectedRegion: string
  readonly setSelectedRegion: React.Dispatch<React.SetStateAction<string>>
  readonly selectedAgeGroup: string
  readonly setSelectedAgeGroup: React.Dispatch<React.SetStateAction<string>>
  readonly selectedActivityTime: string
  readonly setSelectedActivityTime: React.Dispatch<React.SetStateAction<string>>
  readonly selectedStudent_id: number
  readonly setSelectedStudent_id: React.Dispatch<React.SetStateAction<number>>
  readonly selectedDepartment: string
  readonly setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>
  readonly myText: string
  readonly setMyText: React.Dispatch<React.SetStateAction<string>>
  readonly favoriteTag: string[]
  readonly setFavoriteTag: React.Dispatch<React.SetStateAction<string[]>>
  readonly handleUpdateProfileSuccess: () => void
}

export interface SearchQuery {
  readonly area: string
  readonly ageGroup: string
  readonly smoke: string
  readonly gender: string
}

export interface RoomMateSearchProps {
  readonly onSearch?: (
    query: SearchQuery,
    page?: number,
    size?: number,
    showRecruiting? : boolean,
  ) => Promise<void>
  readonly post?: Post
  readonly onClick?: () => void
  readonly query?: Post[]
}

export interface ApplyProps {
  readonly applyId: number
  readonly articleId: number
  readonly articleTitle: string
  readonly otherUserId: number
  readonly otherUserName: string
  readonly matchStatus: string
}

export interface ApplicantProps {
  readonly post: ApplyProps
  readonly currentPage: number
  readonly showApply: boolean
}

export interface RecommendModalProps extends ModalProps {
  readonly userProfile: User | null
  readonly user?: User
  readonly showArticles?: boolean
}

export interface Data {
  readonly mbti: string
  readonly nickname: string
  readonly recommendDtoList: {
    readonly id: number
    readonly nickname: string
    readonly mbti: string
  }[]
}

export interface RecommendUser {
  readonly id: number
  readonly nickname: string
  readonly mbti: string
}

export interface UserProfile {
  readonly email: string
  readonly nickname: string
  readonly image: string
  readonly isSmoker: boolean
  readonly activityTime: string
  readonly gender: string
  readonly ageGroup: string
  readonly department: string
  readonly student_id: number
  readonly region: string
  readonly mbti: string
  readonly tags: [string]
  readonly age: number
  readonly detail: string
}

export interface Article {
  readonly id: number
  readonly title: string
}

export interface ApiResponse<T> {
  code: number;
  data: T;
}

export interface ArticlePageDto {
  id: number;
  title: string;
  content: string;
  region: string;
  ageGroup: string;
  smoke: boolean;
  isRecruiting: boolean;
  createDate: string;
  nickname: string;
  email?: string;
  gender:string;
  // 기타 필요한 필드
}

export interface FetchData {
  articles: ArticlePageDto[];
  totalCnt: number;
}

export interface PostDataAll {
  code: number
  data: Post[]
}

// 필터링된 게시글을 반환하는 응답
export interface PostDataFiltered {
  code: number
  data: {
    articles: Post[]
    totalCnt: number
  }
}

// PostData는 두 가지 형태 중 하나
export type PostData = PostDataAll | PostDataFiltered

export interface ChatMessage {
  readonly msg: string
  readonly userEmail: string
  readonly createData?: string
}

export interface ChatList {
  readonly userNickname: string
  readonly roomId: string
}

export interface MessageType {
  readonly roomId: string
  readonly userEmail: string
  readonly msg: string
  readonly createDate: string
}

export interface ValidateErrorEntity {
  readonly values: Store
  readonly errorFields: { name: NamePath; errors: string[] }[]
  readonly outOfDate: boolean
}

export interface MbitCalculatorModalProps {
  readonly isModalVisible: boolean
  readonly handleOk: () => void
  readonly handleCancel: () => void
}

export interface RecommendProps {
  readonly user: RecommendUser
  readonly onClick?: () => void
}