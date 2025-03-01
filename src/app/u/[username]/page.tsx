import Quiz from "@/components/quiz/Quiz";

import Layout from "@/components/layout/layout";


const database = [
    {
        username: "pato",
        password: "123"
    },
    {
        username: "fjdkfjksd",
        password: "123"
    },
]

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
    const username = (await params).username;

    const userExist = database.find(user => user.username.localeCompare(username) === 0);

    if (!userExist) {
        return <><p>User not found</p></>;
    }


    return (
        <Layout>
            <div className="grid justify-center place-content-center h-full">
                <div className="">
                    <Quiz />
                </div>
            </div>
        </Layout>
    )
}