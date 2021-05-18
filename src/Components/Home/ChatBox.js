import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/userReducer'
import io from 'socket.io-client';
import './ChatBox.scss';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      message: "",
      username: '',
      chat: []
    };

    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

  }
  componentDidMount() {
    this.socket = io();
    this.socket.on("message dispatched", data => {
      this.updateMessage(data);
    });
  
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }
  updateMessage(data) {

    // console.log(data);
    console.log(this.state.chat.length)
    // this.state.chat.push(data)
    this.setState({chat: [...this.state.chat, data]})
    
    if (this.state.chat.length >= 9) {
      let chatLength = this.state.chat.shift()
      // console.log(chatLength)
      this.setState({chat: [...this.state.chat]})
      console.log(`the length is greater than 10, the length is ${this.state.chat.length}`)
    }
    console.log(this.state.chat)
    // this.renderChat()
  }
  

  // EVERYONE
  sendMessage() {
    const {message} = this.state
    let emptyCheck = message.replace(/\s/g, '').length
    if (emptyCheck === 0) {
      console.log('Message needs be atleast 1 character long.')
    }
    else if(message.length > 50) {

    }
    else {
      this.socket.emit("message sent", {
        username: this.props.user.username,
        message: this.state.message
    });
    // console.log('this is sendMessage')
    this.setState({message: ''})
    }
  }

  render() {
    const mapChat = this.state.chat.map(({ username, message }, index) => {
      
      return <div key={index}>
        <h3>
          {username}: <span>{message}</span>
        </h3>
      </div>
    })
    return (
    
  

     
      // EVERYONE IN ROOM
      <div className="chat">

        <div className='chat-title'>
          <h1>CodeCrack Trade Chat</h1>
        </div>  
          <div className='messages'>
            <div className='messages-content'>
            {mapChat}
          </div>
          </div>
          
        <div className='message-box' >
              <input placeholder="Type message..." className='message-input' value={this.state.message} onChange={e => {
                this.setState({
                  message: e.target.value
                })
              }} />
              <button className='message-submit'onClick={this.sendMessage}>Send</button>
            </div>   
      </div>
    );
  }
}

const mapStateToProps = (stateRedux) => {
  return {
      user: stateRedux.users
  }
}

export default connect(mapStateToProps, {getUser})(ChatBox);









