import React from "react";
import { IconButton } from "../../../components/buttons";
import { GiTrashCan } from "react-icons/gi";

// Define the type for your title array
const Titles = [
  "Sample Title",
  "Sample Title",
  "Sample Title",
  "Sample Title",
  "Sample Title",
  "Sample Title",
  "Sample Title",
  "Sample Title",
  "Sample Title",
  "Sample Title",
];



// ChatStat component
const ChatStat = ({ text }) => {
  return (
    <div className="w-full text-blue-800 bg-purple-100 hover:bg-blue-800/50 hover:text-white transition ease duration-300 dark:bg-purple-900 dark:text-purple-300 p-4 py-3 rounded-lg flex flex-row justify-between items-center">
      <h1 className="font-bold max-w-3/4 overflow-hidden whitespace-nowrap overflow-ellipsis">
        {text}
      </h1>
      <IconButton
        backgroundColor={"!p-0 !ms-10 m-0 text-dull/50 hover:bg-red-500/40"}
        text={""}
        Icon={GiTrashCan}
      />
    </div>
  );
};

// AiTab component
const AiTab = () => {
  return (
    <div className="w-full flex flex-col gap-3 h-full overflow-y-scroll">
      <h3 className="flex flex-row gap-[5px] text-center items-center w-full">
        <span className="flex-1 border border-gray-300"></span>
        <span className="flex-2">Conversation History</span>
        <span className="flex-1 border border-gray-300"></span>
      </h3>

      <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-scroll">
        {Titles.map((title, index) => (
          <ChatStat key={index} text={`${title} ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default AiTab;
