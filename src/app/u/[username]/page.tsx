'use client'
import { checkIfUserExists } from "@/firebase/userFunctions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
    const [userExists, setUserExists] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const params = useParams();

    const username = params?.username;
    const quizId = params?.quiz;

    useEffect(() => {

        if (params?.username) {
            setUserExists(false);
            setLoading(true);
            handleUserCheck(username); // Llamamos a la función para verificar el usuario
        }
    }, []);

    const handleUserCheck = async (username: string) => {

        const exists = await checkIfUserExists(username);  // Usamos la función importada
        setUserExists(exists);
        setLoading(false);
    };
    if (loading || userExists === null) {
        return <div className="grid place-content-center h-screen"><h1>Cargando...</h1></div>;
    }

    if (userExists === false) {
    return <div className="grid place-content-center h-screen"><h1>Usuario no encontrado</h1></div>;
  }

    return (
        <div className="grid place-content-center h-screen">
            {loading ? '...' : <div className="bg-yellow-300 h-96 w-96 grid place-content-center">
                <h1 className="font-bold text-3xl">Pagina en construcción</h1>
                <h1 className="font-bold text-3xl">Perfil de {username}</h1>
            </div>}

        </div>
    )
}
