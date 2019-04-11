import {
  SET_CHANNELS,
  SET_SELECTED_CHANNEL
} from "./types";

const initState = {
  channels: [],
  selectedChannel: null
};

const channelsReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CHANNELS:
      return {
        ...state,
        channels: action.payload
      }
    case SET_SELECTED_CHANNEL:
      return {
        ...state,
        selectedChannel: action.payload
      }
    default:
      return state;
  }
};

export default channelsReducer;