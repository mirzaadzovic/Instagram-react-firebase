import "./App.css";
import Post from "./Post";
import {useState, useEffect} from "react";
import {auth, db} from "./firebase";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Avatar} from "@material-ui/core";
import Header from "./Components/Header/Header";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import ImageUpload from "./Components/ImageUpload/ImageUpload";
import "./Components/Header/Header.css";
import InstagramEmbed from "react-instagram-embed";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 250,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: 20,
  },
}));
function App() {
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  useEffect(() => {
    // fetch("http://localhost:8080/users")
    //   .then((data) => data.json())
    //   .then((json) => console.log(json));
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        //user logged out
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({id: doc.id, post: doc.data()})));
      });
  }, []);
  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => {
          setOpen(!open);
        }}
      >
        <center>
          <div style={modalStyle} className={classes.paper}>
            <Signup
              user={user}
              username={username}
              setUser={setUser}
              setUsername={setUsername}
              setOpen={setOpen}
            />
          </div>
        </center>
      </Modal>
      <Modal
        open={loginOpen}
        onClose={() => {
          setLoginOpen(!loginOpen);
        }}
      >
        <center>
          <div style={modalStyle} className={classes.paper}>
            <Login user={user} setUser={setUser} setOpen={setLoginOpen} />
          </div>
        </center>
      </Modal>
      <div className="app__header">
        <img
          alt="instagram logo"
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        />
        <div style={{display: "flex"}}>
          {user ? (
            <>
              <Avatar
                alt={user.displayName}
                src={user.avatarUrl ? user.avararUrl : ""}
              >
                {user.displayName.slice(0, 1).toUpperCase()}
              </Avatar>
              <Button onClick={() => auth.signOut()}>Logout</Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setOpen(true);
                }}
              >
                Sign Up
              </Button>
              <Button onClick={() => setLoginOpen(true)} font-size="12">
                Login
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="app__body">
        {posts.map(({id, post}) => (
          <Post
            key={id}
            postId={id}
            imageUrl={post.imageUrl}
            username={post.username}
            caption={post.caption}
            avatar={post.avatarUrl}
            user={user}
          />
        ))}
      </div>
      {user?.displayName ? <ImageUpload username={user.displayName} /> : null}
    </div>
  );
}

export default App;
