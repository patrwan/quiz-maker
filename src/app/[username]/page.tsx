import Swiper from "@/components/swiper/swiper";

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
    const username = (await params).username

    const userExist = database.find(user => user.username.localeCompare(username) === 0);

    if (!userExist) {
        return <><p>User not found</p></>;
    }


    return (
        <div className="grid justify-center place-content-center h-screen w-screen bg-zinc-200">
            <h1 className="text-2xl m-8 text-center">Quiz de: {username}</h1>
            <div>
                <Swiper/>
            </div>

        </div>
    )
}