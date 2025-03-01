

const QuizResults = ({ results, resetQuiz }) => {
    return (
        <div className="flex flex-col p-2 space-y-4">
            <h4>Resultados de Verificación:</h4>
            <pre>{JSON.stringify(results, null, 2)}</pre>
            <button className="bg-blue-600 p-2 text-white" onClick={resetQuiz}>Reiniciar</button>
        </div>
    );
};

export default QuizResults;
