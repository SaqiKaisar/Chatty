import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

function LogOut() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/logIn");
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  position: absolute;
  width: 100%;
  bottom: 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7%; /* Explicitly set a smaller height */
  padding: 0.2rem 0.5rem; /* Reduce padding to make the button smaller */
  border-radius: 0.3rem; /* Adjust the border-radius for proportion */
  background-color: rgb(153, 8, 8); /* Initial button color */
  border: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  svg {
    font-size: 1rem; /* Reduce the icon size to match the smaller button */
    color: #ebe7ff;
  }

  /* Hover effect */
  &:hover {
    background-color: rgb(
      203,
      26,
      26
    ); /* Change the entire button color on hover */
  }
`;

export default LogOut;
