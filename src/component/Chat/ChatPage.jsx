import { useState } from "react";
import ChatSidebar from "./components/chatSidebar.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import { chatMockData } from "../../mockData/chatMockData.js";
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
        <div className="w-[100%] h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[10px]">   
            <div className="flex justify-between items-center">
                <h1 className="text-[36px] font-[700] text-center p-[20px] text-[#4D44B5]">User Dashboard</h1>
                <div className="flex items-center bg-[#fff] rounded-full px-4 py-[10px] w-[300px]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
                    <input type="text" placeholder="Search here..." className="outline-none ml-[10px] border-none ml-2 w-full text-[#A098AE] placeholder-[#A098AE]" />
                </div>
            </div>
            <div className="flex h-[calc(100vh-4rem)] bg-[#F3F4FF] p-[10px]">
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























// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
// const ChatComp = () => {


//     const [showAllMessages, setShowAllMessages] = useState(false);
//     const allMessages = [
//         { id: 1, name: 'Samantha William', message: 'Lorem ipsum dolor sit amet...', time: '12:45 PM', unread: 2 },
//         { id: 2, name: 'Tony Soap', message: 'Lorem ipsum dolor sit amet...', time: '12:45 PM', unread: 2 },
//         { id: 3, name: 'Karen Hope', message: 'Lorem ipsum dolor sit amet...', time: '12:45 PM', unread: 0 },
//         { id: 4, name: 'Jordan Nico', message: 'Lorem ipsum dolor sit amet...', time: '12:45 PM', unread: 2 },
//         { id: 5, name: 'Nadila Adja', message: 'Lorem ipsum dolor sit amet...', time: '12:45 PM', unread: 0 },
//         { id: 6, name: 'John Smith', message: 'Lorem ipsum dolor sit amet...', time: '11:30 AM', unread: 1 },
//         { id: 7, name: 'Emma Wilson', message: 'Lorem ipsum dolor sit amet...', time: '10:15 AM', unread: 0 },
//         { id: 8, name: 'Robert Brown', message: 'Lorem ipsum dolor sit amet...', time: '09:45 AM', unread: 3 },
//     ];

//     const displayedMessages = showAllMessages ? allMessages : allMessages.slice(0, 7);

//     return (
//         <div className="w-full h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[20px]">

//             <div className="flex justify-between items-center">
//                 <h1 className="text-[36px] font-[700] text-center p-[20px] text-[#4D44B5]">Chat</h1>
//                 <div className="flex items-center bg-[#fff] rounded-full px-4 py-[10px] w-[300px]">
//                     <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
//                     <input type="text" placeholder="Search here..." className="outline-none ml-[10px] border-none ml-2 w-full text-[#A098AE] placeholder-[#A098AE]" />
//                 </div>
//             </div>

//             <div className="bg-[#fff] rounded-[20px] p-[1.125rem] w-[24rem] shadow-sm">
//                 {/* Header */}
//                 <div className="mb-[25px]">
//                     <h2 className="text-[#303972] text-[24px] font-[700]">Messages</h2>
//                 </div>

//                 {/* Search Bar */}
//                 <div className="flex items-center border-1 overflow-hidden bg-[#fff] rounded-full py-[12px] mb-[25px]">
//                     <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
//                     <input type="text" placeholder="Search here..." className="outline-none ml-[10px] border-none ml-2 w-full text-[#A098AE] placeholder-[#A098AE]" />
//                 </div>

//                 {/* Messages List */}
//                 <div className={`flex flex-col  ${showAllMessages ? 'h-[70%] overflow-y-auto pr-[10px]' : ''}`}>
//                     {displayedMessages.map((msg) => (
//                         <div key={msg.id} className="flex items-center gap-[15px] cursor-pointer hover:bg-[#F3F4FF] p-[10px] rounded-[12px] transition-colors -ml-[10px]">
//                             <div className="w-[50px] h-[50px] rounded-full bg-[#C1BBEB] flex-shrink-0"></div>
//                             <div className="flex-1 min-w-0">
//                                 <div className="flex justify-between items-start mb-[5px]">
//                                     <h3 className="text-[#303972] text-[16px] font-[600]">{msg.name}</h3>
//                                     <span className="text-[#A098AE] text-[12px] flex-shrink-0 ml-[10px]">{msg.time}</span>
//                                 </div>
//                                 <p className="text-[#A098AE] text-[13px] truncate">{msg.message}</p>
//                             </div>
//                             {msg.unread > 0 && (
//                                 <div className="w-[24px] h-[24px] bg-[#FB7D5B] rounded-full flex items-center justify-center flex-shrink-0">
//                                     <span className="text-[#fff] text-[12px] font-[600]">{msg.unread}</span>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>

//                 <button
//                     onClick={() => setShowAllMessages(!showAllMessages)}
//                     className="w-full bg-[#ced0e8] text-[#4D44B5] text-[15px] border-none font-[600] py-[17px] rounded-full mt-[25px] hover:bg-[#e8e9fd] transition-colors"
//                 >
//                     {showAllMessages ? 'Show Less' : 'View More'}
//                 </button>
//             </div>

//         </div>
//     )
// }

// export default ChatComp;