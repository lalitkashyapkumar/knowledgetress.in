import * as ActionTypes from './ActionTypes';

export const Blogs = (state  = { isLoading: true,
                                        errMess: null,
                                        blogs:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_BLOG:
        return {...state, isLoading: false, errMess: null, blogs: action.payload};

        case ActionTypes.BLOG_LOADING:
            return {...state, isLoading: true, errMess: null, blogs: []}

        case ActionTypes.BLOG_FAILED:
            return {...state, isLoading: false, errMess: action.payload, blogs: []};

        default:
          return state;
      }
};