import { useContext, useRef, useState } from "react";
import { AppButton, IconButton } from "../../../components/buttons";
import { BotBubble, UserBubble } from "../../../components/ChatBubble";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { RiTelegramFill } from "react-icons/ri";
import { AppContext } from "../../../contexts/AppContexts";
import { toast } from "react-toastify";
import Loader from "../../../components/loader";

import { arrayUnion, doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import 'firebase/firestore';

import { db } from "../../../firebase";
import { BsPenFill } from "react-icons/bs";
import { TbPencilCode } from "react-icons/tb";

const ChatPanel = () => {

  const promptRef = useRef(null);

  const [conversation, setConversation] = useState({})

  const { promptBot, userData } = useContext(AppContext)

  const getTherapistText = (text) => {
    let t = text.split('[SEP]')
    return t[1]
  }

  const [loading, setLoading] = useState(false)


  const sendPrompt = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    const prompt = promptRef.current.value;
    const userId = await userData.getIdToken(); // Replace with the actual user ID

    try {
      const response = await promptBot({ text: `${prompt} [SEP]` });
      let botResponse = "";

      if (!response) {
        botResponse = "I'm sorry, I cannot generate a response at this moment. Please try again later.";
      } else {
        const responseData = await response.json();
        botResponse = getTherapistText(responseData); // Process the response
      }

      // Update conversation state
      setConversation(prev => {
        const updatedConvo = {
          ...prev,
          [`user${Object.keys(prev).length / 2 + 1}`]: prompt,
          [`bot${Object.keys(prev).length / 2 + 1}`]: botResponse
        };

        // Store data in Firestore
        storeData(userId, updatedConvo);
        return updatedConvo;
      });

    } catch (error) {
      console.error('Error:', error);
      // Handle the error case
      setConversation(prev => ({
        ...prev,
        [`user${Object.keys(prev).length / 2 + 1}`]: prompt,
        [`bot${Object.keys(prev).length / 2 + 1}`]: "An error occurred. Please try again."
      }));
    } finally {
      setLoading(false); // End loading
    }
  };


  const storeData = async (userId, conversation) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
  
      let convoCount = 1;
      if (userDoc.exists()) {
        const userData = userDoc.data();
        convoCount = userData.convoCount ? userData.convoCount + 1 : 1;
        await updateDoc(userDocRef, { convoCount }); // Update the conversation count
      } else {
        await setDoc(userDocRef, { convoCount });
      }
  
      const convoTitle = `CONVERSATION_${String(convoCount).padStart(2, '0')}`;
  
      // Store the whole conversation object
      await setDoc(doc(db, 'users', userId, 'conversations', convoTitle), {
        ...conversation,
        convo_title: convoTitle,
        convo_timestamp: new Date().toISOString()
      });
  
      console.log('Conversation stored in Firestore');
    } catch (error) {
      console.error('Error storing conversation:', error);
    }
  };
  


  const startNewChat = () => {
    // Reset the conversation state
    setConversation({});
  };

  return (
    <div className="w-full h-full relative px-4 flex flex-col justify-start">
      <div className="w-full bg-white items-center rounded-[2vh] p-4 flex flex-row justify-between">
        <div className="w-fit flex flex-row gap-4">
          <img
            src="/images/bot.png"
            className="w-[3vw] bg-cream h-[3vw] rounded-full object-cover"
            alt=""
          />

          <div className="flex flex-col h-full justify-between">
            <span className="text-lg font-bold text-black">NutriBot AI</span>
            <span className="bg-green-200 text-green-800 text-xs font-medium me-2 px-2.5 text-center py-1 rounded dark:bg-green-900 dark:text-green-300">
              Active
            </span>
          </div>

        </div>

        <div className="flex flex-row">
          <IconButton text={'Start New Chat'} Icon={TbPencilCode} backgroundColor={'bg-dull rounded text-cream border-dull hover:bg-gray-500 hover:text-white transition-all ease h-fit'} onClick={startNewChat} />
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex gap-4 flex-col w-full pt-10 max-h-[60vh] overflow-y-scroll">

        {
          conversation && Object.keys(conversation).length > 0 ? (
            Object.entries(conversation).map(([key, message], index) => {
              // Determine if the message is from the user or the bot based on the key
              const isUserMessage = key.startsWith('user');
              const BubbleComponent = isUserMessage ? UserBubble : BotBubble;
              const author = isUserMessage ? "" : "NutriBot AI";

              return (
                <div key={index} className="flex flex-col gap-4 w-full">
                  <BubbleComponent text_author={author} text_content={message} text_time={""} text_id={index} />
                </div>
              );
            })
          ) : null
        }
        {loading ? <Loader /> : null}

      </div>

      <form
        onSubmit={sendPrompt}
        className="absolute w-full flex flex-row bottom-0 items-center"
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
            ref={promptRef}
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
          backgroundColor={"w-fit btn-animated mx-10 h-fit"}
          Icon={RiTelegramFill}
          text={"Send"}
        />
      </form>
    </div>
  );
};

export default ChatPanel;
