import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Button, Modal, ModalBody, ModalHeader, Form,FormGroup,Input,Label, Jumbotron, Alert } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isNavOpen: false,
          isModalOpen:false
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
      }

        toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
        }
        toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
        }
        handleLogin(event) {
        event.preventDefault();    
        this.toggleModal();
        
        this.props.loginUser({username: this.username.value, password: this.password.value});
        }
        handleLogout() {
            this.props.logoutUser();
            
        }
        onDismiss(){
            this.props.dissMissLoginErr();
        }
        
    render() {
        return(
            <div>
                <Navbar light expand="md" fixed="top">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img src='assets/images/treelogo.png' height="30" width="41" alt=' ' />KnowledgeTrees</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav onClick={ () => this.state.isNavOpen === true ? this.setState({isNavOpen: !this.state.isNavOpen}) :false} navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/blog'><span className="fa fa-list fa-lg"></span> Blogs</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                            </NavItem>
                            <NavItem>
                                {   !this.props.auth.isAuthenticated ? null:
                                    <NavLink className="nav-link" to='/editor'><span className="fa fa-pencil-square fa-lg"></span> Post Blog</NavLink>}
                            </NavItem>
                            </Nav>
                            <Nav className="ml-auto" onClick={ () => this.state.isNavOpen === true ? this.setState({isNavOpen: !this.state.isNavOpen}) :false} navbar>
                                <NavItem>
                                    { !this.props.auth.isAuthenticated ?
                                        <Button outline onClick={this.toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }

                                        </Button>
                                        :
                                        <div>
                                        <div className="navbar-text mr-3">{this.props.auth.user.email}</div>
                                        <Button outline onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                            
                                        </Button>
                                        </div>
                                    }
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                {/* for failed login alert */}
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Login
                    </ModalHeader>
                    <ModalBody>
                    <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            {/* <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup> */}
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 text-center">
                                <p>KnowledgeTrees</p>
                                {/* <img src="assets/images/logo.png" className="img-fluid jumbotronLogo" alt="KnowledgeTrees"/> */}
                                <p>Let's break the glass and explore a knowledgeable world and fix the world problem</p> 
                             </div>
                        </div>
                    </div>
                </Jumbotron>
                <div className="container">
                {!this.props.auth.errMess ?
                    null
                    : <Alert color="danger" toggle={this.onDismiss} >
                    <p>Login Failed: {this.props.auth.errMess}</p>
                    </Alert>
                }
                    {/* <LoginFailed errMess={this.props.auth.errMess}/> */}
                </div>
                
            </div>
        );
    }
}

// function LoginFailed({errMess}) {
//     // const [show, setShow] = useState(true);
//     // if(errMess){
//     //     setShow(true);
//     // }
//     if (errMess) {
//         return (
//             <div>
//                 <Alert color="danger" dismissible>
//                     <p>Login Failed: {errMess}</p>
//                 </Alert>
//             </div>
//         );
//     }
//     else{return(<div></div>);}
// }

export default Header;