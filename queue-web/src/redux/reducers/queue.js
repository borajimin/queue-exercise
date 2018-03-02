import { ADD_TO_QUEUE, SHIFT_FROM_QUEUE, REMOVE_FROM_QUEUE } from '../actions/queue';
import { createReducer } from './utils';

const addEpisode = (state, { payload }) => {
  const newQueue = {
    queue: (!state.queue) ? [payload] : [...state.queue, payload]
  };
  return {...state, ...newQueue};
}
const shiftQueue = (state) => {
  const newQueue = {
    queue: state.queue.slice(1)
  };
  let newState = {...state, ...newQueue};
  return newState;
}
const removeEpisode = (state, { payload }) => {
  let list = state.queue.slice(0);
  list.splice(payload, 1);
  const newQueue = {
    queue: list
  }
  return {...state, ...newQueue};
}

const handlers = {
  [ADD_TO_QUEUE]: addEpisode,
  [SHIFT_FROM_QUEUE]: shiftQueue,
  [REMOVE_FROM_QUEUE]: removeEpisode,
};

export default createReducer({}, handlers);
