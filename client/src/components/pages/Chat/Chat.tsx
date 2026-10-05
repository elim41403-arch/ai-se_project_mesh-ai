import "./Chat.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { getChats, createChat, getChat } from "../../utils/api";
import type { Chat as ChatType, Message } from '../../utils/api'
import ErrorIcon from "../../../assets/error.svg"

export default function Chat() {
  const navigate = useNavigate();
  const [chats, setChats] = useState<ChatType[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chatsError, setChatsError] = useState<string | null>(null);
  const [isLoadingChats, setIsLoadingChats] = useState<boolean>(true);
  const [isCreatingChat, setIsCreatingChat] = useState<boolean>(false);
  const [newChatTitle, setNewChatTitle] = useState<string>("");

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const [messagesError, setMessagesError] = useState<string>("");


  useEffect(() => {
    const load = async () => {
      try {
        const res = await getChats();
        setChats(res.data || []);
      } catch {
        setChatsError("Failed to load chats.");
      } finally {
        setIsLoadingChats(false);  
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!activeChatId) {
      return;
    }

    const load = async () => {
      setMessages([]);
      setMessagesError("");
      setIsLoadingMessages(true);
      try {
        const res = await getChat(activeChatId)
        setMessages(res.data?.messages || []);
      } catch {
        setMessagesError("Failed to load messages.")
      } finally {
        setIsLoadingMessages(false);
      }
   };

    load();
  }, [activeChatId]);

  const handleCreateChat = async () => {
    const title = newChatTitle.trim() || 'New Chat';
    setIsCreatingChat(false);
    setNewChatTitle("");
    try {
      const res = await createChat(title);
      if (res.data) {
      const newChat = (res.data);
      setChats((prev) => [newChat!, ...prev])
      setActiveChatId(newChat._id);
      }
    } catch {
    // A toast or inline error could go here in the future
    }
  };

  return (
  <div className="chat">
    <aside className="chat__sidebar">
      <button className="chat__new-btn" type="button" onClick={() => setIsCreatingChat(true)}>
        + New Chat
      </button>

      {isCreatingChat && (
        <input
          className="chat__title-input"
          type="text"
          placeholder="Chat name"
          value={newChatTitle}
          onChange={(e) => setNewChatTitle(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCreateChat();
            if (e.key === 'Escape') {
              {setIsCreatingChat(false);
               setNewChatTitle("");
              }
            }
          }}
          autoFocus
        />
      )}

      {isLoadingChats && <p className="chat__sidebar-message">Loading…</p>}
      {chatsError && <p className="chat__sidebar-message">{chatsError}</p>}

      <ul className="chat__list">
        {chats.map((c) => (
          <li key={c._id} 
            className={
             c._id === activeChatId
             ? 'chat__item chat__item_active'
              : 'chat__item'
            }
           onClick={() => setActiveChatId(c._id)}
          >
            {c.title}
          </li>
        ))}
      </ul>
    </aside>

    <div className="chat__main">
      {!messagesError && !isLoadingMessages && !activeChatId && (
        <div className="chat__no-messages">
          <p>Create a new chat or select an existing one to start the conversation</p>
          <button className="chat__btn" type="button" onClick={() => setIsCreatingChat(true)}>
        Start New Chat
      </button>
        </div>
      )}
      
      {!messagesError && !isLoadingMessages && activeChatId && messages.length === 0 && (
        <div className="chat__no-messages">
          <p>Ask a question below to start the conversation</p>
        </div>
      )}

      {activeChatId && isLoadingMessages && (
        <p className="chat__loading-message">Loading...</p>
      )}

      {activeChatId && messagesError && (
        <div className="chat__error">
          <img src={ErrorIcon} alt="Red exclaimation mark error" className="chat__error-sign"></img>
          <h2 className="chat__error-message">Looks like something went wrong</h2>
          <p>Try reloading the page or creating the chat again</p>
          <button className="chat__btn" type="button" onClick={() => navigate('/knowledge')}>
        Go to the Main Page
      </button>
        </div>
      )}

      {activeChatId && !isLoadingMessages && !messagesError && (
        <ul className="chat__messages">
          {messages.map((m) => (
          <li key={m._id} 
            className={
             m.role === 'user'
             ? 'chat__message chat__message_user'
              : 'chat__message chat__message_assistant'
            }
          >
            <ReactMarkdown>{m.content}</ReactMarkdown>
          </li>
        ))}
        </ul>
      )}
    </div>
  </div>
  );
}