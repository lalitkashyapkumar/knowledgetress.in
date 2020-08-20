import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { fetchBlogs } from '../redux/ActionCreators';
import {connect} from 'react-redux';

var parse = require('html-react-parser');
const mapStateToProps = state =>{
    return{
      blogs:state.blogs
    }
  }
const mapDispatchToProps = dispatch =>({
    fetchBlogs: (blogCategory) => dispatch(fetchBlogs(blogCategory))
    })

class BlogDetail extends Component{
    componentDidMount(){
        // console.log('usrl is '+this.props.subjectId);
        this.props.fetchBlogs(this.props.subjectId);
    }

    render()
    {
        if(this.props.blogs.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }

    else if (this.props.blogs.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{this.props.blogErrMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else if (this.props.blogs.blogs != null){  
        // console.log('dincd '+JSON.stringify(this.props.blogs.blogs));
        // console.log('chapter id is '+this.props.chapterId) 
    return(
            <div className="col-12">
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/blog">Blog</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to={`/blog/${this.props.subjectId}`}>{this.props.subjectId}</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.chapterId}</BreadcrumbItem>
                        </Breadcrumb>
                        
                        <div className="col-10">
                            <h3>{this.props.blogs.blogs.title}</h3>
                            <hr />
                        </div>          
                    </div>
                </div>
                <div className="row colrev">
                <div className="col-12 col-md-3">
                    < Rendertopic topics={this.props.blogs.blogs}/>
                </div>
                
                <div className="col-12 col-md-8 leftpadding ql-editor">
                
                    < Renderblog blog={this.props.blogs.blogs.filter((blog) => blog._id === this.props.chapterId)[0]}/>
                
                </div>
                </div>
            </div>
        );
    }
    else if(this.props.blogs.blogs == null){
        return(<div>
            <h2>I'm very sorry no blogs found</h2>
        </div>)
    }}
    
}
function Renderblog({blog}) { 
    // console.log('single bolg is '+blog.date);  
        if(blog){return(
            <Card key={blog._id} className="ml-1">
                {/* <CardImg top src={blog.image} alt={blog.title} /> */}
                <CardBody>
                        {parse(blog.description)}
                    <hr/>
                    <CardTitle>Posted by: {blog.author}</CardTitle>
                </CardBody>
            </Card>
        );}
        else{
            return(
            <Card className="ml-1">
                <CardBody>
                    There is no blog, Please check URL
                </CardBody>
                
            </Card>);
        }
    
}
function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
   
       return 0;  
    }  
 }
class Rendertopic extends Component{
    constructor(props){
        super(props);

        this.state={
            isTopicOpen:false
        }
    }
    toggleTopic(){
        
        this.setState({
            isTopicOpen:!this.state.isTopicOpen
        });
    }
    render(){
        this.props.topics.sort(sortByProperty('date'));
        const topicList = this.props.topics.map((topic)=>{
            return(
                <div key={topic._id} className="topicsheight">
                    
                    <Link to={`/blog/${topic.subjectId}/${topic._id}`}>
                            <div className="col-12 nopadding">
                                {topic.title}
                                <hr/>
                            </div>
                    </Link>
                    
                </div>
            );
        });
        return(
            <div>
                <h3>Related Topics</h3>
            { topicList }
            </div>
        );
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);