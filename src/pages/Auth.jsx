import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../contexts/AppContexts";
import CustomToast from "../components/toast";
import { useNavigate } from "react-router-dom";
function Auth() {
    const { login, signup, userData } = useContext(AppContext)
    const [inL, setIn] = useState(true)
    const navigate = useNavigate();

    console.log('userdata', userData)
    const userEmailRef = useRef()
    const userPasswordRef = useRef()

    const signupEmailRef = useRef()
    const signupPass = useRef()

    const toggleAuth = () => {
        setIn(!inL)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const userEmail = userEmailRef.current.value;
        const userPassword = userPasswordRef.current.value;

        try {
            // Await the login function and handle successful login
            const user = await login(userEmail, userPassword);

            CustomToast({ type: 'success', message: 'User logged in successfully.' })
            navigate('/chat')
            // Additional logic post successful login (if any)
            // ...

        } catch (error) {
            // Handle login errors
            console.error("Login failed: ", error);
            CustomToast({ type: 'danger', message: 'Login Failed' });
        }
    }

    async function handleSignUp(e) {
        e.preventDefault();

        const userEmail = signupEmailRef.current.value;
        const userPassword = signupPass.current.value;

        try {
            // Await the login function and handle successful login
            const user = await signup(userEmail, userPassword);

            CustomToast({ type: 'success', message: 'User account created successfully.' })
            navigate('/chat')

        } catch (error) {

            CustomToast({ type: 'danger', message: 'Sign up Failed' });
        }
    }

    const SignInForm = () => (
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
                    <Link to={""} onClick={toggleAuth} >Create an account?</Link>
                    <Link to={""} onClick={() => { CustomToast({ type: 'info', message: 'Still working on this.' }) }} >Forgot password?</Link>
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
    )
    const SignUpForm = () => (
        <div className="w-full  flex flex-row-reverse justify-center items-center h-fit">
            <form
                onSubmit={handleSignUp}
                className="w-1/3 rounded-lg bg-cream shadow card items-center py-10">
                <h2 className="text-4xl font-bold w-full text-center py-5">Sign Up</h2>
                <h3 className="text-xl font-medium text-center py-5">
                    Welcome to Nutribot AI
                </h3>
                <input
                    type="email"
                    id="email"
                    ref={signupEmailRef}
                    className="bg-cream border border-slate-500 text-cream-900 text-sm rounded-lg focus:ring-slate-800 focus:border-slate-500 block w-10/12 md:w-3/4 p-2.5 my-3"
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    id="password"
                    ref={signupPass}
                    className="bg-cream border border-slate-500 text-cream-900 text-sm rounded-lg focus:ring-slate-800 focus:border-slate-500 block w-10/12 md:w-3/4 p-2.5 my-5"
                    placeholder="Password"
                    required
                />

                <button
                    type="submit"
                    className="bg-purple-800 text-white  w-10/12 lg:w-3/4 rounded-lg font-semibold text-2xl py-2 mb-4">
                    Sign Up
                </button>
                <div className="flex flex-row py-4 pb-10 w-10/12 lg:w-3/4 justify-between">
                    <Link to={""} onClick={toggleAuth}>Already have an account?</Link>
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
                        Welcome to Nutrihub.
                    </h3>
                </div>
            </div>
        </div>
    )
    return (
        inL ? <SignInForm /> : <SignUpForm />
    );
}

export default Auth;
