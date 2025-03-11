import Layout from "@/components/layout/layout"

export default function page() {
    return (
        <Layout>
            <div className="flex flex-col space-y-4">
                <h1>Crear cuestionario</h1>
                <input className="w-3xl border-2 p-2" placeholder="Ingrese nombre del cuestionario"/>
                <button className="bg-primary text-lg w-60 p-2 rounded-xl">Añadir Pregunta</button>
            </div>
        </Layout>

    )
}
