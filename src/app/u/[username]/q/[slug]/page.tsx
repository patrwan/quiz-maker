'use client'

import Layout from "@/components/layout/layout";
import Quiz from "@/components/quiz/Quiz";
import { useParams, usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Question as QuestionType } from '@/types/question';
import { QuestionList as QuestionListType } from '@/types/question';

const data: QuestionListType[] = [
  {
    id: 1,
    name: "quiz-1",
    questions: [
      {
        id: 1,
        question: "Color favorito",
        answerList: [
          { id: 1, answer: "Azul", isCorrect: false },
          { id: 2, answer: "Morado", isCorrect: true },
          { id: 3, answer: "Rojo", isCorrect: false },
          { id: 4, answer: "Negro", isCorrect: false }
        ]
      },
      {
        id: 2,
        question: "Comida Favorita",
        answerList: [
          { id: 1, answer: "Pizza", isCorrect: true },
          { id: 2, answer: "Completos", isCorrect: false },
          { id: 3, answer: "Empanadas", isCorrect: false },
          { id: 4, answer: "Sushi", isCorrect: false }
        ]
      },
      {
        id: 3,
        question: "Banda Favorita",
        answerList: [
          { id: 1, answer: "Artic Monkeys", isCorrect: false },
          { id: 2, answer: "Twice", isCorrect: false },
          { id: 3, answer: "Tweny One Pilots", isCorrect: true },
          { id: 4, answer: "Red Hot Chilli Peppers", isCorrect: false }
        ]
      },
      {
        id: 4,
        question: "Anime Favorito",
        answerList: [
          { id: 1, answer: "Kimetsu no Yaiba", isCorrect: false },
          { id: 2, answer: "One Piece", isCorrect: true },
          { id: 3, answer: "Jujutsu Kaisen", isCorrect: false },
          { id: 4, answer: "Boku no hero academia", isCorrect: false }
        ]
      }
    ],
    privacity: true,
    date: "",
  },
  {
    id: 2,
    name: "quiz-2",
    questions: [],
    privacity: false,
    date: "",
  },
];

export default function Page() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const pathname = usePathname();

  const params = useParams();

  const username = params?.username; // "pato"
  const quizName = params?.slug;

  function getQuizName() {
    return pathname.trim().split("/").pop();
  }


  useEffect(() => {
    const getQuestionList = data.find(q => q.name === getQuizName());

    if (getQuestionList) {
      setQuestions(getQuestionList.questions)
    }

  }, [])

  return (
    <Layout>
      <div className="p-10 flex flex-col justify-center items-center  h-full">
        <h1 className="text-4xl font-bold">{quizName}</h1>
        {/*username*/}
        <Quiz questionList={questions} />
      </div>
    </Layout>
  )
}