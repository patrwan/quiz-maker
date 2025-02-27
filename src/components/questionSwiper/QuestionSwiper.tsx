import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import Question from '@/components/question/Question';
import './styles.css';
const QuestionSwiper = ({ questionList, handleAnswerChange, swiperRef  }) => {
    return (
        <Swiper
            effect={'cards'}
            grabCursor={false}
            modules={[EffectCards]}
            scrollbar={{ draggable: false }}
            className="mySwiper"
            allowTouchMove={false}
            ref={swiperRef}
        >
            {questionList.map(question => (
                <SwiperSlide className="p-4" key={question.id}>
                    <Question
                        question={question}
                        handleAnswerChange={handleAnswerChange}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default QuestionSwiper;
