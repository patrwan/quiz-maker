import Layout from "@/components/layout/layout";
import QuizzesList from "@/components/quizzesList/QuizzesList";

export default function page() {
    return (
        <Layout>
            <div className="p-10 flex flex-col space-y-10">
                <h1>Mis cuestionarios</h1>
                <QuizzesList/>
            </div>
        </Layout>

    )
}
