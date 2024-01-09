import { useContext, useEffect, useRef, useState } from "react";
import { IconButton } from '../../../components/buttons'
import { TbPencilCode } from 'react-icons/tb'
import { BotBubble, UserBubble } from "../../../components/ChatBubble";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { RiTelegramFill } from "react-icons/ri";
import { AppContext } from "../../../contexts/AppContexts";
import { db } from "../../../firebase";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";

function ProsPanel({ doc_id }) {
  const textRef = useRef(null);
  const [doctorData, setDoctorData] = useState(null);

  const [chat, setChat] = useState({})

  useEffect(() => {
    async function fetchDoctorData() {
      try {
        // Create a query against the collection
        const q = query(collection(db, "Doctor_data"), where("doc_id", "==", doc_id));
        const querySnapshot = await getDocs(q);

        // Assuming doc_id is unique, we'll take the first document that matches
        const doctorDetails = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))[0];

        if (doctorDetails) {
          setDoctorData(doctorDetails);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    }

    if (doc_id) {
      fetchDoctorData();
    }
  }, [doc_id]);

  const sendText = () => {

  }

  return (
    <div className="w-full h-full relative px-4 flex flex-col justify-start">
      <div className="w-full bg-white items-center rounded-[2vh] p-4 flex flex-row justify-between">
        <div className="w-fit flex flex-row gap-4">
          <img
            src="/images/doctor.png"
            className="w-[3vw] bg-cream h-[3vw] rounded-full object-cover"
            alt=""
          />

          <div className="flex flex-col h-full justify-between">
            <span className="text-lg font-bold text-black">{doctorData ? doctorData.doc_name : null}</span>
            <span className="bg-yellow-200 text-gray-500 text-xs font-medium me-2 px-2.5 text-center py-1 rounded dark:bg-green-900 dark:text-green-300">
              WILL RESPOND
            </span>
          </div>

        </div>

      </div>
      <div className="grid grid-template-cols-3 gap-4">

      </div>


      <form
        onSubmit={sendText}
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
          backgroundColor={"w-fit btn-animated mx-10 h-fit"}
          Icon={RiTelegramFill}
          text={"Send"}
        />
      </form>
    </div>
  )
}

export default ProsPanel