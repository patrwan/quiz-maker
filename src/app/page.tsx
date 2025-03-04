'use client'
import { Bricolage_Grotesque } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

import { loginUser } from '@/firebase/auth';

import { doc, getDoc, getFirestore } from "firebase/firestore";

const bricolage = Bricolage_Grotesque({ subsets: ['latin'] })

export default function Home() {


  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // login
    try {
      const credentials = await loginUser(formData.username, formData.password);
      const user = credentials.user;

      const db = getFirestore();
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("Usuario autenticado:", userData.username);
        router.push(`/u/${userData.username}/quizzes`)
      } else {
        console.log("No se encontró el documento de usuario");
      }

      

    } catch (error) {
     console.log(error)
    }

  };

  return (
    <div className={bricolage.className}>
      <div className="grid bg-lime-600  grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] absolute inset-0  justify-center  text-white font-bold text-4xl">
        <main className="flex flex-col gap-8 row-start-2 items-center">
          <h1 className="text-9xl font-extrabold text-center">Quiz Maker🥺</h1>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
            <input
              className='p-2 text-black outline-none focus:border-blue-400 border-2'
              type="text"
              name="username"
              id="username"
              placeholder='Ingrese usuario'
              value={formData.username}
              onChange={handleChange}
            />
            <input
              className='p-2 text-black outline-none focus:border-blue-400 border-2'
              type="password"
              name="password"
              id="password"
              placeholder='******'
              value={formData.password}
              onChange={handleChange}
            />
            <button className="bg-pink-600 hover:bg-pink-500  transition-all p-4 rounded-md text-white" type='submit'>Entrar</button>
          </form>

        </main>
      </div>
    </div>

  );
}
