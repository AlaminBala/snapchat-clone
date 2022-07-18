import React from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import { StopRounded } from "@material-ui/icons";
import { selectImage } from "./features/appSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { db } from "./firebase";
import ReactTimeago from "react-timeago";

function Chat({ id, username, timestamp, read, imageURL, profilePic }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageURL));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
    }
    history.push("/chats/view");
  };
  return (
    <div className="chat" onClick={open}>
      <Avatar className="chat__avatar" src={profilePic} />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"}{" "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />{" "}
        </p>
      </div>
      {!read && <StopRounded className="chat__readIcon" />}
    </div>
  );
}

export default Chat;
