import { useState, FormEvent } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase";

function Login() {
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const payload = {
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
        };
        try {
            setLoading(true)
            const {email, password} = payload
            const result = await signInWithEmailAndPassword(auth, email, password)
            console.log(result)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container max-w-full">
            <div className="bg-blue-900 rounded-lg p-10">
                <h1 className="text-center text-[32px] font-bold capitalize">Login</h1>
                <span className="font-dm leading-7 block text-center mt-5">Siapa anda ?, jangan macem - macem</span>
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-8 mt-6">
                    <input type="email" className="bg-indigo-950 px-9 py-4 rounded-lg border border-blue-800 focus:outline-0" placeholder="Email" name="email" />
                    <input type="password" className="bg-indigo-950 px-9 py-4 rounded-lg border border-blue-800 focus:outline-0" placeholder="Password" name="password" />

                    <button className="bg-blue-600 self-center rounded-lg w-fit font-bold font-dm leading-loose text-center px-[32px] py-3" disabled={loading} type="submit">
                        {loading ? "Logging...." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login