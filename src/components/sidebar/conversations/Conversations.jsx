import React from "react";
import { useSelector } from "react-redux";
import Conversation from "./Conversation";

export default function Conversations() {
  const { conversations } = useSelector((state) => state.chat);

  return (
    <div className="convos scrollbar">
      {conversations &&
        conversations.map((convo, id) => (
          <Conversation convo={convo} key={convo._id} />
        ))}
    </div>
  );
}
