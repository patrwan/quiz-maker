import { Answer as AnswerType } from '@/types/question';
import './answer.css';

interface AnswerProps {
    answer: AnswerType;
    questionId: number;
    handleAnswerChange: (questionId: number, answer: string) => void;
}

const Answer = ({ answer, questionId, handleAnswerChange } : AnswerProps) => {
    return (
        <div key={answer.id} className="flex items-center atma-semibold">
            <input
                className="w-4 h-4 shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 "
                type="radio"
                id={answer.answer}
                name={questionId.toString()}
                value={answer.answer}
                onChange={() => handleAnswerChange(questionId, answer.answer)}
            />
            <label className="text-lg ms-2" htmlFor={answer.answer}>{answer.answer}</label>
        </div>
    );
};

export default Answer;