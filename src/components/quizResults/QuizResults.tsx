

const QuizResults = ({ results, resetQuiz }) => {
    return (
        <div>
            <h4>Resultados de Verificación:</h4>
            <pre>{JSON.stringify(results, null, 2)}</pre>
            <button className="bg-blue-600 p-2" onClick={resetQuiz}>Reiniciar</button>
        </div>
    );
};

export default QuizResults;
