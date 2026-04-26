import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPaperclip, faVideo, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const ChatWindow = ({ chat, onSendMessage }) => {

    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    // Auto scroll to bottom when new message comes
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat?.conversation]);

    // Empty state — no chat selected
    if (!chat) {
        return (
            <div className="flex-1 bg-[#fff] flex items-center border-t border-[#dbdbe7] lg:border-t-0 lg:border-l justify-center bg-[#F3F4FF] rounded-[16px] lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-[20px] lg:rounded-br-[20px]">
                <div className="text-center">
                    <div className="text-[60px] mb-4">💬</div>
                    <h3 className="text-[#303972] text-[20px] font-[600]">Select a conversation</h3>
                    <p className="text-[#A098AE] text-[14px] mt-2">Choose from your messages to start chatting</p>
                </div>
            </div>
        );
    }

    const handleSend = () => {
        if (inputText.trim() === '') return;
        onSendMessage(chat.id, inputText);  // send to parent
        setInputText('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="flex-1 w-full bg-[#fff] rounded-[16px] lg:rounded-tr-[20px] lg:rounded-br-[20px] lg:rounded-tl-none lg:rounded-bl-none border-t border-[#dbdbe7] lg:border-t-0 lg:border-l flex flex-col overflow-hidden shadow-sm h-[70vh] lg:h-auto max-h-[80vh]">

            {/* ---- HEADER ---- */}
            <div className="flex items-center justify-between px-[25px] py-[20px] border-b border-[#dbdbe7]">
                <div className="flex items-center gap-[15px]">
                    <div className="w-[50px] h-[50px] rounded-full bg-[#C1BBEB] flex-shrink-0"></div>
                    <div>
                        <h3 className="text-[#303972] text-[18px] font-[700]">{chat.name}</h3>
                        <div className="flex items-center gap-[6px]">
                            <div className={`w-[8px] h-[8px] rounded-full ${chat.isOnline ? 'bg-[#3dc166]' : 'bg-[#ea7464]'}`}></div>
                            <span className="text-[#A098AE] text-[13px]">{chat.isOnline ? 'Online' : 'Offline'}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-[20px] text-[#A098AE]">
                    <FontAwesomeIcon icon={faVideo} className="cursor-pointer hover:text-[#4D44B5] text-[18px]" />
                    <FontAwesomeIcon icon={faEllipsisVertical} className="cursor-pointer hover:text-[#4D44B5] text-[18px]" />
                </div>
            </div>

            {/* ---- MESSAGES AREA ---- */}
            <div className="flex-1 overflow-y-auto px-[25px] py-[20px] flex flex-col gap-[15px]">
                {chat.conversation.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex flex-col gap-[5px]">
                            <div
                                className={`px-[18px] py-[12px] rounded-[18px] max-w-[320px] text-[14px] leading-relaxed
                                    ${msg.isSender 
                                        ? 'bg-[#4D44B5] text-[#fff] rounded-br-[4px]' 
                                        : 'bg-[#F3F4FF] text-[#303972] rounded-bl-[4px]'
                                    }
                                `}
                            >
                                {msg.text}
                            </div>
                            <span className={`text-[11px] text-[#A098AE] ${msg.isSender ? 'text-right' : 'text-left'}`}>
                                {msg.time}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* ---- INPUT BAR ---- */}
            <div className="px-[25px] py-[20px] border-t border-[#F3F4FF]">
                <div className="flex items-center bg-[#F3F4FF] rounded-full px-[20px] py-[4px] gap-[15px]">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Write your message..."
                        className="flex-1 bg-transparent outline-none border-none text-[#303972] text-[14px] placeholder-[#A098AE]"
                    />
                    <FontAwesomeIcon icon={faPaperclip} className="text-[#A098AE] cursor-pointer hover:text-[#4D44B5]" />
                    <button
                        onClick={handleSend}
                        className="bg-[#4D44B5] text-[#fff] px-[20px] py-[10px] rounded-full flex items-center gap-[8px] hover:bg-[#3d35a0] transition-colors"
                    >
                        <span className="text-[14px] font-[600]">Send</span>
                        <FontAwesomeIcon icon={faPaperPlane} className="text-[14px]" />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ChatWindow;
