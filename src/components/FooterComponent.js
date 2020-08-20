import React from 'react';
import { Link } from 'react-router-dom';
function Footer(props) {
    return(
    <div className="footer">
        <div className="container">
            <div className="row justify-content-center">             
                <div className="col-4 offset-1 col-sm-2">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                    <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/aboutus'>About Us</Link></li>
                        <li><Link to='/blog'>Blogs</Link></li>
                        <li><Link to='/contactus'>Contact Us</Link></li>
                    </ul>
                </div>
                <div className="col-7 col-sm-5">
                    <h5>Our Address</h5>
                    <address>
		              {/* 144, UIT Sector 6<br />
		              Bhiwadi, Rajasthan<br />
		              INDIA<br />
		              <i className="fa fa-phone fa-lg"></i>: +91 9461277363<br /> */}
		              {/* <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:helpknowledgetrees@gmail.com">
                      helpknowledgetrees@gmail.com</a> */}
                      <img src="assets/images/site_qr_code.png" alt=" "/>
                    </address>
                </div>
                <div className="col-12 col-sm-4 align-self-center">
                    <div className="text-center">
                        <a className="btn btn-social-icon btn-instagram" href="https://www.instagram.com/knowledgetrees/"><i className="fa fa-instagram"></i></a>
                        <a className="btn btn-social-icon btn-reddit" href="https://www.reddit.com/user/knowledgetrees/"><i className="fa fa-reddit"></i></a>
                        <a className="btn btn-social-icon btn-google" href="https://www.quora.com/profile/Knowledge-Trees-1"><i className="fa fa-quora"></i></a>
                        <a className="btn btn-social-icon btn-twitter" href="https://twitter.com/TreesKnowledge"><i className="fa fa-twitter"></i></a>
                        
                        <a className="btn btn-social-icon" href="mailto:helpknowledgetrees@gmail.com"><i className="fa fa-envelope-o"></i></a>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>© Copyright 2020 knowledgetrees</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;