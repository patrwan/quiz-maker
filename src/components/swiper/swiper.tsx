'use client'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


import { EffectCards } from 'swiper/modules';

import './styles.css';

import ButtonSwiper from '@/components/buttonSwiper/ButtonSwiper';

const questionList = [
    {
        id: 1,
        question: "Pregunta 1",
        ansawerList: [
            {
                id: 1,
                ansawer: "Respuesta 1",
                isCorrect: true
            },
            {
                id: 2,
                ansawer: "Respuesta 2",
                isCorrect: false
            },
            {
                id: 3,
                ansawer: "Respuesta 3",
                isCorrect: false
            },
            {
                id: 4,
                ansawer: "Respuesta 4",
                isCorrect: false
            },
        ]
    },
    {
        id: 2,
        question: "Pregunta 2",
        ansawerList: [
            {
                id: 1,
                ansawer: "Respuesta 1",
                isCorrect: false
            },
            {
                id: 2,
                ansawer: "Respuesta 2",
                isCorrect: true
            },
            {
                id: 3,
                ansawer: "Respuesta 3",
                isCorrect: false
            },
            {
                id: 4,
                ansawer: "Respuesta 4",
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
                grabCursor={true}
                modules={[EffectCards]}
                scrollbar={{ draggable: false }}
                className="mySwiper"
                allowTouchMove={false}
            >
                {questionList.map(question => {
                    return (
                        <SwiperSlide className='p-4' key={question.id}>
                            <p className='text-center'>{question.question}</p>
                            <div className='flex flex-col bg-black space-y-6 mt-8 p-2' >
                                {question.ansawerList.map(ansawer => {
                                    return (
                                        <p key={ansawer.id}>{ansawer.ansawer}</p>

                                    )
                                })}
                            </div>
                        </SwiperSlide>
                    )
                })}
                <ButtonSwiper />
            </Swiper>

        </div>

    );
};

