import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

  function RenderMenuItem({blog}) {
    return(
      <Card key={blog._id} onClick={ () => console.log("this specific",blog._id)}>
        <Link to={`/blog/${blog.blogId}`}>
          <CardImg top src={blog.image} alt={blog.title} />
          <CardBody>
            <CardTitle>{blog.title}</CardTitle>
            <CardText>{blog.description}</CardText>
          </CardBody>   
        </Link>
      </Card>
    ); 
  }
  
  const Blog = (props) => {
      const blogMenu = props.blogs.blogstopics.map((blog) => {
          return (
            <div key={blog._id} className="col-12 col-md-4">
              < RenderMenuItem blog={blog}/>
            </div>
          );
      });

      if(props.blogs.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }

    else if (props.blogs.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{props.blogs.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else
      return (
          <div className="container">
            <div className="row">
                  <Breadcrumb>
                      <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                      <BreadcrumbItem active>Blogs</BreadcrumbItem>
                  </Breadcrumb>
                  <div className="col-12">
                      <h3>Blogs</h3>
                      <hr />
                  </div>                
              </div>
              <div className="row">
                  {blogMenu}
              </div>
          </div>
      );
  }

export default Blog;