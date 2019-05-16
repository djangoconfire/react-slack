import React from 'react';
import findIndex from 'lodash/findIndex';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sidebar';
import { graphql } from 'react-apollo';
// graphql query
import { allTeamsQuery } from '../graphql/team';

const DashboardComponent = ({ data: { loading, allTeams }, match : { params }}) => {
  // app loading 
  if (loading){
    return null;
  }

  const { teamId, channelId } = params;
  const teamIdx = teamId ? findIndex(allTeams , ['id', parseInt(teamId , 0)]) : 0;
  const team = allTeams[teamIdx]
  const channelIdx = channelId ? findIndex(team.channels, ['id', parseInt(channelId, 10)]) : 0;
  const channel = team.channels[channelIdx];

  return (
    <AppLayout>
      <Sidebar currentTeamId={params.teamId} />
      <Header channelName={channel.name} />
      <Messages>
        <ul className="message-list">
          <li>Welcome to Slack</li>
          <li />
        </ul>
      </Messages>
      <SendMessage channelName={channel.name} />
    </AppLayout>
  );
};

// component with higher orer component 
export default graphql(allTeamsQuery)(DashboardComponent)