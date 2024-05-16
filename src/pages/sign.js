import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Sign = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    number: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3006/sign", values);

      if (response.data.status === "Success") {
        switch (values.role) {
          case "manager":
            window.alert("Your account is created!");
            navigate("/manager");
            break;
          case "pharmacien":
            window.alert("Your account is created!");
            navigate("/pharmacien");
            break;
          case "vendeur":
            window.alert("Your account is created!");
            navigate("/vendeur");
            break;
          default:
            window.alert(response.data.msg);
            break;
        }
      } else {
        window.alert(response.data.msg);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      window.alert(
        "An error occurred. Please try again using a correct informations."
      );
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <div id="sign">
      <div className="container m-5">
        <div className="row">
          <div className="col-lg-5 align-self-center ">
            <div className="title mb-3 mt-3 text-light">
              Welcome to SalCo Pharmacy
            </div>
            <p>
              As you journey through our virtual doors, vibrant hues of health
              and vitality greet you, inviting you to access a wealth of
              healthcare resources with just a click.
            </p>
            <Button variant="" className="btn-outline-light w-25 mt-3" href="/">
              home
            </Button>
          </div>
          <div className="col-lg-7">
            <div className="title mb-2" style={{ color: "rgb(255, 153, 0)" }}>
              sign up
            </div>
            <Form className="" onSubmit={handleSubmit}>
              <Form.Group
                as={Row}
                className="mb-3 justify-content-center text-secondary"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    className="input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3 justify-content-center text-secondary"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    className="input"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3 justify-content-center text-secondary"
                controlId="formNumber"
              >
                <Form.Label column sm="2">
                  Phone 
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    className="input"
                    name="number"
                    placeholder="Phone Number"
                    type="number"
                    value={values.number}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Select
                sm="8"
                className="input"
                aria-label="Default select example"
                onChange={e=> values.role = e.target.value}
              >
                <option>Select your role</option>
                <option value="pharmacien">Pharmacien</option>
                <option value="manager">Manager</option>
                <option value="vendeur">Seller</option>
              </Form.Select>
              <Button
                variant=""
                type="submit"
                className="btn btn-orange w-25 mt-3"
              >
                sign up
              </Button>
            </Form>
            <div className="mt-1">
              <a href="/login" className="text-center">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="circle"></div>
      <div className="rectengle"></div>
    </div>
  );
};

export default Sign;
