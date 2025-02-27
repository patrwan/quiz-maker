'use client'
import { useRef, useState } from 'react';
import NextButtonSwiper from '@/components/nextButtonSwiper/NextButtonSwiper';
import BackButtonSwiper from '@/components/backButtonSwiper/BackButtonSwiper';
import QuestionSwiper from '@/components/questionSwiper/QuestionSwiper';
import QuizResults from '@/components/quizResults/QuizResults';

import { Question as QuestionType } from '@/types/question';

interface QuizState {
    selectedAnswers: Record<number, string | null>;
    results: Record<number, boolean>;
    allAnswered: boolean;
    verify: boolean;
}

interface QuizProps { }

const questionList: QuestionType[] = [
    {
        id: 1,
        question: "Pregunta 1",
        answerList: [
            { id: 1, answer: "Respuesta 1", isCorrect: true },
            { id: 2, answer: "Respuesta 2", isCorrect: false },
            { id: 3, answer: "Respuesta 3", isCorrect: false },
            { id: 4, answer: "Respuesta 4", isCorrect: false }
        ]
    },
    {
        id: 2,
        question: "Pregunta 2",
        answerList: [
            { id: 1, answer: "Respuesta 1", isCorrect: false },
            { id: 2, answer: "Respuesta 2", isCorrect: true },
            { id: 3, answer: "Respuesta 3", isCorrect: false },
            { id: 4, answer: "Respuesta 4", isCorrect: false }
        ]
    },
    {
        id: 3,
        question: "Pregunta 3",
        answerList: [
            { id: 1, answer: "Respuesta 1", isCorrect: false },
            { id: 2, answer: "Respuesta 2", isCorrect: true },
            { id: 3, answer: "Respuesta 3", isCorrect: false },
            { id: 4, answer: "Respuesta 4", isCorrect: false }
        ]
    },
    {
        id: 4,
        question: "Pregunta 4",
        answerList: [
            { id: 1, answer: "Respuesta 1", isCorrect: false },
            { id: 2, answer: "Respuesta 2", isCorrect: true },
            { id: 3, answer: "Respuesta 3", isCorrect: false },
            { id: 4, answer: "Respuesta 4", isCorrect: false }
        ]
    }
];

export default ({ }: QuizProps) => {
    const [quizState, setQuizState] = useState<QuizState>({
        selectedAnswers: {},
        results: {},
        allAnswered: false,
        verify: false
    });

    const resetQuiz = () => {
        setQuizState({
            selectedAnswers: {},
            results: {},
            allAnswered: false,
            verify: false
        });
    };

    const handleAnswerChange = (questionId: number, answer: string) => {
        setQuizState((prevState) => {
            const updatedAnswers = {
                ...prevState.selectedAnswers,
                [questionId]: answer
            };

            const allAnswered = questionList.every(
                (question) => updatedAnswers[question.id]
            );

            return {
                ...prevState,
                selectedAnswers: updatedAnswers,
                allAnswered
            };
        });
    };

    const verifyAnswers = () => {
        const newResults: Record<number, boolean> = {};

        questionList.forEach((question) => {
            question.answerList.forEach((answer) => {
                if (quizState.selectedAnswers[question.id] === answer.answer) {
                    newResults[question.id] = answer.isCorrect;
                }
            });
        });

        setQuizState((prevState) => ({
            ...prevState,
            verify: !prevState.verify,
            results: newResults
        }));
    };

    const swiperRef = useRef<any>(null);  // Referencia al Swiper.

    const handleNextSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideNext();  // Avanzar a la siguiente diapositiva.
        }
    };

    const handlePrevSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slidePrev();  // Retroceder a la diapositiva anterior.
        }
    };

    return (
        <div>
            {quizState.verify ? (
                <QuizResults results={quizState.results} resetQuiz={resetQuiz} />
            ) : (
                <>
                    <QuestionSwiper
                        questionList={questionList}
                        handleAnswerChange={handleAnswerChange}
                        swiperRef={swiperRef}
                    />
                    {quizState.allAnswered ? (
                        <button
                            className="p-2 bg-green-600 text-white font-bold rounded-md mt-4 w-48"
                            onClick={verifyAnswers}
                        >
                            Verificar
                        </button>
                    ) : (
                        <div className="flex justify-between space-x-4">
                            <BackButtonSwiper onClick={handlePrevSlide} />
                            <NextButtonSwiper onClick={handleNextSlide} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
