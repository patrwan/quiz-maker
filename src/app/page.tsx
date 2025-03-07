'use client'
import { Bricolage_Grotesque } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

import { loginUser } from '@/firebase/auth';

import { doc, getDoc, getFirestore } from "firebase/firestore";

import toast, { Toaster } from 'react-hot-toast';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'] })

export default function Home() {


  const [formData, setFormData] = useState({
    username: 'patrwan@quiz.com',
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
    try {
      toast.promise(
        async () => {
          const credentials = await loginUser(formData.username, formData.password);
          const user = credentials.user;
          
          const db = getFirestore();
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log("Usuario autenticado:", userData.username);
            setTimeout(() => router.push(`/account/quizzes`), 1000);
            
    
          } else {
            console.log("No se encontró el documento de usuario");
            toast('Here is your toast.');
          }

        },
        {
          loading: 'Iniciando Sesión',
          success: 'Inicio de sesión exitoso',
          error: 'Usuario o contraseña incorrectos',
        }
      );

      



    } catch (error) {
      console.log(error)
      //toast('Here is your toast.');
    }

  };

  return (
    <div className={bricolage.className}>
      <div className="grid grid-cols-3 grid-rows-5 gap-4 p-10 bg-teal-200 h-screen ">
        <Toaster toastOptions={{
          duration : 4000
        }}/>
        <div className="h-full row-span-6 bg-[url(/think.jpg)] bg-center bg-cover rounded-xl shadow-md shadow-gray-400 bg-black"></div>
        <div className="flex justify-center items-center row-span-6 bg-[url(/think2.jpg)] bg-center bg-cover h-full rounded-xl shadow-md shadow-gray-400 bg-opacity-40">
          <form onSubmit={handleSubmit} className='flex flex-col h-96 space-y-3  p-4 justify-center bg-black bg-opacity-60 rounded-xl'>
            <h1 className="text-4xl font-extrabold text-center text-white ">Quiz Maker🥺</h1>
            <input
              className='w-96 p-2 text-black outline-none focus:border-blue-400 border-2 rounded-md '
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
            <button className="bg-emerald-600 hover:bg-emerald-500  transition-all p-2 rounded-md text-white font-bold" type='submit'>Entrar</button>
          </form>
        </div>
        <div className="row-span-6 bg-[url(/searching.jpg)] bg-center bg-cover h-full rounded-xl shadow-md shadow-gray-400"></div>
      </div>
    </div>

  );
}


/*

<main className="flex flex-col gap-8  bg-white p-10 h-full w-full shadow-md shadow-gray-600  justify-end rounded-3xl bg-[url(/think.jpg)] bg-center bg-cover ">

<div className="row-span-4 col-start-2">
  <form onSubmit={handleSubmit} className='flex flex-col space-y-3 bg-white p-4'>
    <h1 className="text-4xl font-extrabold text-center text-emerald-600 ">Quiz Maker🥺</h1>
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
    <button className="bg-emerald-800 hover:bg-emerald-300  transition-all p-2 rounded-md text-white" type='submit'>Entrar</button>
  </form>
</div>
</main>
*/