import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
    const [question, setQuestion] = useState("");
    const [platform, setPlatform] = useState("segment");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading indicator
        try {
            const res = await axios.post("http://localhost:5000/api/query", {
                question,
            });
            setResponse(res.data.answer); // Display response
        } catch (error) {
            setResponse("Error fetching the response.");
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    return (
        <div className="chatbot-container">
            <h1>CDP Support Agent</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Platform:
                    <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                        <option value="segment">Segment</option>
                        <option value="mparticle">mParticle</option>
                        <option value="lytics">Lytics</option>
                        <option value="zeotap">Zeotap</option>
                    </select>
                </label>
                <br />
                <label>
                    Question:
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            {loading && <p>Loading...</p>}
            {response && <div><h3>Response:</h3><p>{response}</p></div>}
        </div>
    );
};

export default Chatbot;
