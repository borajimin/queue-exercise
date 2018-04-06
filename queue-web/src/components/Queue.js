import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as queueActions from '../redux/actions/queue';

function Queue(props) {
  const { queue } = props;
  const returnToList = () => {
    console.log(props.history)
    props.history.goBack();
  }
  const returnToFront = () => {
    props.history.push("/");
  }
  return <div className="Queue">
    <button onClick={() => returnToList()}>Return to Podcast List</button>
    <button onClick={() => returnToFront()}>Return to Front Page</button>
    <div className="Queue-body">
      {
        (queue.queue) ? queue.queue.map((ep, index) => (
          <div key={`${ep.title}-${index}`}>
            <h3>{ep.title}</h3>
            <button onClick={() => props.removeFromQueue(index)}>Remove From Queue</button>
          </div>
        )) : <div>Queue is empty</div>
      }
    </div>
  </div>
}

Queue.propTypes = {
  queue: PropTypes.object,
  removeFromQueue: PropTypes.func.isRequired,
};

const mapStateToProps = ({ queue }) => ({ queue });
const mapDispatchToProps = (dispatch) => bindActionCreators(queueActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Queue);
