import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Avatar } from "@material-ui/core";
import { Search, ChatBubble, RadioButtonUnchecked } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { auth, db } from "./firebase";
import Chat from "./Chat";
import { selectUser } from "./features/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetCameraImage } from "./features/cameraSlice";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push("/");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          className="chats__avatar"
          onClick={() => {
            auth.signOut();
          }}
        />
        <div className="chats__search">
          <Search className="chats__searchIcon" />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubble className="chats__chatIcon" />
      </div>
      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageURL, read },
          }) => {
            return (
              <Chat
                key={id}
                id={id}
                username={username}
                timestamp={timestamp}
                imageURL={imageURL}
                read={read}
                profilePic={profilePic}
              />
            );
          }
        )}
      </div>
      <RadioButtonUnchecked
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}

export default Chats;
