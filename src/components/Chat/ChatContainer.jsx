import React, { useEffect } from "react";
import ChatHeader from "./header/ChatHeader";
import { useDispatch, useSelector } from "react-redux";
import ChatMessages from "./messages/ChatMessages";
import { getConversationMessages } from "../../features/chatSlice";

export default function ChatContainer() {
  const dispatch = useDispatch();
  const { activeConversation, messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const { token } = user;

  const values = {
    token,
    convo_id: activeConversation?._id,
  };

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);
  console.log("messages....>", messages);
  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden ">
      {/*Container*/}
      <div>
        {/* Chat Header */}
        <ChatHeader />
        {/* Chat Messages */}
        <ChatMessages />
      </div>
    </div>
  );
}