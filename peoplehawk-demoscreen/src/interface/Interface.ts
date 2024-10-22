export interface CourseInterest {
  id: number;
  name: string;
  description: string;
  features: string;
  likes: string;
  courses: string;
  color1: string;
  color2: string;
}

export interface ChartData {
  id: number;
  a: number;
  c: number;
  e: number;
  i: number;
  r: number;
  s: number;
  career_code: string;
}

export interface FileUploadData {
  file: File;
}

export interface CountryList {
  id: number;
  countryName: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface ForgotPasswordValues {
  email: string;
}

export interface OptionTypes {
  label: string;
  value: string | number;
  isDisabled?: boolean;
}

export interface Quiz {
  id: number;
  question: string;
}

export interface QuizResult {
  quizId: number;
  answer: number;
}

export interface SubmitTest {
  userId: number;
  quizId: number;
  answer: number;
  testNo: number;
}

export interface CandidateProgress {
  isResumeUpload: boolean;
  progress: number;
}

export interface QuizStatus {
  isFirstTestGiven: boolean;
  testNo: number;
  quizResponse: QuizResult[] | null;
}

export interface Competency {
  id: number;
  title: string;
  competency_part: string;
}

export interface UserCompetency {
  id: number;
  name: string;
  compentencies: number;
}

export interface Owner {
  firstName: string;
  middleName: string;
  lastName: string;
  mail: string;
}

export interface Completion {
  isPersonalityQuizGiven: boolean;
  isGames: boolean;
  isVideoInterview: boolean;
  isCVOptimized: boolean;
  isCompentencyQuizGiven: boolean;
  isDocumentGiven: boolean;
  isCVUploaded: boolean;
}

export interface MemberAnalytics {
  userId: number;
  firstName: string;
  memberType: string;
  lastName: string;
  email: string;
  country: CountryList;
  ownedBy: Owner | null;
  completion: Completion;
  isResumeUpload: boolean;
  isProfilePhoto: boolean;
  photoContent: string | null;
  shortlist: Shortlist[];
}

export interface PaginatedList<T> {
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[];
}

export interface OrderBy {
  field: string;
  direction: string;
}

export interface IdType {
  id: string;
  name: string;
}

export type StateValue =
  | string
  | string[]
  | number
  | OrderBy
  | undefined
  | null
  | boolean
  | number[]
  | IdType[];

export interface KeyValue {
  [key: string]: StateValue;
}

export interface MemberAnalyticsFilter {
  page: number;
  isResume: boolean;
  isPersonalityTest: boolean;
  sortOrder: string;
  orderedBy: number;
  isProfilePhoto: boolean;
  searchTerm: string;
  countryId: number;
  memberType: string;
  sortBy: string;
  isOn: boolean;
}

export interface Subject {
  subject: string;
  grade: string;
  rewardedDate: Date | null;
}

export interface FormValues {
  comments: string;
  subjects: Subject[];
  school: string;
}

export interface EducationData {
  school: string;
  subject: string;
  grade: number;
  rewardedDate: Date;
  comments: string;
}

export interface EducationDetail {
  id: number;
  userId: number;
  school: string;
  subject: string;
  grade: string;
  rewardedDate: Date | null;
  comments: string;
}

export interface Assignment {
  id: number;
  userId: number;
  organisation: string;
  title: string;
  description: string;
  infohraphicResumeDescription: string;
  startDate: Date | null;
  endDate: Date | null;
  isOngoing: boolean;
}

export interface CandidateDetail {
  profilePhoto: string | null;
  firstName: string;
  lastName: string;
  email: string;
  countryName: string;
  memberType: string;
  navigate: boolean;
  aboutMe: string | null;
  userProgress: CandidateProgress;
  competencies: Competency[];
  userCompentencyDetails: UserCompetency[];
  educations: EducationDetail[] | null;
  assignments: Assignment[] | null;
  workExperiences: WorkExperience[] | null;
  courseInterestDetails: CourseInterest[] | null;
  chartDetail: ChartData | null;
  resume: string | null;
  quizDetail: QuizStatus;
  request: Request | null;
  quizQuestion: Quiz | null;
  audioNoteList: AudioNote[];
  textNoteList: TextNote[];
  ownedBy_Client: OwnedByClient | null;
}

export interface WorkExperience {
  id: number;
  userId: number;
  organisation: string;
  role: string;
  roleDescription: string;
  startDate: Date | null;
  endDate: Date | null;
  isOngoing: boolean;
}

export interface ResumeFile {
  id: number;
  fileName: string;
  filePath: string;
  uploadDate: string;
}

export interface AudioNote {
  id: number;
  userId: number;
  file: string;
  sendDate: Date;
}

export interface TextNote {
  id: number;
  userId: number;
  textNote: string;
  sendDate: Date;
}

export interface AboutMeDetail {
  userId: number;
  text: string;
}

export interface Request {
  id: number;
  userId: number;
  isPersonalityTestRequest: boolean;
  isResumeUploadRequest: boolean;
}

export interface Shortlist {
  id: number;
  name: string;
  createdBy: number;
}

export interface UserShortlist {
  id: number;
  name: string;
  userId: number;
  createdBy: number;
}

export interface ShortlistReducerProps {
  list: Shortlist[];
  userList: Shortlist[];
  userId: number;
}

export interface ShareProfileProps {
  id: number;
  email: string;
  message: string;
  linkExpireDuration: number;
  userId: number;
}

export interface ProfileLinkListProps {
  id: number;
  token: string;
  dayToExpire: number;
}

export interface AddClientProps {
  id: number;
  adminId: number;
  lastName: string;
  firstName: string;
  email: string;
  countryId: number;
  roleId: number;
  organisationCode: string;
}

export interface ViewClientProps {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  countryName: string;
  organisationCode: string;
  profilePhoto: string | null;
  isActive: boolean;
}

export interface OwnedByClient {
  clientId: number;
  lastName: string;
  firstName: string;
  email: string;
}

export interface ClientGeneratePasswordProps {
  userId: number;
  password: string;
  confirmPassword: string;
}
