import logo from "./logo.svg";
import "./App.css";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import Main from "./pages/Main";
import Container from "@material-ui/core/Container";
import NavBar from "./components/NavBar";
import CreateAccount from "./pages/CreateAccount"
import AddContact from "./pages/AddContact"
import CreateConversation from "./pages/CreateConversation"
import Message from "./pages/Message"


import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  const store = configureStore();

  return (
    <Router>
      <Provider store={store}>
        <Container className="mainHeight" maxWidth="sm">
          <NavBar />
          <Route exact path="/Main">
            <Main />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/CreateAccount">
            <CreateAccount />
          </Route>
          <Route exact path="/CreateConversation">
            <CreateConversation />
          </Route>
          <Route exact path="/AddContact">
            <AddContact />
          </Route>
          <Route exact path="/message">
            <Message />
          </Route>
        </Container>
      </Provider>
    </Router>
  );
}

export default App;
