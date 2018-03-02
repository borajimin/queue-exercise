export const ADD_TO_QUEUE = 'ADD_TO_QUEUE';
export const SHIFT_FROM_QUEUE = 'SHIFT_FROM_QUEUE';
export const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE';

export function addToQueue(episode) {
  return {
    type: ADD_TO_QUEUE,
    payload: episode,
  };
}

export function shiftFromQueue() {
  return {
    type: SHIFT_FROM_QUEUE,
  }
}

export function removeFromQueue(index) {
  return {
    type: REMOVE_FROM_QUEUE,
    payload: index,
  }
}
