import React, {useState, useEffect} from "react";
import "./Post.css";
import {Avatar} from "@material-ui/core";
import {db} from "./firebase.js";
import {Button} from "@material-ui/core";

const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    let unsubscribe;
    let postId = props.postId;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          console.log("Novi snapshot komentara");
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => unsubscribe();
  }, [comments]);

  const postComment = (event) => {
    event.preventDefault();
    const uploadComment = db
      .collection("posts")
      .doc(props.postId)
      .collection("comments")
      .set({username: props.user.displayName, text: input});
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={props.username}
          src={props.avatar}
        >
          {props.username.slice(0, 1).toUpperCase()}
        </Avatar>
        <h4>{props.username}</h4>
      </div>
      <img className="post__image" src={props.imageUrl} alt={props.username} />
      <p className="post__text">
        <b>{props.username}</b> {props.caption}
      </p>
      {comments.map((c) => {
        <p className="post__text">
          <b>{c.username}</b> {c.text}
        </p>;
      })}
      <center>
        <form className="Post__form">
          <input
            placeholder="Add comment..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" onClick={postComment} disabled={!input}>
            Comment
          </Button>
        </form>
      </center>
    </div>
  );
};

export default Post;
