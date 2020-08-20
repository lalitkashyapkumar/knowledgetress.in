import React, { Component } from 'react';
import BlogDetail from './BlogDetailsComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Editor from './EditorComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Blog from './BlogComponent';
import { fetchblogTopics, fetchLeaders, fetchPromos, postFeedback, loginUser, logoutUser, startAuthListner, postBlog, dissMissLoginErr} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
const mapStateToProps = state =>{
  return{
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    blogstopics:state.blogstopics,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch =>({
  startAuthListner:()=>dispatch(startAuthListner()),
  fetchblogTopics:() => dispatch(fetchblogTopics()),
  fetchLeaders:() => dispatch(fetchLeaders()),
  fetchPromos: () => dispatch(fetchPromos()),
  loginUser: (creds) => dispatch(loginUser(creds)),
  dissMissLoginErr: () => dispatch(dissMissLoginErr()),
  logoutUser: () => dispatch(logoutUser()),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  postBlog:(blogdata)=> dispatch(postBlog(blogdata)),
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
})

class Main extends Component {
  componentDidMount(){
    this.props.startAuthListner();
    this.props.fetchblogTopics();
    this.props.fetchLeaders();
    this.props.fetchPromos();
  }
  render(){
    const HomePage = () => {
      return(
          <Home
          blogstopics={this.props.blogstopics.blogstopics.filter((blogstopic) => blogstopic.featured)[0]}
          blogstopicsLoading={this.props.blogstopics.isLoading}
          blogstopicsErrMess={this.props.blogstopics.errMess}

          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}

          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
          
          blogstopicsSlider={this.props.promotions.promotions.filter((promo) => promo.featured===false)}
          blogstopicsLoadingSlider={this.props.blogstopics.isLoading}
          blogstopicsErrMessSlider={this.props.blogstopics.errMess}
          
          />
      );
    }
    const feedbackForm = () => {
      return(
        <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                postFeedback={this.props.postFeedback}
        />
      );
    }
    const Url = ({match})=>{
      // this.props.fetchblogTopics();
      return(
          <BlogDetail subjectId={match.params.subjectId}
          chapterId={match.params.chapterId ? match.params.chapterId :'introduction'}/>
      );
    }
    
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/home',
              state: { from: props.location }
            }} />
      )} />
    );
    const EditorPage = () =>{
      return(<Editor postBlog={this.props.postBlog}
              blogstopics={this.props.blogstopics}
      />);
    }
    return (
      <div>
          <Header auth={this.props.auth} 
                  loginUser={this.props.loginUser} 
                  logoutUser={this.props.logoutUser}
                  dissMissLoginErr={this.props.dissMissLoginErr}/>
          <Switch>
              <Route path='/home' component={HomePage} />
              <Route path='/aboutus' component={()=> <About leaders={this.props.leaders}/>}/> 
              <Route exact path='/blog' component={() => <Blog blogs={this.props.blogstopics} />} />
              <Route exact path='/blog/:subjectId' component={Url}/>
              <Route path='/blog/:subjectId/:chapterId' component={Url} />
              <Route exact path='/contactus' component={feedbackForm}/>
              <PrivateRoute path='/editor' component={ EditorPage }/>
              <Redirect to="/home" />
          </Switch>
          <Footer/>
      </div>
  );
}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
