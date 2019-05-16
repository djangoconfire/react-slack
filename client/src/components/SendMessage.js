import React from 'react';
import styled from 'styled-components';
import { Input, Button, Message } from 'semantic-ui-react';
// import EmojiPicker from 'emoji-picker-react';
// import 'emoji-mart/css/emoji-mart.css'
// import { Picker } from 'emoji-mart'

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

class SendMesssage extends React.Component {

  state = {
    msgVal: ''
  }

  handleInputChange = e => {
    const { name , value } = e.target;
    this.setState({
      [name]: value
    })
  }

  // rendering component
  render() {
    const { msgVal } = this.state
    const { channelName } = this.props;
    return (
      <SendMessageWrapper>
        <Input placeholder={`Message #${channelName}`}/>
        {/* <Picker onSelect={this.addEmoji}/> */}
      </SendMessageWrapper>

    )
  }
}

export default SendMesssage