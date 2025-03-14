'use client'
import { Bricolage_Grotesque } from 'next/font/google';
import Link from 'next/link';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'] });

import { auth } from "@/firebase/config";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import UserMenu from '../userMenu/UserMenu';

export default function Layout({ children }: any) {
    const [username, setUsername] = useState("");

    const { user } = useAuth();

    useEffect(() => {
        console.log(user)
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log(user)
            if (user) {
                // Obtener el nombre de usuario desde Firestore
                const db = getFirestore();
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUsername(userData.username ?? ""); // Guardamos el nombre de usuario
                }
            } else {
                //router.push("/login"); // Redirigir si no hay sesión activa
            }
            //setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className={bricolage.className}>
            <div className="h-screen flex flex-col container m-auto bg-white">
                <header className="bg-primary flex justify-between px-10 items-center  h-16 p-2 text-white">
                    <p className="font-bold text-xl">Quiz Maker</p>
                    {user === null ? (
                        <div className="animate-pulse w-32 h-full bg-indigo-700 rounded"></div>
                    ) : user ? (
                        <nav className="flex space-x-4 text-lg">
                            <UserMenu username={username} />
                        </nav>
                    ) : (
                        <div className="flex space-x-4">
                            <Link className="bg-indigo-900 h-full p-2 font-bold flex items-center rounded-sm hover:bg-indigo-400" href="/">
                                Iniciar Sesión
                            </Link>
                            <Link className="bg-indigo-900 h-full p-2 font-bold flex items-center rounded-sm" href="/#">
                                Registrate
                            </Link>
                        </div>
                    )}

                </header>
                <main className="flex-1">
                    {children}
                </main>
                <footer className="bg-zinc-900 text-green-400 h-20 grid place-content-center">©2025</footer>
            </div>
        </div >
    )
}
/**
<Link href={`/u/${username}/quizzes`}>Mis cuestionarios</Link>
                        <Link href={`/u/${username}/create-quiz`}>Crear cuestionario</Link>
                        <button className='hover:text-gray-300' onClick={logoutUser}>Cerrar Sesión</button>
 */