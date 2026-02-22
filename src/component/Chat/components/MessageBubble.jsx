const MessageBubble = ({ message }) => {
  const isMe = message.sender === "me";

  return (
    <div
      className={`flex mb-3 ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-2 rounded-2xl max-w-xs ${
          isMe
            ? "bg-[#4D44B5] text-[#fff]"
            : "bg-gray-200 text-[#000]"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
