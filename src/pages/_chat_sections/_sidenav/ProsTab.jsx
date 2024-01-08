import React from "react";
// Define the type for your title array
const Titles = [
  {
    name: "Title 1",
    last_text: "I need your help bro...",
    day: "5:00 PM",
    new_messages: 2,
  },
  {
    name: "Title 2",
    last_text: "I need your help bro...",
    day: "Yesterday",
    new_messages: 0,
  },
  {
    name: "Title 2",
    last_text: "I need your help bro...",
    day: "Yesterday",
    new_messages: 1,
  },
  {
    name: "Title 2",
    last_text: "I need your help bro...",
    day: "Yesterday",
    new_messages: 0,
  },
  {
    name: "Title 2",
    last_text: "I need your help bro...",
    day: "Yesterday",
    new_messages: 0,
  },
  {
    name: "Title 2",
    last_text: "I need your help bro...",
    day: "Yesterday",
    new_messages: 0,
  },
  {
    name: "Title 2",
    last_text: "I need your help bro...",
    day: "Yesterday",
    new_messages: 1,
  },
  {
    name: "Title 2",
    last_text: "I need your help bro...",
    day: "Yesterday",
    new_messages: 0,
  },
  {
    name: "Title 2",
    last_text: "I need your help bro...",
    day: "Yesterday",
    new_messages: 0,
  },
];

// Define the type for ChatStat props


// ChatStat component
const ChatStat = ({
  name,
  last_text,
  day,
  new_messages,
}) => {
  ChatStat;
  return (
    <li className="border-b w-full flex justify-between border:gray-100 dark:border-gray-600">
      <a
        href="#"
        className="flex  flex-row items-center justify-center w-full py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <div className="flex w-fit relative">
          <img
            className="rounded-full w-11 h-11 object-cover"
            src="/images/profile.jpg"
            alt="Jese Leos Avatar"
          />
          {new_messages > 0 ? (
            <span className="indicator-item badge badge-secondary bg-blue-800 border-none absolute -right-3">
              {new_messages}
            </span>
          ) : null}
        </div>
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col gap-2 ps-4">
            <p className="text-xl font-semibold text-dull dark:text-gray-400">
              {name}
            </p>
            <p className="m-0 p-0 text-sm">{last_text}</p>
          </div>
          <div className="flex flex-col w-fit">
            <p>{day}</p>
          </div>
        </div>
      </a>
    </li>
  );
};

// AiTab component
const ProsTab = () => {
  return (
    <div className="relative w-full overflow-y-scroll bg-white border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600 h-[55vh]">
      <ul className="w-full flex flex-col">
        {Titles.map((item) => (
          <ChatStat
            name={item.name}
            last_text={item.last_text}
            day={item.day}
            new_messages={item.new_messages}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProsTab;
