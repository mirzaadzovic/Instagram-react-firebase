import "./App.css";
import Post from "./Post";
import {useState, useEffect} from "react";
import {auth, db} from "./firebase";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import Header from "./Components/Header/Header";
import Signup from "./Components/Signup/Signup";

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
  const classes = useStyles();
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
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
            <Signup />
          </div>
        </center>
      </Modal>
      <Header />
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Sign up
      </Button>
      <div className="app__body">
        {posts.map(({id, post}) => (
          <Post
            key={id}
            imageUrl={post.imageUrl}
            username={post.username}
            caption={post.caption}
            avatar={post.avatarUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
