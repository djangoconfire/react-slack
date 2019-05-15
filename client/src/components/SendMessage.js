import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
// import EmojiPicker from 'emoji-picker-react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

class SendMesssage extends React.Component {
  
  render() {
    const { channelName } = this.props;
    return (
      <SendMessageWrapper>
        <Input fluid placeholder={`Message #${channelName}`} data-emojiable="true" />
      </SendMessageWrapper>

    )
  }
}

export default SendMesssage
