import * as ActionTypes from './ActionTypes';
import { auth, firestore, date } from "../firebase/firebase";
// -------------------------------------------------------------------------------------------
export const fetchblogTopics = () => (dispatch) => {
    
    dispatch(blogTopicsLoading());
  
    return firestore.collection('blogsTpoic').get()
    .then(snapshot =>{
      let blogtopics = [];
      snapshot.forEach(doc=>{
        const data = doc.data()
        const _id = doc.id
        blogtopics.push({_id,...data});
      });
      return blogtopics;
    })
    .then(blogtopics => dispatch(addblogTopics(blogtopics)))
    .catch(error => {alert('blogsTopics not loaded\nError: '+error.message);});
  }
  
  export const blogTopicsLoading = () => ({
    type: ActionTypes.BLOGSTOPIC_LOADING
  });
  
  export const blogTopicsFailed = (errmess) => ({
    type: ActionTypes.BLOGSTOPIC_FAILED,
    payload: errmess
  });
  
  export const addblogTopics = (blogtopics) => ({
    type: ActionTypes.ADD_BLOGSTOPIC,
    payload: blogtopics
  });
  // -------------------------------------------------------------------------------------------
  export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading());
  
    return firestore.collection('leaders').get()
    .then(snapshot =>{
      let leaders = [];
      snapshot.forEach(doc=>{
        const data = doc.data()
        const _id = doc.id
        leaders.push({_id,...data});
      });
      return leaders;
    })
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error =>{alert('leaers not loaded\nError: '+error.message);});
  }
  
  export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
  });
  
  export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
  });
  
  export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
  });

  // -------------------------------------------------------------------------------------------

  export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return firestore.collection('promotions').get()
    .then(snapshot =>{
      let promos = [];
      snapshot.forEach(doc=>{
        const data = doc.data()
        const _id = doc.id
        promos.push({_id,...data});
      });
      return promos;
    })
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => {alert('promotins not loaded\nError: '+error.message);});
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

  // -------------------------------------------------------------------------------------------

export const fetchBlogs = (blogCategory) => (dispatch) => {
    
  dispatch(blogsLoading());

  return firestore.collection(blogCategory).get()
    .then(snapshot =>{
      let blogs = [];
      snapshot.forEach(doc=>{
        const data = doc.data()
        const _id = doc.id
        blogs.push({_id,...data});
      });
      return blogs;
    })
  .then(blogs => dispatch(addBlogs(blogs)))
  .catch(error => {alert('blogs not loaded\nError: '+error.message);});
}

export const blogsLoading = () => ({
  type: ActionTypes.BLOG_LOADING
});

export const blogsFailed = (errmess) => ({
  type: ActionTypes.BLOG_FAILED,
  payload: errmess
});

export const addBlogs = (blogs) => ({
  type: ActionTypes.ADD_BLOG,
  payload: blogs
});

  // ----------Topics related not in---------------------------------------------------------------------------------

export const fetchTopics = () => (dispatch) => {
    
  dispatch(topicsLoading());

  return firestore.collection('topics').get()
    .then(snapshot =>{
      let topics = [];
      snapshot.forEach(doc=>{
        const data = doc.data()
        const _id = doc.id
        topics.push({_id,...data});
      });
      return topics;
    })
  .then(topics => dispatch(addTopics(topics)))
  .catch(error => dispatch(topicsFailed(error.message)));
}

export const topicsLoading = () => ({
  type: ActionTypes.TOPICS_LOADING
});

export const topicsFailed = (errmess) => ({
  type: ActionTypes.TOPICS_FAILED,
  payload: errmess
});

export const addTopics = (topics) => ({
  type: ActionTypes.ADD_TOPICS,
  payload: topics
});

// ----------------------------------------------------------------------------------------------

export const postFeedback = ( feedback ) => (dispatch) => {
  return firestore.collection('feedback').add(feedback)
  .then(response => alert("Thank you for your feedback!" + response))
  .catch(error =>  { console.log('feedback post:', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
};

//------------------------------------------------------------------------------------------------

export const requestLogin = () => {
  return {
      type: ActionTypes.LOGIN_REQUEST
  }
}

export const receiveLogin = (user) => {
  return {
      type: ActionTypes.LOGIN_SUCCESS,
      user
  }
}

export const loginError = (message) => {
  return {
      type: ActionTypes.LOGIN_FAILURE,
      message
  }
}

export const loginUser = (creds) => (dispatch) => {
  dispatch(requestLogin(creds))

  return auth.signInWithEmailAndPassword(creds.username, creds.password)
  .then(() => {
      var user = auth.currentUser;
      dispatch(receiveLogin(user));
  })
  .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout())
  auth.signOut().then(() => {
    }).catch((error) => {
    });
  localStorage.removeItem('user');
  dispatch(receiveLogout())
}

export const startAuthListner = () => (dispatch) =>{

  return auth.onAuthStateChanged(function(user){
    if(user){
      dispatch(receiveLogin(user));
    }
  });
  
}
export const postBlog = ( blogdata ) => (dispatch) => {
  console.log(JSON.stringify(blogdata));
  const chapterId=blogdata.title.replace(/\s/g,'');
  blogdata.date=date;
  blogdata.email=auth.currentUser.email;
  // const increment = firestore.FieldValue.increment(1);

  return firestore.collection(blogdata.subjectId).doc(chapterId).set(blogdata)
  .then(response => alert("Thank you for posting blog " + response))
  .catch(error =>  { console.log('blog post:', error.message); alert('Your blog could not be posted\nError: '+error.message); });
};

export const dissMissLoginErr = () => (dispatch) => {
  dispatch(loginError(''))
}