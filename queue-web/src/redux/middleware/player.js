import { LOAD_PODCAST_EPISODE, FINISH_EPISODE_PLAYBACK, loadPodcastEpisode } from '../actions/player';
import { shiftFromQueue } from '../actions/queue';
export default (store) => (next) => (action) => {
  console.log('middleware', action, store.getState(), store.dispatch);
  if(action.type === FINISH_EPISODE_PLAYBACK) {
    alert("play next episode");
    const state = store.getState();
    store.dispatch(loadPodcastEpisode(state.queue.queue[0]));
    store.dispatch(shiftFromQueue());
  }
  next(action);
}
