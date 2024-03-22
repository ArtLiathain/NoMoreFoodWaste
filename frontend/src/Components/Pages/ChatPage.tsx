import React, { useState } from "react";

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages([...messages, "Me:" + inputValue]);
      setInputValue("");
    }
  };

  return (
    <div className="context-page ">
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="mr-2"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
