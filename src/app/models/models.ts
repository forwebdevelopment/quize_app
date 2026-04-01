
export interface Category {
  catName: string;
  catId: string;
}

export interface Level {
  levelName: string;
  levelId: number;
}

export interface Subject {
  subject_Name: string;
  subjectId: number;
  catname: string;
}

export interface TenantData {
  categories: Category[];
  levels: Level[];
  subjects: Subject[];
  card:Card[]
}

export interface TenantDataResponse {
  data: TenantData;
  statusCode: number;
  message: string;
}

export interface Card{
  heading:string;
  catName:string;
  levelName:string;
  subject:string;
}



export interface QuizResponse {
  data: QuizData[];
  statusCode: number;
  message: string;
}


export interface QuizData {
  quizeid: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

export interface SubmitAnswer{
  qid:number
  option:string
}
export interface ResponseAnswer{
  qid:number
  correctAns:string,
  ans:boolean
}