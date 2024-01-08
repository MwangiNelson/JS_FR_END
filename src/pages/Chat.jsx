import React, { useState } from "react";
import {
    GiPencil,
} from "react-icons/gi";

import AiTab from "./_chat_sections/_sidenav/AiTab";
import ProsTab from "./_chat_sections/_sidenav/ProsTab";
import ChatPanel from "./_chat_sections/_panels/ChatTab";
import { AppButton, IconButton, MagicButton } from "../components/buttons";

function Chat() {
    const [currentTab, setCurrentTab] = useState(0);

    const TabView = [AiTab, ProsTab, AiTab];

    return (
        <div className="w-full flex flex-col h-full">
            <nav
                className={`w-full flex flex-row bg-white py-2  justify-between px-10 items-center`}
            >
                <div className="lg:w-2/12 md:w-4/12 w-1/2">
                    <img
                        src="/images/nutri_logo.png"
                        className="w-full h-[7vh] object-contain md:object-cover "
                        alt=""
                    />
                </div>
                <div className="flex flex-row w-fit">
                    <img
                        src="/images/profile.jpg"
                        className="w-[3vw] h-[3vw] rounded-full object-cover"
                        alt=""
                    />
                </div>
            </nav>
            <div className="w-full flex flex-row h-full">
                <div className="w-1/4 py-3 bg-white px-4 h-full flex flex-col gap-5 justify-start items-center">
                    <div className="flex flex-row justify-between w-full">
                        <IconButton
                            Icon={GiPencil}
                            text="New Chat"
                            backgroundColor="bg-dull shadow-lg shadow-dull"
                            textStyle="text-cream text-md"
                        />
                        {/* <IconButton
              Icon={GiLaserWarning}
              text="Report Bug"
              backgroundColor="bg-yellow-400 shadow-lg shadow-dull"
              textStyle="text-white text-md"
            /> */}
                    </div>
                    <div className="flex py-5 gap-2 flex-row justify-between w-full">
                        <MagicButton
                            onClick={() => {
                                setCurrentTab(0);
                            }}
                            text="AI Chats"
                            styles="rounded-full text-white font-semibold  border-cream py-3 border-none w-1/3"
                            background={""}
                            transparent={false}
                        />
                        <AppButton
                            text={"Professionals"}
                            onClick={() => {
                                setCurrentTab(1);
                            }}
                            background={
                                "bg-cream text-gray-600 border-0 rounded-full h-full w-1/3 font-semibold"
                            }
                            styles={""}
                            transparent={false}
                        />
                        <AppButton
                            onClick={() => {
                                setCurrentTab(2);
                            }}
                            text={"Community"}
                            background={
                                "bg-cream text-gray-600 border-0 rounded-full h-full w-1/3 font-semibold"
                            }
                            styles={""}
                            transparent={false}
                        />
                    </div>
                    {React.createElement(TabView[currentTab])}
                </div>
                <div className="w-3/4 p-4 flex flex-col justify-start items-end">
                    <ChatPanel />
                </div>
            </div>
        </div>
    );
}

export default Chat;
