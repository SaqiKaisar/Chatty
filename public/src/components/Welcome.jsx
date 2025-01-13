import styled from "styled-components";
import Robot from "../assets/robot.gif";
function Welcome({ currentUser }) {
  return (
    <>
      <Container>
        <img src={Robot} alt="Robot" />
        <div>
          Welcome, <span>{currentUser?.username || ""}!</span>
        </div>
        <h3>Please select a chat to start messaging</h3>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
  justify-content: center;
  color: white;
  div {
    font-size: 40px;
    span {
      color: rgb(0, 57, 243);
    }
  }
  img {
    height: 20rem;
  }
`;
export default Welcome;
