import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuth, logout } from "../Redux/actions";
import { useNavigate } from "react-router";

function NavBar() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserAuth());
  }, []);

  function openCloseModal() {
    setIsOpen(!modalIsOpen);
  }

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  const isLogged = (
    <>
      <Nav.Item>
        <Nav.Link>
          {authUser && console.log(authUser)}
          <h3>{authUser && authUser.fullName}</h3>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Button variant="danger" onClick={logoutUser}>
          Log out
        </Button>
      </Nav.Item>
    </>
  );

  const isNotLogged = (
    <>
      <Nav.Item>
        <Button variant="info" onClick={openCloseModal}>
          Register
        </Button>
        {modalIsOpen && <Register openCloseModal={openCloseModal} />}
      </Nav.Item>
      <Login />
    </>
  );

  return (
    <>
      <Nav>

        {authUser? isLogged: isNotLogged}
        
      </Nav>
    </>
  );
}

export default NavBar;
