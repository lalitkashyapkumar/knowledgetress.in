import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Blogstopics } from "./blogsTopic";
import { Leaders } from "./leaders";
import { Promotions } from "./promotios";
import { SubjectTopics } from './SubjectTopics';
import { Blogs } from "./blogs";
import { Auth } from './auth';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            blogstopics: Blogstopics,
            leaders: Leaders,
            promotions: Promotions,
            topics: SubjectTopics,
            auth:Auth,
            blogs:Blogs,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}