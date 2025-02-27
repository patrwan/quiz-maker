'use client'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


import { EffectCards } from 'swiper/modules';

import './styles.css';

import NextButtonSwiper from '@/components/nextButtonSwiper/NextButtonSwiper';
import BackButtonSwiper from '@/components/backButtonSwiper/BackButtonSwiper';
import { useState } from 'react';

const questionList = [
    {
        id: 1,
        question: "Pregunta 1",
        answerList: [
            {
                id: 1,
                answer: "Respuesta 1",
                isCorrect: true
            },
            {
                id: 2,
                answer: "Respuesta 2",
                isCorrect: false
            },
            {
                id: 3,
                answer: "Respuesta 3",
                isCorrect: false
            },
            {
                id: 4,
                answer: "Respuesta 4",
                isCorrect: false
            },
        ]
    },
    {
        id: 2,
        question: "Pregunta 2",
        answerList: [
            {
                id: 1,
                answer: "Respuesta 1",
                isCorrect: false
            },
            {
                id: 2,
                answer: "Respuesta 2",
                isCorrect: true
            },
            {
                id: 3,
                answer: "Respuesta 3",
                isCorrect: false
            },
            {
                id: 4,
                answer: "Respuesta 4",
                isCorrect: false
            },
        ]
    },
    {
        id: 3,
        question: "Pregunta 3",
        answerList: [
            {
                id: 1,
                answer: "Respuesta 1",
                isCorrect: false
            },
            {
                id: 2,
                answer: "Respuesta 2",
                isCorrect: true
            },
            {
                id: 3,
                answer: "Respuesta 3",
                isCorrect: false
            },
            {
                id: 4,
                answer: "Respuesta 4",
                isCorrect: false
            },
        ]
    },
    {
        id: 4,
        question: "Pregunta 4",
        answerList: [
            {
                id: 1,
                answer: "Respuesta 1",
                isCorrect: false
            },
            {
                id: 2,
                answer: "Respuesta 2",
                isCorrect: true
            },
            {
                id: 3,
                answer: "Respuesta 3",
                isCorrect: false
            },
            {
                id: 4,
                answer: "Respuesta 4",
                isCorrect: false
            },
        ]
    },

];

export default () => {

    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [results, setResults] = useState({});

    const [allAnswered, setAllAnswered] = useState(false);
    const [verify, setVerify] = useState(false);

    const resetQuiz = () => {
        setAllAnswered(false);
        setVerify(false);

        setResults({});
        setSelectedAnswers({});
    }

    const handleAnswerChange = (questionId, answer) => {
        setSelectedAnswers(prevAnswers => {
            const updatedAnswers = {
                ...prevAnswers,
                [questionId]: answer
            };

            // Check if all questions have been answered
            const allAnswered = questionList.every(question => updatedAnswers[question.id]);
            setAllAnswered(allAnswered);

            return updatedAnswers;
        });
    };

    const verifyAnswers = () => {
        const newResults = {};

        questionList.forEach(question => {
            question.answerList.forEach(answer => {
                if (selectedAnswers[question.id] === answer.answer) {
                    newResults[question.id] = answer.isCorrect;
                }
            });
        });

        setVerify(!verify);
        setResults(newResults);
    };

    return (
        <div>
            {/*
            <div className='flex justify-between'>
                <div>
                    <h3>Selected Answers:</h3>
                    <pre>{JSON.stringify(selectedAnswers, null, 2)}</pre>
                </div>
                <div>
                    <h4>Verification Results:</h4>
                    <pre>{JSON.stringify(results, null, 2)}</pre>
                </div>
            </div>
            */}

            {verify ? (
                <>
                    {/* Show results after verification */}
                    <div>
                        <h4>Resultados de Verificación:</h4>
                        <pre>{JSON.stringify(results, null, 2)}</pre>
                        <button className='bg-blue-600 p-2' onClick={resetQuiz}>Reiniciar</button>
                    </div>
                </>
            ) : (
                <Swiper
                    effect={'cards'}
                    grabCursor={false}
                    modules={[EffectCards]}
                    scrollbar={{ draggable: false }}
                    className="mySwiper"
                    allowTouchMove={false}
                >
                    {questionList.map(question => {
                        return (
                            <SwiperSlide className='p-4' key={question.id}>
                                <p className='text-center'>{question.question}</p>
                                <div className='flex flex-col  space-y-6 mt-8 p-2' >


                                    {question.answerList.map(answer => {
                                        return (
                                            <div key={answer.id} className='flex items-center'>
                                                <input
                                                    className='w-4 h-4 shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800'
                                                    type="radio"
                                                    id={answer.answer}
                                                    name={question.id.toString()}
                                                    value={answer.answer}
                                                    onChange={() => handleAnswerChange(question.id, answer.answer)}
                                                />
                                                <label className='text-lg text-gray-50 ms-2' htmlFor={answer.answer}>{answer.answer}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </SwiperSlide>
                        )
                    })}
                    {allAnswered ? (
                        <>
                            <button className='p-2 bg-green-600 text-white font-bold rounded-md mt-4 w-48' onClick={verifyAnswers}>Verificar</button>
                        </>
                    ) : (
                        <div className='flex justify-between space-x-4'>
                            <BackButtonSwiper />
                            <NextButtonSwiper />
                        </div>
                    )}


                </Swiper>
            )}



        </div>

    );
};

