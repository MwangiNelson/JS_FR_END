import React from "react";
import { IconButton } from "../components/buttons";
import { RiArrowRightUpLine } from "react-icons/ri";

function Home() {
  return (
    <section className="flex flex-row w-full h-fit py-10 md:py-20 justify-center" style={{}}>
      <div className="w-11/12 md:w-10/12 lg:w-3/4 flex flex-col md:flex-row items-center lg:gap-0 gap-10">
        <div className="w-full md:w-1/2 flex flex-col gap-5 lg:gap-10 items-start justify-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-7xl gap-3">
            Get your custom 
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Chatbot
            </span>
            for therapeutic care.
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>

          <IconButton 
            text="Try Nutribot"
            Icon={RiArrowRightUpLine}
            backgroundColor="bg-purple-800"
            textStyle="text-white"
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-end">
          <img src="/images/chat.png" className="h-[50vh] lg:w-fit w-full lg:object-cover object-contain lg:h-fit" alt="" />
        </div>
      </div>
    </section>
  );
}

export default Home;
