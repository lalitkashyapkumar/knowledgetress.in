import React, { Component } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Loading } from './LoadingComponent';
import { Button, Form, FormGroup, Input, Label, FormFeedback, Col } from 'reactstrap';
window.katex = katex;
class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subjectId: '',
            description: '',
            author: '',
            title: '',
            date:'',
            touched: {
                subjectId: false,
                // description: false,
                title: false,
                author:false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    // handleChange(value) {
    //     this.setState({ text: value });
    //     console.log(this.state.text);
    //     }
    handleInputChange(event) {
        if(event.target!=null){
            const target = event.target;
            const value = target.value;
            const name = target.name;
            this.setState({
            [name]: value
            });
        }
        else{
            this.setState({
                description:event
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const blogdata={
            author:this.state.author,
            description:this.state.description,
            date:'',
            title:this.state.title,
            subjectId:this.state.subjectId,
            email:''
            
        }
        if(blogdata.title.length > 3 && blogdata.author.length > 3 && blogdata.subjectId.length > 3 && blogdata.subjectId.length>3){
            if(blogdata.description.length > 150){
                // console.log(JSON.stringify(blogdata));
                this.props.postBlog(blogdata);
            }
            else
                alert('Blog should be greater 200 characters');
        }
        else{
            alert('Please fill the all field as mention');
        }
    }
    resetForm(){
        // this.state.author,
        // this.state.description,
        // this.state.title,
        // this.state.subjectId,4
        this.setState({
            author:'',
            description:'',
            title:'',
            subjectId:''
        });
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }
    validate(subjectId, title, author) {
        const errors = {
            subjectId: '',
            author: '',
            title: ''
        };

        if (this.state.touched.title && title.length <= 4)
            errors.title = 'title should be > 4 characters';
        else if (this.state.touched.title && title.length > 30)
            errors.title = 'title should be <= 30 characters';

        if (this.state.touched.subjectId && subjectId.length < 3)
            errors.subjectId = 'Please select your subject';
        else if (this.state.touched.subjectId && subjectId.length > 30)
            errors.subjectId = 'Please select your subject';

        if (this.state.touched.author && author.length < 4)
            errors.author = 'Name should be > 3 characters';
        else if (this.state.touched.author && author.length > 20)
            errors.author = 'Sale Name dal kutriye Khandan ka itroduction nahi';
            
        return errors;
    }
    render() {
        
        const errors = this.validate(this.state.subjectId, this.state.title, this.state.author);
        if(this.props.blogstopics.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
    
        else if (this.props.blogstopics.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{this.props.blogstopics.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
    else{
        const optionList = this.props.blogstopics.blogstopics.map((blogstopic)=>{
            return(
                <option key={blogstopic._id}>{blogstopic.blogId}</option>
            );
        });
    return (
        <div className="container">
            <Form onSubmit={this.handleSubmit} onReset={this.resetForm}>
            <FormGroup row>
                <Label  htmlFor="subjectId" md={2}>Blog Subject</Label>
                <Col md={10}>
                <Input type="select" id="subjectId" name="subjectId"
                    value={this.state.subjectId}
                    onChange={this.handleInputChange}
                    invalid={errors.subjectId !== ''}
                    valid={errors.subjectId === ''}
                    onBlur={this.handleBlur('subjectId')}                       
                    >
                        <option value="" disabled selected>Select your subject</option>
                        {optionList}
                    </Input>
                    <FormFeedback>{errors.subjectId}</FormFeedback>
                    </Col>
            </FormGroup>
            <FormGroup row>
                <Label htmlFor="title" md={2}>Title</Label>
                <Col md={10}>
                    <Input type="text" id="title" name="title" 
                        placeholder="first topic title must be 'introduction'"
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        valid={errors.title === ''}
                        invalid={errors.title!== ''} 
                        onBlur={this.handleBlur('title')} />
                        <FormFeedback>{errors.title}</FormFeedback>
                    </Col>
            </FormGroup>location
            <FormGroup row>
                <Label htmlFor="author" md={2}>Author</Label>
                <Col md={10}>
                    <Input type="text" id="author" name="author" 
                        placeholder="Put your name here"
                        value={this.state.author}
                        onChange={this.handleInputChange}
                        valid={errors.author === ''}
                        invalid={errors.author !== ''}
                        onBlur={this.handleBlur('author')}  />
                        <FormFeedback>{errors.author}</FormFeedback>
                </Col>
            </FormGroup>
            <FormGroup>
                <ReactQuill className="editor" id="description" theme="snow" value={this.state.description}
                    onChange={this.handleInputChange} modules={Editor.modules}
                    
                    />
            </FormGroup>
            
            <Button type="submit" color="primary">Post</Button>
            <Button type="reset" color="secondary">clear</Button>
        </Form>
        
        </div>
    );}
    }
}
Editor.modules ={
    toolbar:[
        [{'font':[]}],
        ['bold','italic','underline','strike'],
        ['blockquote','code-block'],
        [{'header':[1,2,3,4,5,6, false]}],
        [{'list':'ordered'},{'list':'bullet'}],
        [{'script':'sub'},{'script':'super'}],
        [{'indent':'-1'},{'indent':'+1'}],
        [{'direction':'rtl'}],
        ['link','image','video','formula'],
        [{'color':[]},{'background':[]}],
        [{'align':[]}]
    ]
};
export default Editor;