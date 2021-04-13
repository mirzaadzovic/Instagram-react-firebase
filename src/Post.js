import React from "react";
import "./Post.css";
import {Avatar} from "@material-ui/core";

const Post = (props) => {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={props.username}
          src={props.avatar}
        />
        <h4>{props.username}</h4>
      </div>
      <img className="post__image" src={props.imageUrl} alt={props.username} />
      <h4 className="post__text">
        <b>{props.username}: </b> {props.caption}
      </h4>
    </div>
  );
};

export default Post;
