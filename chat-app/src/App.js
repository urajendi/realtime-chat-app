import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

// Styles imports
import './components/assets/styles/DesktopLayout.css';
import './components/assets/styles/MobileLayout.css';
import './components/assets/styles/ChatWindow.css';
import './components/assets/styles/Chat.css';

const client = new W3CWebSocket('ws://127.0.0.1:8000');

// OnClick Event Handlers
function onClickHandlerA(event) {
  event.preventDefault();
  const inputMsg = document.getElementById('AText').value;
  client.send(JSON.stringify({
    user: "A",
    type: "message",
    msg: inputMsg
  }));
  document.getElementById('AText').value = '';
}
function onClickHandlerB(event) {
  event.preventDefault();
  const inputMsg = document.getElementById('BText').value;
  client.send(JSON.stringify({
    user: "B",
    type: "message",
    msg: inputMsg
  }));
  document.getElementById('BText').value = '';
}

// OnEnter Event Handlers
function onEnterHandlerA(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const inputMsg = document.getElementById('AText').value;
    client.send(JSON.stringify({
      user: "A",
      type: "message",
      msg: inputMsg
    }));
    document.getElementById('AText').value = '';
  }
}
function onEnterHandlerB(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const inputMsg = document.getElementById('BText').value;
    client.send(JSON.stringify({
      user: "B",
      type: "message",
      msg: inputMsg
    }));
    document.getElementById('BText').value = '';
  }
}

// Convert Username to Class at run-time
function userToClass(user, currentChatWindow) {
  var userClass = '';
  if (user === 'A') {
    userClass = "MsgClassA chatItem card";
  } else {
    userClass = "MsgClassB chatItem card";
  }
  if (currentChatWindow === user) {
    userClass = userClass + " currentChat";
  } else {
    userClass = userClass + " otherChat";
  }
  return userClass;
}

// Convert currentWindow to Class at run-time
function currentWindowToClass(stateWindow, currentWindow){
  if(stateWindow===currentWindow){
    return "tab-item currentWindow";
  } else {
    return "tab-item otherWindow";
  }
}

// Convert currentWindow to Class at run-time
function currentWindowToButtonClass(stateWindow, currentWindow){
  if(stateWindow===currentWindow){
    return "tab-btn btn currentButton";
  } else {
    return "tab-btn btn";
  }
}

// Calculate current user
function findMsgOwner(user, currentChatWindow) {
  var currentUser = '';
  if (currentChatWindow === user) {
    currentUser = "You";
  } else {
    currentUser = user;
  }
  return currentUser;
}

// Rendering Mobile View Chat
function ChatWindow(props) {
  // Rendering window-A if state.currentWindow equals A
  if (props.currentWindow === 'A') {
    return (
      <div className="mobileViewContainer">
        <div id="msgContainerA" className="sessionChatMobile">
          <div className="chatLog">
            {props.state.messages.map((msg, index) =>
              <div className={userToClass(msg.user, 'A')} key={index}>
                <p className="cardMessage"><span className="user">{findMsgOwner(msg.user, 'A')}:</span> {msg.msg}</p>
              </div>
            )}
          </div>
        </div>
        <div id="msgFormA" className="sessionInputMobile">
          <input id="AText" className="textInput form-control" type="text" onKeyDown={onEnterHandlerA} autoComplete="off"></input>
          <button id="submitA" className="submitButton btn btn-primary btn-block" type="submit" onClick={onClickHandlerA}>Send</button>
        </div>
      </div>
    );
  } else { // Rendering window-B if state.currentWindow equals B
    return (
      <div className="mobileViewContainer">
        <div id="msgContainerB" className="sessionChatMobile">
          <div className="chatLog">
            {props.state.messages.map((msg, index) =>
              <div className={userToClass(msg.user, 'B')} key={index}>
                <p className="cardMessage"><span className="user">{findMsgOwner(msg.user, 'B')}:</span> {msg.msg}</p>
              </div>
            )}
          </div>
        </div>
        <div id="msgFormB" className="sessionInput">
          <input id="BText" className="textInput form-control" type="text" onKeyDown={onEnterHandlerB} autoComplete="off"></input>
          <button id="submitB" className="submitButton btn btn-primary" type="submit" onClick={onClickHandlerB}>Send</button>
        </div>
      </div>
    )
  }
}

