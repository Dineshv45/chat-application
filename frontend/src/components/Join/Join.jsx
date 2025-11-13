import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [error, setError] = useState('');

  const handleClick = (e) => {
    if (!name.trim() || !room.trim()) {
      e.preventDefault();
      setError("Both fields are required!");
    } else {
      setError(""); // clear error
    }
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>

        {/* Name Input */}
        <div>
          <input
            placeholder="Name"
            className={`joinInput ${error && !name ? 'errorInput' : ''}`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && <p className="errorText">Name is required</p>}
        </div>

        {/* Room Input */}
        <div>
          <input
            placeholder="Room"
            className={`joinInput mt-20 ${error && !room ? 'errorInput' : ''}`}
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          {error && !room && <p className="errorText">Room is required</p>}
        </div>

        {/* Button */}
        <Link
          onClick={handleClick}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">Sign In</button>
        </Link>

        {/* Show global error if needed */}
        {error && <p className="errorText" style={{ marginTop: 10 }}>{error}</p>}
      </div>
    </div>
  );
}
