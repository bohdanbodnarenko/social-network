import {
  SET_CHANNELS,
  SET_SELECTED_CHANNEL,
  ADD_MESSAGE_TO_SELECTED_CHANNEL
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
      };
    case SET_SELECTED_CHANNEL:
      return {
        ...state,
        selectedChannel: action.payload
      };
    case ADD_MESSAGE_TO_SELECTED_CHANNEL:
      return {
        ...state,
        selectedChannel: {
          ...state.selectedChannel,
          messages: state.selectedChannel.messages.concat(action.payload)
        }
      };
    default:
      return state;
  }
};

export default channelsReducer;
