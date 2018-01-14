import React from 'react';

import './content.less';

const ErrorMessage = (props) => {
  if (props.data.length > 0) {
    const content = props.data.map((item, index) => {
      let homeGoals = [];
      let awayGoals = [];
      let homeEvents = [];
      let awayEvents = [];
      let homeSubs = {};
      let awaySubs = {};
      item.home_team_events.forEach((event, i) => {
        switch (event.type_of_event) {
          case 'goal':
            homeGoals.push(<div key={i}>{event.player} {event.time}</div>);
            break;
          case 'goal-own':
            awayGoals.push(<div key={i}>{event.player} {event.time} (OG) </div>);
            break;
          case 'penalty-wrong':
            homeEvents.push(<div key={i}>{event.player} {event.time} (PM)</div>);
            break;
          case 'goal-penalty':
            homeGoals.push(<div key={i}>{event.player} {event.time} (P)</div>);
            break;
          case 'yellow-card':
            homeEvents.push(<div key={i}>{event.player} {event.time} (YC)</div>);
            break;
          case 'red-card':
            homeEvents.push(<div key={i}>{event.player} {event.time} (RC)</div>);
            break;
          case 'substitution-out':
            if (!homeSubs[event.time]) {
              homeSubs[event.time] = {
                out: event.player
              }
            } else {
              homeSubs[event.time].out = event.player
            }
            break;
          case 'substitution-in':
            if (!homeSubs[event.time]) {
              homeSubs[event.time] = {
                in: event.player
              }
            } else {
              homeSubs[event.time].in = event.player
            }
            break;
        }
      })
      item.away_team_events.forEach((event, i) => {
        switch (event.type_of_event) {
          case 'goal':
            awayGoals.push(<div key={i}>{event.player} {event.time}</div>);
            break;
          case 'goal-own':
            homeGoals.push(<div key={i}>{event.player} {event.time} (OG)</div>);
            break;
          case 'penalty-wrong':
            awayEvents.push(<div key={i}>{event.player} {event.time} (PM)</div>);
            break;
          case 'goal-penalty':
            awayGoals.push(<div key={i}>{event.player} {event.time} (P)</div>);
            break;
          case 'yellow-card':
            awayEvents.push(<div key={i}>{event.player} {event.time} (YC)</div>);
            break;
          case 'red-card':
            awayEvents.push(<div key={i}>{event.player} {event.time} (RC)</div>);
            break;
          case 'substitution-out':
            if (!awaySubs[event.time]) {
              awaySubs[event.time] = {
                out: event.player
              }
            } else {
              awaySubs[event.time].out = event.player
            }
            break;
          case 'substitution-in':
            if (!awaySubs[event.time]) {
              awaySubs[event.time] = {
                in: event.player
              }
            } else {
              awaySubs[event.time].in = event.player
            }
            break;
        }
      })
      return (
        <tr key={index}>
          <td className="game">{item.home_team.country} {item.home_team.goals} - {item.away_team.goals} {item.away_team.country}</td>
          <td className="location">{item.location}</td>
          <td className="date">{formatDate(item.datetime)}</td>
          <td className="status">{item.status}</td>
          <td className="goals">
            <div className="home">
              {homeGoals}
            </div>
            <div className="away">
              {awayGoals}
            </div>
          </td>
          <td className="evetns">
            <div className="home">
              {homeEvents}
            </div>
            <div className="away">
              {awayEvents}
            </div>
          </td>
        </tr>
      )
    })
    return (
      <table className="content">
        <thead>
          <tr>
            <th className="game">Game</th>
            <th className="location">Location</th>
            <th className="date">Date</th>
            <th className="status">Status</th>
            <th className="events">Goals</th>
            <th className="events">Events</th>
          </tr>
        </thead>
        <tbody>
        {content}
        </tbody>
      </table>
    )
  } else {
    return null
  }
}

const formatDate = (data) => {
  const date = new Date(data);
  let dd = date.getDate();
  let mm = date.getMonth()+1;
  const yyyy = date.getFullYear();

  if( dd<10 ) {
    dd = '0' + dd;
  }
  if( mm<10 ) {
    mm = '0' + mm;
  }

  const result = dd + '/' + mm + '/' + yyyy;
  return result;
}

export default ErrorMessage;