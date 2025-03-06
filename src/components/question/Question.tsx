import { Question as QuestionType } from '@/types/question';

import Answer from '@/components/answer/Answer';


interface QuestionProps {
    question : QuestionType,
    handleAnswerChange: (questionId: number, answer: string) => void;
}

const Question = ({ question, handleAnswerChange } : QuestionProps) => {
    return (
        <div key={question.id}>
            <p className="text-center">¿{question.question}?</p>
            <div className="flex flex-col space-y-6 mt-8 p-2">
                {question.answerList.map(answer => (
                    <Answer
                        key={answer.id}
                        answer={answer}
                        questionId={question.id}
                        handleAnswerChange={handleAnswerChange}
                    />
                ))}
            </div>
        </div>
    );
};

export default Question;