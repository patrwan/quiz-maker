'use client'

import Layout from "@/components/layout/layout";
import { usePathname } from "next/navigation";

 
export default function Page() {
    const pathname = usePathname();

    function getQuizName() {
        return pathname.trim().split("/").pop();
    }

  return (
    <Layout>
      <div className="p-10">
        Post: {getQuizName()}
      </div>
    </Layout>
  ) 
}