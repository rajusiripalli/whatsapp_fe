import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  updateMessagesAndConversations,
} from "../features/chatSlice";
import { ChatContainer, WhatsappHome } from "../components/Chat";
import SocketContext from "../context/socketContext";

function Home({ socket }) {
  console.log("socket -->", socket);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);

  //join user into the socket io
  useEffect(() => {
    socket.emit("join", user._id);
    //get online users
    socket.on("get-online-users", (users) => {
      console.log("online users --->", users);
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    if (user.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);

  //listening to received messages
  useEffect(() => {
    socket.on("receive message", (message) => {
      console.log("Recieve msg from other user -->", message);
      dispatch(updateMessagesAndConversations(message));
    });
  }, []);

  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        {/*container*/}
        <div className="container h-screen flex py-[19px]">
          {/*Sidebar*/}
          <Sidebar onlineUsers={onlineUsers} />
          {activeConversation._id ? (
            <ChatContainer onlineUsers={onlineUsers} />
          ) : (
            <WhatsappHome />
          )}
        </div>
      </div>
    </>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
