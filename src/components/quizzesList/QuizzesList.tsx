import Link from "next/link";

const data = [
  {
    id : 1,
    name : "quiz-1",
    questions : [],
    privacity : true,
    date : "",
  },
  {
    id : 2,
    name : "quiz-2",
    questions : [],
    privacity : false,
    date : "",
  },
];

export default function QuizzesList() {
  return (
    <div className="flex flex-col space-y-5">
      {data.map(quiz => {
        return (
          <div key={quiz.id} className="flex items-center p-2 space-x-10 shadow-slate-400 shadow-sm">
            <Link className="text-blue-600 font-bold hover:text-blue-300 w-1/2" href={`/u/pato/q/${quiz.name}`}>{quiz.name}</Link>
            <p>{quiz.privacity ? "Publico" : "Privado"}</p>
            <p>{quiz.date}</p>
          </div>
        )
      })}
    </div>
  )
}
