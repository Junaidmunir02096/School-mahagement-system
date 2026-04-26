import { useState } from "react";
import ChatSidebar from "../components/ChatSidebar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import { chatMockData } from "../mock/chatMockData.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [allChats, setAllChats] = useState(chatMockData);

    const handleSendMessage = (chatId, messageText) => {
        const currentTime = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        setAllChats(prevChats => prevChats.map(chat => {
            if (chat.id === chatId) {
                const newMessage = {
                    id: chat.conversation.length + 1,
                    text: messageText,
                    isSender: true,
                    time: currentTime
                };
                return {
                    ...chat,
                    conversation: [...chat.conversation, newMessage],
                    message: messageText,
                    time: currentTime
                };
            }
            return chat;
        }));

        // Update selected chat to reflect the new message
        if (selectedChat && selectedChat.id === chatId) {
            const updatedChat = allChats.find(c => c.id === chatId);
            if (updatedChat) {
                const newMessage = {
                    id: updatedChat.conversation.length + 1,
                    text: messageText,
                    isSender: true,
                    time: currentTime
                };
                setSelectedChat({
                    ...updatedChat,
                    conversation: [...updatedChat.conversation, newMessage]
                });
            }
        }
    };

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
    };

    return (
        <div className="w-full min-h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[10px]">   
            <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
                <h1 className="text-[28px] md:text-[36px] font-[700] text-center md:text-left p-[20px] text-[#4D44B5]">Chat</h1>
                <div className="flex items-center bg-[#fff] rounded-full px-4 py-[10px] w-full md:w-[300px]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[10px] md:ml-[20px]" />
                    <input type="text" placeholder="Search here..." className="outline-none ml-[10px] border-none w-full text-[#A098AE] placeholder-[#A098AE]" />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-[12px] lg:gap-[10px] bg-[#F3F4FF] p-[10px] h-auto lg:h-[calc(100vh-8rem)]">
                <ChatSidebar
                    allChats={allChats}
                    onSelectChat={handleSelectChat}
                    selectedChatId={selectedChat?.id}
                />
                <ChatWindow
                    chat={selectedChat}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default ChatPage;
