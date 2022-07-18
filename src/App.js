import React, { useEffect } from "react";
import "./App.css";
import WebcamCapture from "./WebcamCapture";
import Preview from "./Preview";
import ChatView from "./ChatView";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { login, logout, selectUser } from "./features/appSlice";
import { useSelector, useDispatch } from "react-redux";
import Chats from "./Chats";
import Login from "./Login";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className="app__logo"
              src="https://1000logos.net/wp-content/uploads/2017/08/Snapchat-logo-700x394.png"
              alt=""
            />
            <div className="app__body">
              <div className="app__bodyBackground">
                <Switch>
                  <Route path="/chats/view">
                    <ChatView />
                  </Route>
                  <Route path="/chats">
                    <Chats />
                  </Route>
                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>
                  <Route path="/preview">
                    <Preview />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}
// TODO INSTALL FIREBASE
export default App;
