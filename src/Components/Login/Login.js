import React, {useState} from "react";
import {auth} from "../../firebase";
import Input from "@material-ui/core/Input";
import {Button} from "@material-ui/core";

const Login = ({user, setUser, setOpen}) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event, callback) => callback(event.target.value);
  const login = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      console.log("Sranje -> " + err.message);
      setError(err.message);
      setTimeout(() => setError(""), 5000);
    });
    if (!error) setOpen(false); //ako je uspješno, zatvoriti modal
  };
  return (
    <form action="">
      <img
        className="Signup__img"
        alt="instagram-logo"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
      />
      {error && (
        <div className="error__div">
          {error}{" "}
          <span
            style={{fontWeight: "bold", cursor: "pointer"}}
            onClick={() => setError("")}
          >
            x
          </span>
        </div>
      )}

      <div className="Signup__input">
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => handleChange(e, setEmail)}
        />
      </div>
      <div className="Signup__input">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => handleChange(e, setPassword)}
        />
      </div>
      <Button type="submit" style={{width: "100%"}} onClick={login}>
        Sign Up
      </Button>
    </form>
  );
};

export default Login;
