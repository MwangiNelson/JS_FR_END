import { useContext, useRef, useState } from "react";
import { IconButton } from "../../../components/buttons";
import { BotBubble, UserBubble } from "./ChatBubble";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { RiTelegramFill } from "react-icons/ri";
import { AppContext } from "../../../contexts/AppContexts";
import { toast } from "react-toastify";
import Loader from "../../../components/loader";

const ChatPanel = () => {
  const promptRef = useRef(null);
  const [conversation, setConversation] = useState([])

  const { promptBot } = useContext(AppContext)

  const getTherapistText = (text) => {
    let t = text.split('[SEP]')
    return t[1]
  }

  const [loading, setLoading] = useState(false)
  const sendPrompt = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    const prompt = promptRef.current.value;

    try {
      const response = await promptBot({ text: `${prompt} [SEP]` });

      if (!response) {
        setConversation([...conversation, {
          user: prompt,
          bot: "I'm sorry, I cannot generate a response at this moment. Please try again later."
        }]);
      } else {
        const responseData = await response.json();
        console.log(responseData)
        setConversation([...conversation, {
          user: prompt,
          bot: getTherapistText(responseData) // Assuming getTherapistText processes the response
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle the error case
      setConversation([...conversation, {
        user: prompt,
        bot: "An error occurred. Please try again."
      }]);
    } finally {
      setLoading(false); // End loading
    }
  };


  return (
    <div className="w-full h-full relative px-4 flex flex-col justify-start">
      <div className="w-full bg-white rounded-[2vh] p-4 flex flex-row justify-between">
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
      </div>

      {/* Chat Section */}
      <div className="flex gap-4 flex-col w-full pt-10 max-h-[60vh] overflow-y-scroll">

        {
          conversation !== null ? conversation.map((convo) => {

            return (
              <div className="flex flex-col gap-4 w-full">
                <UserBubble text_author={""} text_content={convo.user} text_time={""} text_id={0} />
                <BotBubble text_author={"NutriBot AI"} text_content={convo.bot} text_time={""} text_id={0} />

              </div>
            )
          }) : null

        }
        {
          loading ? <Loader /> : null
        }
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
