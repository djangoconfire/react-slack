import React from 'react';
import { gql, graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex'
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';

class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false
  }

  // close modal
  handleCloseAddChannelClick = () => {
    this.setState({
      openAddChannelModal: false
    })
  }
  // opening modal 
  handleAddChannelClick = () => {
    this.setState({
      openAddChannelModal: true
    })
  }

  render() {
    const { data: { loading , allTeams }, currentTeamId } = this.props;
    if (loading) {
      return null;
    }

    const teamIdx = currentTeamId ? findIndex(allTeams, ['id', parseInt(currentTeamId,10)]) : 0;
    const team = allTeams[teamIdx];
    let username = '';
    try {
      const token = localStorage.getItem('token');
      const { user } = decode(token);
      // eslint-disable-next-line prefer-destructuring
      username = user.username;
    } catch (err) {}
          
    return [
      <Teams
        key="team-sidebar"
        teams={allTeams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
      />,
      <Channels
        key="channels-sidebar"
        teamName={team.name}
        username={username}
        channels={team.channels}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'Disha' }, { id: 3, name: 'Niharika' }]}
        onAddChannelClick={this.handleAddChannelClick}
      />,
      <AddChannelModal
        teamId={currentTeamId}
        onClose={this.handleCloseAddChannelClick}
        open={this.state.openAddChannelModal}
        key="add-channel-modal"
      />
    ];
  }
}

const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

export default graphql(allTeamsQuery)(Sidebar);