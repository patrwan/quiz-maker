import { Bricolage_Grotesque } from 'next/font/google';
import Link from 'next/link';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'] });

export default function Layout({ children } : any) {
    return (
        <div className={bricolage.className}>
            <div className="h-screen flex flex-col container m-auto">
                <header className="bg-lime-600 flex justify-between px-10 items-center  h-12 p-2 text-white">
                    <p className="font-bold text-xl">Quiz Maker</p>
                    <nav className='flex space-x-4 text-lg'>
                        <Link href={'quizzes'}>Mis cuestionarios</Link>
                        <Link href={'create-quiz'}>Crear cuestionario</Link>
                    </nav>
                </header>
                <main className="flex-1">
                    {children}
                </main>
                <footer className="bg-zinc-900 text-green-400 h-16 grid place-content-center">2025</footer>
            </div>
        </div>

    )
}