export class App extends Component {
  constructor() {
    super();
    this.state = {
      currentWindow: 'A',
      width: window.innerWidth,
      messages: []
    };
  }

  componentDidMount() {

    // Event Listen for Window Size
    window.addEventListener('resize', this.handleWindowSizeChange);

    // Connection Established to the Server
    client.onopen = () => {
      console.log('WebSocket Client Connected!!');
    }

    // Retrieving message from server and storing in local state
    client.onmessage = (message) => {
      console.log(message.data.toString());
      const dataFromServer = JSON.parse(message.data)
      console.log("Got reply! - " + dataFromServer.msg);
      if (dataFromServer.type === "message") {
        this.setState((state) =>
        ({
          messages: [...state.messages,
          {
            msg: dataFromServer.msg,
            user: dataFromServer.user
          }]
        })
        );
      }
      console.log(this.state.messages);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  // Event handler for window's size change
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  // Event handler for shifting window's in Mobile View
  onClickTabEventHandler = (currentChatWindow) => {
    this.setState({ currentWindow: currentChatWindow });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 620;  // Will shift to mobile view if window size <= 620

    // Mobile View
    if (isMobile) {
      return (
        <div className="mobileLayout">
          <div id="ChatWindowA" className="ChatWindowMobile WindowAMobile">
            <div className="sessionName">
              <div className="tabs">
                <div className={currentWindowToClass(this.state.currentWindow, 'A')}>
                  <button className={currentWindowToButtonClass(this.state.currentWindow, 'A')} onClick={() => this.onClickTabEventHandler('A')}>
                    <div className="tab-content h4">Window-A</div>
                  </button>
                </div>
                <div className={currentWindowToClass(this.state.currentWindow, 'B')}>
                  <button className={currentWindowToButtonClass(this.state.currentWindow, 'B')} onClick={() => this.onClickTabEventHandler('B')}>
                    <div className="tab-content h4">Window-B</div>
                  </button>
                </div>
              </div>
            </div>
            <ChatWindow currentWindow={this.state.currentWindow} state={this.state} />
          </div>
        </div>
      )
    }

    // Desktop View
    else {
      return (
        <div className="desktopLayout">
          {/* ChatWindowA Components */}
          <div id="ChatWindowA" className="ChatWindowDesktop WindowADesktop">
            <div className="sessionName">
              <div className="userName h3">Window-A</div>
            </div>
            <div id="msgContainerA" className="sessionChat">
              <div className="chatLog">
                {this.state.messages.map((msg, index) =>
                  <div className={userToClass(msg.user, 'A')} key={index}>
                    <p className="cardMessage"><span className="user">{findMsgOwner(msg.user, 'A')}:</span> {msg.msg}</p>
                  </div>
                )}
              </div>
            </div>
            <div id="msgFormA" className="sessionInput">
              <input id="AText" className="textInput form-control" type="text" onKeyDown={onEnterHandlerA} autoComplete="off"></input>
              <button id="submitA" className="submitButton btn btn-primary btn-block" type="submit" onClick={onClickHandlerA}>Send</button>
            </div>
          </div>
          {/* ChatWindowB Components */}
          <div id="ChatWindowB" className="ChatWindowDesktop WindowBDesktop">
            <div className="sessionName">
              <div className="userName h3">Window-B</div>
            </div>
            <div id="msgContainerB" className="sessionChat">
              <div className="chatLog">
                {this.state.messages.map((msg, index) =>
                  <div className={userToClass(msg.user, 'B')} key={index}>
                    <p className="cardMessage"><span className="user">{findMsgOwner(msg.user, 'B')}:</span> {msg.msg}</p>
                  </div>
                )}
              </div>
            </div>
            <div id="msgFormB" className="sessionInput">
              <input id="BText" className="textInput form-control" type="text" onKeyDown={onEnterHandlerB} autoComplete="off"></input>
              <button id="submitB" className="submitButton btn btn-primary" type="submit" onClick={onClickHandlerB}>Send</button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;