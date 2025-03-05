'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

import Layout from "@/components/layout/layout";
import QuizzesList from "@/components/quizzesList/QuizzesList";

export default function page() {

    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
          router.push("/"); 
        }
      }, [user]);

    return (
        <Layout>
            <div className="p-10 flex flex-col space-y-10">
                <h1>Mis cuestionarios</h1>
                <QuizzesList/>
            </div>
        </Layout>

    )
}
