import { useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('http://localhost:5000/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { sender: 'myra', text: data.reply }])
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'myra', text: 'Something went wrong reaching me...' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <h1>Myra</h1>
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="message myra">Myra is typing...</div>}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Talk to Myra..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default App