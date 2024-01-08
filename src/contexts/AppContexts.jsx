// MyContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';

const BOT_ENDPOINT = 'https://nutribot.onrender.com/generate-text'
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = sessionStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        if (!userData) {
            sessionStorage.removeItem('userData');
        }

        sessionStorage.setItem('userData', JSON.stringify(userData))

    }, [userData]);


    useEffect(() => {
        const handleBeforeUnload = () => {
            if (userData) {
                sessionStorage.setItem('userData', JSON.stringify(userData));
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [userData]);


    async function signup(email, password) {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            // Handle user creation
            setUserData(response.user);
            return response.user;
        } catch (error) {
            // Handle errors
            console.error("Signup failed: ", error);
            throw error;
        }
    }

    async function login(email, password) {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            // Handle successful login
            setUserData(response.user);
            return response.user;
        } catch (error) {
            // Handle errors
            console.error("Login failed: ", error);
            throw error;
        }
    }

    async function promptBot(prompt) {

        const headers = {
            "Content-Type": "application/json"
        };

        // Configure the fetch options for POST request with CORS enabled
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(prompt),
            mode: 'cors' // Enable CORS
        };



        try {

            let botResponse = await fetch(BOT_ENDPOINT, requestOptions);

            return botResponse
        } catch (err) {

            throw err
        }
    }

    const logout = () => {
        auth.signOut()
        setUserData(null)
        setIsAuthenticated(false)
        sessionStorage.removeItem('userData');
        window.location.href = '/';
    }

    const contextValue = {
        userData,
        login,
        signup,
        logout,
        promptBot

    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};