import React, {useState} from "react";
import {Button} from "@material-ui/core";
import {storage, db} from "../../firebase";
import firebase from "firebase";
import "./ImageUpload.css";

const ImageUpload = ({username}) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  function handleCaptionChange(event) {
    setCaption(event.target.value);
  }
  const handleImageChange = (event) => {
    if (event.target.files[0]) setImage(event.target.files[0]);
    console.log(event.target.files[0].name);
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setImage(null);
            setCaption("");
          });
      }
    );
  };
  return (
    <div className="ImageUpload">
      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="Add caption..."
        value={caption}
        onChange={handleCaptionChange}
      />
      <input type="file" onChange={handleImageChange} />
      <Button onClick={handleUpload} className="ImageUpload__Button">
        Upload
      </Button>
    </div>
  );
};

export default ImageUpload;
