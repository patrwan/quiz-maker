export interface Answer {
    id: number;
    answer: string;
    isCorrect: boolean;
}

export interface Question {
    id: number;
    question: string;
    answerList: Answer[];
}

export interface QuizResults {
    [questionId: number]: boolean;
}

export interface QuestionList {
    id: number;
    name: string;
    questions: Question[];
    privacity: boolean,
    date:string
}