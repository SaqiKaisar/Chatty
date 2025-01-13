import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { logInRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
function LogIn() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOption = {
    position: "bottom-right",
    autoClose: 3000,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      try {
        const { data } = await axios.post(logInRoute, {
          username,
          password,
        });
        if (data.state == false) {
          toast.error(data.message, toastOption);
        }
        if (data.state == true) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleValidation = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username is required", toastOption);
      return false;
    } else if (password === "") {
      toast.error("Password is required", toastOption);
      return false;
    } else {
      return true;
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>CHATTY</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => handleChange(event)}
          />
          <button type="submit">Log In</button>
          <span>
            Do not have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: rgb(5, 11, 32);
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: rgba(0, 0, 0, 0.46);
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid rgb(14, 114, 255);
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid rgb(14, 215, 255);
      outline: none;
    }
  }
  button {
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
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: rgb(14, 114, 255);
      text-decoration: none;
      font-weight: bold;
      &:hover {
        color: rgb(14, 215, 255);
      }
    }
  }
`;

export default LogIn;
