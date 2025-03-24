'use client'
import Layout from "@/components/layout/layout"
import { useState } from "react"

export default function page() {
    const [questionnaire, setQuestionnaire] = useState({
        id: "",
        name: "",
        questions: []
    });

    const [currentQuestion, setCurrentQuestion] = useState({
        text: "",
        options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
        ],
    });

    const handleQuizNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setQuestionnaire((prev) => ({
            ...prev,
            name: e.target.value,
        }));
    };

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentQuestion((prev) => ({
            ...prev,
            text: e.target.value,
        }));
    };

    const handleOptionChange = (index: number, value: string) => {
        setCurrentQuestion((prev) => {
            const updatedOptions = [...prev.options];
            updatedOptions[index].text = value;
            return { ...prev, options: updatedOptions };
        });
    };

    const handleCorrectAnswer = (index: number) => {
        setCurrentQuestion((prev) => ({
            ...prev,
            options: prev.options.map((option, i) => ({
                ...option,
                isCorrect: i === index, // Solo una opción puede ser correcta
            })),
        }));
    };

    const addQuestion = () => {
        if (!currentQuestion.text.trim() || currentQuestion.options.some((opt) => opt.text.trim() === "")) {
            alert("Completa todos los campos antes de añadir la pregunta.");
            return;
        }
    
        setQuestionnaire((prev) => ({
            ...prev,
            questions: [...prev.questions, currentQuestion],
        }));
    
        // Limpiar la pregunta actual
        setCurrentQuestion({
            text: "",
            options: [
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
            ],
        });
    };

    function handleRadioButton() {

    }

    function handleQuestionButton() {
        setQuestionnaire((prevState) => {
            prevState.questions.push();
            return {
                ...prevState,
            };
        })


    }
    return (
        <Layout>
            <div className="flex h-full">
                <div className="flex flex-col h-full w-1/2 p-2">

                    <h1>Crear cuestionario</h1>

                    <input className="w-2xl border-2 p-2" placeholder="Ingrese nombre del cuestionario" onChange={handleQuizNameChange} />

                    <div className="h-full space-y-4 w-1/2 flex flex-col  p-2">
                        <div className="flex flex-col space-y-2 p-2  w-2xl m-auto">
                            <p>Pregunta</p>
                            <p className="text-sm text-gray-400 font-semibold">Escribe tu pregunta</p>
                            <input className="mr-16 w-96 border-2 p-2" type="text" placeholder="Ingrese pregunta" value={currentQuestion.text} onChange={handleQuestionChange} />
                        </div>


                        <div className="flex flex-col space-y-2 p-2  m-auto w-2xl">
                            <p>Respuestas</p>
                            <p className="text-sm text-gray-400 font-semibold">Escribe tus respuestas y luego debes marcar cual es la respuesta correcta.</p>
                            {currentQuestion.options.map((option, index) => (
                                <div key={index} className="flex space-x-4 items-center">
                                    <p className="">{index + 1}.</p>
                                    <input
                                        className="w-96 border-2 p-2"
                                        type="text"
                                        placeholder="Ingrese respuesta"
                                        value={option.text}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                    />
                                    <input
                                        className="w-4 h-4"
                                        type="radio"
                                        name="correctAnswer"
                                        checked={option.isCorrect}
                                        onChange={() => handleCorrectAnswer(index)}
                                    />
                                </div>
                            ))}

                            <button className="bg-primary p-2 w-96 font-bold ml-7 text-white" onClick={addQuestion}>Confirmar</button>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 w-1/2 flex flex-col space-y-2 p-2">
                    {questionnaire.questions.length !== 0 ? questionnaire.questions.map(question => {
                        return(
                            <p key={question.text}>{question.text}</p>
                        )
                    }) : 'Aun no ha creado preguntas'}
                </div>
            </div>

        </Layout>

    )
}
