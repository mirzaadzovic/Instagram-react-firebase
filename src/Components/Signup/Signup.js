import React, {useState, useEffect} from "react";
import Input from "@material-ui/core/Input";
import {Button} from "@material-ui/core";
import "./Signup.css";
import {db, auth} from "../../firebase";

const Signup = ({user, username, setUser, setUsername, setOpen}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e, callback) => {
    callback(e.target.value);
  };
  const signup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => setError(err.message));
    setTimeout(() => setError(""), 5000);

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
          placeholder="Username"
          value={username}
          onChange={(e) => handleChange(e, setUsername)}
        />
      </div>
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
      <Button type="submit" style={{width: "100%"}} onClick={signup}>
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
