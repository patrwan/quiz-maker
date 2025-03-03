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

interface QuizProps { 
    questionList :  QuestionType[]
}

export default ({ questionList }: QuizProps) => {
    const [quizState, setQuizState] = useState<QuizState>({
        selectedAnswers: {},
        results: {},
        allAnswered: true,
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
        <div className='p-10 shadow-md shadow-gray-500 w-full md:w-1/2 h-full '>
            <div className='p-6'>
                <p className='text-4xl text-center font-extrabold'>¿Pregunta 1?</p>
                <p className='text-gray-600'>Autor: <span className='font-bold'>patrwan</span></p>
            </div>

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
                        <div className="flex justify-center space-x-4">
                            <button
                                className="p-2 bg-green-600 text-white font-bold rounded-md mt-4 w-48"
                                onClick={verifyAnswers}
                            >
                                Verificar
                            </button>
                        </div>

                    ) : (
                        <div className="flex w-full justify-center space-x-4">
                            <BackButtonSwiper onClick={handlePrevSlide} />
                            <NextButtonSwiper onClick={handleNextSlide} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};