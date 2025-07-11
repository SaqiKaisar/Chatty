import { useState, useEffect } from "react";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOption = {
    position: "bottom-right",
    autoClose: 3000,
    theme: "dark",
  };
  useEffect(() => async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/logIn");
    }
  });
  useEffect(
    () => async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data).toString("base64");
        data.push(buffer);
      }
      setAvatars(data);
      setIsLoading(false);
    },
    []
  );
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOption);
      return;
    } else {
      try {
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });

        console.log(data);

        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = avatars[selectedAvatar];
          localStorage.setItem("chat-app-user", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error(
            "Error in setting profile picture, try again",
            toastOption
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Select avatar for Profile Picture</h1>
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    key={index}
                    className={`avatar ${
                      selectedAvatar === index ? "selected" : ""
                    }`}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Proflie Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: rgb(5, 11, 32);
  gap: 3rem;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      dsiplay: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid rgb(14, 215, 255);
    }
  }

  .submit-btn {
    background-color: rgb(14, 114, 255);
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: rgb(14, 215, 255);
    }
  }
`;

export default SetAvatar;
