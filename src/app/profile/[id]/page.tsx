export default function ProfilePage({params}: any){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Proifle</h1>
            <hr />
            <p className="text-4xl text-white">
                Profile page
                {params.id}
            </p>
        </div>
    )
}