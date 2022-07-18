import {
  AttachFile,
  Close,
  Create,
  Crop,
  MusicNote,
  Note,
  Send,
  TextFields,
  Timer,
} from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import "./Preview.css";
import { v4 as uuid } from "uuid";
import { storage, db } from "./firebase";
import firebase from "firebase/compat/app";
import { selectUser } from "./features/appSlice";

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const closePreview = () => {
    dispatch(resetCameraImage());
    // history.replace("/");
  };

  useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");
    uploadTask.on(
      "state_changed",
      null,
      (error) => console.log(error),
      () => {
        storage
          .ref(`posts`)
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageURL: url,
              username: user.displayName,
              read: false,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace("/chats");
          });
      }
    );
  };

  return (
    <div className="preview">
      <Close className="preview__close" onClick={closePreview} />
      <div className="preview__toolbarRight">
        <TextFields />
        <Create />
        <Note />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />
      </div>
      <img src={cameraImage} alt="" />
      <div className="preview__footer" onClick={sendPost}>
        <h2>Send Now</h2>
        <Send fontSize="small" className="preview__sendIcon" />
      </div>
    </div>
  );
}

export default Preview;
