import * as ActionTypes from './ActionTypes';

export const Test = (state  = { isLoading: true,
                                        errMess: null,
                                        blogs:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TEST:
        return {...state, isLoading: false, errMess: null, blogs: action.payload};

        case ActionTypes.TEST_LOADING:
            return {...state, isLoading: true, errMess: null, blogs: []}

        case ActionTypes.TEST_FAILED:
            return {...state, isLoading: false, errMess: action.payload, blogs: []};

        default:
          return state;
      }
};