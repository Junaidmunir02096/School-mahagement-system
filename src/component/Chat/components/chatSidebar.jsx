import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ChatSidebar = ({ allChats, onSelectChat, selectedChatId }) => {
  const [showAllMessages, setShowAllMessages] = useState(false);

  const displayedMessages = showAllMessages ? allChats : allChats.slice(0, 7);

  return (
    <div className="bg-white rounded-tl-[20px] rounded-bl-[20px] p-[1.125rem] w-[24rem] shadow-sm">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-[#303972] text-[24px] font-bold">Messages</h2>
      </div>

      {/* Search Bar */}
      <div className="flex items-center border overflow-hidden bg-[#fff] rounded-full py-[12px] mb-[12px]">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
        <input type="text" placeholder="Search here..." className="outline-none ml-[10px] border-none ml-2 w-full text-[#A098AE] placeholder-[#A098AE]" />
      </div>

      {/* Messages List */}
      <div className={`flex flex-col  ${showAllMessages ? 'h-[70%] overflow-y-auto pr-[10px]' : ''}`}>
        {displayedMessages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => onSelectChat(msg)}
            className={`flex items-center gap-[15px] cursor-pointer p-[10px] border-b border-[#dbdbe7] transition-colors -ml-[10px]
        ${selectedChatId === msg.id ? 'bg-[#F3F4FF]' : 'hover:bg-[#F3F4FF]'}
    `}
          >
            <div className="flex-1 min-w-0"> 
              <div className="flex justify-between items-start mb-[5px]">
                <h3 className="text-[#303972] text-[16px] font-[600]">{msg.name}</h3>
                <span className="text-[#A098AE] text-[12px] flex-shrink-0 ml-[10px]">{msg.time}</span>
              </div>
              <p className="text-[#A098AE] w-[16rem] text-[13px] truncate">{msg.message}</p>
            </div>
            {msg.unread > 0 && (
              <div className="w-[24px] h-[24px] bg-[#FB7D5B] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#fff] text-[12px] font-[600]">{msg.unread}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowAllMessages(!showAllMessages)}
        className="w-full bg-[#ced0e8] text-[#4D44B5] text-[15px] border-none font-[600] py-[17px] rounded-full mt-[25px] hover:bg-[#e8e9fd] transition-colors"
      >
        {showAllMessages ? 'Show Less' : 'View More'}
      </button>
    </div>
  )
}

export default ChatSidebar;