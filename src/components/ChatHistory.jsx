import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatHistory = () => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/chat-history");
                setChats(response.data);
            } catch (error) {
                console.error("Error fetching chat history", error);
            }
        };

        fetchChatHistory();
    }, []);

    return (
        <div>
            <h2>Chat History</h2>
            <ul>
                {chats.map((chat, index) => (
                    <li key={index}>
                        <p><strong>Question:</strong> {chat.question}</p>
                        <p><strong>Platform:</strong> {chat.platform}</p>
                        <p><strong>Response:</strong> {chat.response.join(", ")}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatHistory;
