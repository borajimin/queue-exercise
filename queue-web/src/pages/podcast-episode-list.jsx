import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as playerActions from '../redux/actions/player';
import * as queueActions from '../redux/actions/queue';

function PodcastEpisodeList(props) {
  const { item: episodes = [] } = props;

  const formattedEps = episodes.map(({ enclosure, title: [title] }) => ({
    title,
    src: enclosure[0].$.url,
  }));

  const queuePage = () => {
    props.history.push('/queue');
  };
  return <div>
    <button onClick={() => queuePage()}>View Queue</button>
    {
      formattedEps.map((ep, index) => (
        <div key={`${ep.title}-${index}`}>
          <h3 onClick={() => props.loadPodcastEpisode(ep)}>{ep.title}</h3>
          <button onClick={() => props.addToQueue(ep)}>Add to Queue</button>
        </div>
      ))
    }
  </div>;
}

PodcastEpisodeList.propTypes = {
  addToQueue: PropTypes.func.isRequired,
  loadPodcastEpisode: PropTypes.func.isRequired,
  title: PropTypes.array,
  item: PropTypes.array,
};

const mapStateToProps = (state, { match }) => state.podcasts[match.params.slug] || {};
const mapDispatchToProps = (dispatch) => bindActionCreators({...playerActions, ...queueActions}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastEpisodeList);
