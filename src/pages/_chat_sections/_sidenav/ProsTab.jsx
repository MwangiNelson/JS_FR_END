import React,{useState,useEffect} from "react";
import { IoMdChatbubbles } from "react-icons/io";
import { FaKitMedical, FaThumbsUp } from "react-icons/fa6";

import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { db } from '../../../firebase'

const Titles = [
  {
    name: "Title 1",
    speciality: "I need your help bro...",
    day: "5:00 PM",
    new_messages: 2,
  },
  {
    name: "Title 2",
    speciality: "I need your help bro...",
    day: "Yesterday",
    new_messages: 0,
  },
  {
    name: "Title 2",
    speciality: "I need your help bro...",
    day: "Yesterday",
    new_messages: 1,
  },
];

// Define the type for ChatStat props


// ChatStat component
const ChatStat = ({
  name,
  speciality,
}) => {
  ChatStat;
  return (
    <li 
    
    className="border-b w-full flex justify-between border:gray-100 dark:border-gray-600">
      <div
        className="flex  flex-row items-center justify-center w-full py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <div className="flex w-fit relative">
          <img
            className="rounded-full w-11 h-11 object-cover"
            src="/images/doctor.png"
            alt="doctor"
          />

          <span className="indicator-item badge badge-secondary bg-green-500 border-none absolute -right-3">
            <FaKitMedical />
          </span>

        </div>
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col gap-2 ps-4">
            <p className="text-xl font-semibold text-dull dark:text-gray-400">
              {name}
            </p>
            <p className="m-0 p-0 text-sm">{speciality}</p>
          </div>
          <div className="flex flex-col w-fit h-full items-center pe-4">
            <div className="w-10 h-10 bg-purple-800 rounded-full flex items-center justify-center">
              <IoMdChatbubbles className="text-white text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

// AiTab component
const ProsTab = (props) => {

  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    const fetchDoctors = () => {
      const q = query(collection(db, 'Doctor_data'));
      onSnapshot(q, (querySnapshot) => {
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDoctors(docs);
      });
    };

    fetchDoctors();
  }, []);
  return (
    <div className="relative w-full overflow-y-scroll bg-white border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600 h-[55vh]">
      <ul className="w-full flex flex-col">
        {doctors.map((item) => (
          <ChatStat
            name={item.doc_name}
            speciality={item.doc_specialty}
            on_click={props.onclick}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProsTab;
