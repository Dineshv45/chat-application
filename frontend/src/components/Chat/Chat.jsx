import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import { useLocation } from "react-router-dom"; 
import io from "socket.io-client";

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'http://localhost:5000'; 
let socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error) => {
      if (error) alert(error);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((msgs) => [...msgs, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
  <div className={`chatWrapper ${showUsers ? "withPanel" : ""}`}>
      
      <div className="usersPanel">
        <h3>Online Users</h3>
        <div className="usersBody">
          {users.map((u) => (
          <h4 key={u.id} className="userItem">{u.name}</h4>
        ))}
        </div>
      </div>

      <div className="container">
        <InfoBar room={room} toggleUsers={() => setShowUsers(!showUsers)} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>

  </div>
</div>

  );
};

export default Chat;
