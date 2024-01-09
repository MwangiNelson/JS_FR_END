import React, { useRef, useState, useContext, useEffect } from 'react'
import { RiTelegramFill } from 'react-icons/ri'
import { FaWandMagicSparkles } from 'react-icons/fa6'
import { IconButton } from '../../../components/buttons'
import { UserBubble, OtherUserBubble } from '../../../components/ChatBubble'
import { AppContext } from '../../../contexts/AppContexts'
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { db } from '../../../firebase'
function CommunityPanel() {
    const textRef = useRef()

    const { userData } = useContext(AppContext);
    const [communityChats, setCommunityChats] = useState([]);

    useEffect(() => {
        const fetchCommunityChats = () => {
            const q = query(collection(db, 'community_chat'));
            onSnapshot(q, (querySnapshot) => {
                let chats = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Sort chats by timestamp in descending order
                chats = chats.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate());

                setCommunityChats(chats);
            });
        };

        fetchCommunityChats();
    }, []);


    const sendText = async (event) => {
        event.preventDefault();

        const userText = textRef.current.value;
        let userIdToken = userData.uid

        // Get the current date and time
        const currentDate = new Date();

        // Format the date and time
        const formattedDate = currentDate.toLocaleString('en-us', {
            timeZone: 'UTC',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });

        // Add text, JWT, and formatted date/time to Firestore
        try {
            await addDoc(collection(db, 'community_chat'), {
                text: userText,
                author_jwt: userIdToken,
                timestamp: currentDate,
                formatted_date: formattedDate, // Add the formatted date/time for display
            });
            console.log('Text sent to community chat');
            textRef.current.value = ''; // Clear the input field after sending
        } catch (error) {
            console.error('Error sending text to community chat:', error);
        }
    };

    return (
        <div className="w-full p-4 flex flex-col">
            <div className="w-full p-4 rounded flex-col-reverse gap-3 overflow-y-scroll flex h-[75vh]">
                {communityChats.map(chat => (
                    chat.author_jwt === userData.uid ?
                        <UserBubble
                            key={chat.id}
                            text_content={chat.text}
                            text_time={chat.formatted_date}
                        /> :
                        <OtherUserBubble
                            key={chat.id}
                            text_content={chat.text}
                            text_time={chat.formatted_date}
                        />
                ))}
            </div>

            <form
                onSubmit={sendText}
                className="relative w-full flex flex-row justify-between bottom-0 items-center"
            >
                <div className="relative w-full my-2">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <FaWandMagicSparkles />
                    </div>
                    <input
                        type="text"
                        id="voice-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Type your message here"
                        ref={textRef}
                        required
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 end-0 flex items-center pe-3"
                    >
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 20"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
                            />
                        </svg>
                    </button>
                </div>
                <IconButton
                    backgroundColor={"w-fit btn-animated ms-10 h-fit"}
                    Icon={RiTelegramFill}
                    text={"Send"}
                />
            </form>
        </div>
    )
}

export default CommunityPanel