import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import axios from "axios";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
import { host } from "../utils/APIRoutes";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState();
  const [isLoaded, setIsLoaded] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      if (!user) {
        navigate("/login");
      } else {
        setCurrentUser(user);
        setIsLoaded(true);
      }
    };

    fetchUser();
  }, []); // Dependency on navigate

  useEffect(() => {
    // Run this only when currentUser is valid and avatar image is set
    if (currentUser && currentUser.isAvatarImageSet) {
      const getAllUsers = async () => {
        try {
          const { data } = await axios.get(
            `${allUsersRoute}/${currentUser._id}`
          );
          setContacts(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      getAllUsers();
    } else if (currentUser && !currentUser.isAvatarImageSet) {
      navigate("/setAvatar");
    }
  }, [currentUser]); // Dependency on currentUser and navigate
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentUser={currentUser}
            currentChat={currentChat}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  wdith: 100vw;
  flex-direction: column;
  gap: 1rem;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: rgb(0, 0, 10);
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
  h1 {
    color: white;
    margin: 0; /* Optional: Remove default margin */
    position: absolute; /* Absolute positioning to center */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export default Chat;
