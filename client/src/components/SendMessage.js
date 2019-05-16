import React from 'react';
import styled from 'styled-components';
import { Input, Button, Message } from 'semantic-ui-react';
// import EmojiPicker from 'emoji-picker-react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

class SendMesssage extends React.Component {

  state = {
    msgVal: ''
  }

  // send message - Global Broadcasting 
  sendMessage = (e) => {
    console.log("Button Clicked");
  }

  // Add selected emoji to input field 
  addEmoji = (e) => {
    console.log("Emoji clicked",e)
    if (e.unified.length <= 5){
      let emojiPic = String.fromCodePoint(`0x${e.unified}`)
      this.setState({
        text: this.state.msgVal + emojiPic
      })
    }else {
      let sym = e.unified.split('-')
      let codesArray = []
      sym.forEach(el => codesArray.push('0x' + el))
      //console.log(codesArray.length)
      //console.log(codesArray)  // ["0x1f3f3", "0xfe0f"]
      let emojiPic = String.fromCodePoint(...codesArray)
      this.setState({
        text: this.state.msgVal + emojiPic
      })
    }
  }

  handleInputChange = e => {
    const { name , value } = e.target;
    this.setState({
      [name]: value
    })
    console.log("New State", this.state);
  }

  // rendering component
  render() {
    const { msgVal } = this.state
    const { channelName } = this.props;
    return (
      <SendMessageWrapper>
        <Input placeholder={`Message #${channelName}`} />
        {/* <Picker onSelect={this.addEmoji}/> */}
      </SendMessageWrapper>

    )
  }
}

export default SendMesssage
