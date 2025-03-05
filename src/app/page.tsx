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
      <div className="grid bg-green-200 items-center justify-items-center min-h-screen w-screen justify-center font-bold text-xl">
        <main className="flex flex-col gap-8  bg-white p-10 h-2/3 w-full shadow-md shadow-gray-600  justify-center rounded-3xl">
          <h1 className="text-4xl font-extrabold text-center text-emerald-600">Quiz Maker🥺</h1>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-3 '>
            <input
              className='w-96 p-2 text-black outline-none focus:border-blue-400 border-2 rounded-md'
              type="text"
              name="username"
              id="username"
              placeholder='Ingrese usuario'
              value={formData.username}
              onChange={handleChange}
            />
            <input
              className='p-2 text-black outline-none focus:border-blue-400 border-2 rounded-md'
              type="password"
              name="password"
              id="password"
              placeholder='******'
              value={formData.password}
              onChange={handleChange}
            />
            <button className="bg-emerald-400 hover:bg-emerald-300  transition-all p-2 rounded-md text-white" type='submit'>Entrar</button>
          </form>

        </main>
      </div>
    </div>

  );
}
