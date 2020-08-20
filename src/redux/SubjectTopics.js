import * as ActionTypes from './ActionTypes';

export const SubjectTopics = (state  = { isLoading: true,
                                        errMess: null,
                                        topics:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TOPICS:
        return {...state, isLoading: false, errMess: null, topics: action.payload};

        case ActionTypes.TOPICS_LOADING:
            return {...state, isLoading: true, errMess: null, topics: []}

        case ActionTypes.TOPICS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, topics: []};

        default:
          return state;
      }
};