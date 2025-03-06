'use client'
import { checkIfUserExists } from "@/firebase/userFunctions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
    const [userExists, setUserExists] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const params = useParams();

    const username = params?.username;

    useEffect(() => {
        if (username) {
            handleUserCheck(username.toString()); // Llamamos a la función para verificar el usuario
        }
    }, [username]);

    const handleUserCheck = async (username: string) => {
        setLoading(true);
        const exists = await checkIfUserExists(username);  // Usamos la función importada
        setUserExists(exists);
        setLoading(false);
    };

    if (loading) {
        return <h1>Cargando...</h1>;
    }

    if (!userExists) {
        return <h1>Usuario no encontrado</h1>;
    }

    return (
        <div className="grid place-content-center h-screen">
            <div className="bg-yellow-300 h-96 w-96 grid place-content-center">
                <h1 className="font-bold text-3xl">Pagina en construcción</h1>
                <h1 className="font-bold text-3xl">Perfil de {username}</h1>
            </div>
        </div>
    )
}
