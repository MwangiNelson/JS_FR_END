import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../contexts/AppContexts";
function Auth() {
    const { login, signup } = useContext(AppContext)

    const userEmailRef = useRef()
    const userPasswordRef = useRef()

    function setToast() {
        toast.error('This account could not be found.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    }

    function handleSubmit(e) {
        e.preventDefault()

        const userEmail = userEmailRef.current.value
        const userPassword = userPasswordRef.current.value

        let AuthComplete = signup(userEmail,userPassword)

        if(!AuthComplete){
            setToast();
        }

        toast.success('User created successfully.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    }


    return (
        <div className="w-full  flex flex-row justify-center items-center h-fit">
            <form
                onSubmit={handleSubmit}
                className="w-1/3 rounded-lg bg-cream shadow card items-center py-10">
                <h2 className="text-4xl font-bold w-full text-center py-5">Log In</h2>
                <h3 className="text-xl font-medium text-center py-5">
                    Welcome to Nutribot AI
                </h3>
                <input
                    type="email"
                    id="email"
                    ref={userEmailRef}
                    className="bg-cream border border-slate-500 text-cream-900 text-sm rounded-lg focus:ring-slate-800 focus:border-slate-500 block w-10/12 md:w-3/4 p-2.5 my-3"
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    id="password"
                    ref={userPasswordRef}
                    className="bg-cream border border-slate-500 text-cream-900 text-sm rounded-lg focus:ring-slate-800 focus:border-slate-500 block w-10/12 md:w-3/4 p-2.5 my-5"
                    placeholder="Password"
                    required
                />

                <button
                    type="submit"
                    className="bg-purple-800 text-white  w-10/12 lg:w-3/4 rounded-lg font-semibold text-2xl py-2 mb-4">
                    Log In
                </button>
                <div className="flex flex-row py-4 pb-10 w-10/12 lg:w-3/4 justify-between">
                    <Link to={"/chat"}>Create an account?</Link>
                    <Link to={""} onClick={setToast} >Forgot password?</Link>
                </div>
            </form>
            <div className="w-1/3 h-[100%] bg-white rounded-r-lg relative">
                <img
                    src="/images/bot.png"
                    className="w-full h-[50vh] object-contain"
                    alt=""
                />
                <div className="absolute w-full h-full  top-0 justify-end pb-10 items-center rounded-r-lg flex flex-col">
                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r to-purple-800 from-sky-400">
                        Welcome back, we have missed you.
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default Auth;
