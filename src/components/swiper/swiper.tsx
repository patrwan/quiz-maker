'use client'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


import { EffectCards } from 'swiper/modules';

import './styles.css';

import ButtonSwiper from '@/components/buttonSwiper/ButtonSwiper';
import BackButtonSwiper from '@/components/backButtonSwiper/BackButtonSwiper';

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
    return (
        <div>
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
                                            />
                                            <label className='text-lg text-gray-50 ms-2' htmlFor={answer.answer}>{answer.answer}</label>
                                        </div>
                                        
                                        

                                    )
                                })}
                            </div>
                        </SwiperSlide>
                    )
                })}
                <BackButtonSwiper/>
                <ButtonSwiper />
            </Swiper>

        </div>

    );
};

