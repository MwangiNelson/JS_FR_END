import React, { useContext, useState } from "react";
import {
    GiPencil,
} from "react-icons/gi";

import { useNavigate } from "react-router-dom";

import AiTab from "./_chat_sections/_sidenav/AiTab";
import ProsTab from "./_chat_sections/_sidenav/ProsTab";
import ChatPanel from "./_chat_sections/_panels/ChatTab";

import { AppButton, IconButton, MagicButton } from "../components/buttons";
import CommunityPanel from "./_chat_sections/_panels/CommunityPanel";
import ProsPanel from "./_chat_sections/_panels/ProsPanel";
import CommunityTab from "./_chat_sections/_sidenav/CommunityTab";
import { AppContext } from "../contexts/AppContexts";

function Chat() {

    const navigate = useNavigate()

    const { userData, logout } = useContext(AppContext)


    const [currentTab, setCurrentTab] = useState(0);
    const [docId, setDocId] = useState(0)

    const selectDoctor = (id) => {
        setDocId(id)
    }

    const TabView = [AiTab, ProsTab, CommunityTab];
    const PanelView = [ChatPanel, ProsPanel, CommunityPanel]

    return (
        <div className="w-full flex flex-col h-full">
            <nav
                className={`w-full flex flex-row bg-white py-2  justify-between px-10 items-center`}
            >
                <div className="lg:w-2/12 md:w-4/12 w-1/2">
                    <a href="/">
                        <img
                            src="/images/nutri_logo.png"
                            className="w-full h-[7vh] object-contain md:object-cover "
                            alt=""
                        />
                    </a>
                </div>
                <div className="flex flex-col me-10 dropdown">
                    <img src="/images/profile.jpg" tabindex="0" role="button" className='w-14 h-14 rounded-full object-cover' alt="" />
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box -translate-x-[3.5vw] translate-y-[7vh] w-52 top-0 bottom-0">
                        <li><a onClick={logout} className="text-center">Logout</a></li>

                    </ul>
                </div>
            </nav>
            <div className="w-full flex flex-row h-full">
                <div className="w-1/4 py-3 bg-white px-4 h-full flex flex-col gap-5 justify-start items-center">
                    <div className="flex flex-row justify-between w-full">
                        <IconButton
                            Icon={GiPencil}
                            onClick={() => { }}
                            text="New Chat"
                            backgroundColor="bg-dull shadow-lg shadow-dull"
                            textStyle="text-cream text-md"
                        />
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
                    {currentTab == 0 ? <ChatPanel /> : null}
                    {currentTab == 1 ? <ProsPanel doc_id={docId} /> : null}
                    {currentTab == 2 ? <CommunityPanel /> : null}


                </div>
            </div>
        </div>
    );
}

export default Chat;
