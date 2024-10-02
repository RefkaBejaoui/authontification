import { useState } from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { login } from "../Redux/actions";
import {useNavigate} from "react-router"

Modal.setAppElement("#root");

function Login() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function openCloseModal() {
    setIsOpen(!modalIsOpen);
  }

  const dispatch = useDispatch();
  const loginNew = (e) => {
    e.preventDefault();
    const user = {
        email: email,
        password: password
    }
    dispatch(login(user));
    openCloseModal();
    navigate("/dashboard")
  }

  return (
    <div>
      <Button variant="primary" onClick={openCloseModal}>Login</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={openCloseModal}
      >
        <h2>Login</h2>
        <button onClick={openCloseModal}>Close</button>
        <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={loginNew}>
              Login
            </Button>
          </Form>
      </Modal>
    </div>
  );
}

export default Login;
