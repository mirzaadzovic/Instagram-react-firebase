import React, {useState, useEffect} from "react";
import Input from "@material-ui/core/Input";
import {Button} from "@material-ui/core";
import "./Signup.css";
import {db, auth} from "../../firebase";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          //dont update username
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        //user logged out
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const handleChange = (e, callback) => {
    callback(e.target.value);
  };
  const signup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => setError(err.message));
    setTimeout(() => setError(""), 3000);
  };

  return (
    <form action="">
      <img
        alt="instagram-logo"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
      />
      {error && <div className="error__div">{error}</div>}
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
