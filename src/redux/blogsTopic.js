import * as ActionTypes from './ActionTypes';

export const Blogstopics = (state = { isLoading: true,
    errMess: null,
    blogstopics:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_BLOGSTOPIC:
            return {...state, isLoading: false, errMess: null, blogstopics: action.payload};

        case ActionTypes.BLOGSTOPIC_LOADING:
            return {...state, isLoading: true, errMess: null, blogstopics: []}

        case ActionTypes.BLOGSTOPIC_FAILED:
            return {...state, isLoading: false, errMess: action.payload, blogstopics: []};

        default:
            return state;
    }
};