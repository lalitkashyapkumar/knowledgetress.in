import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

function About(props) {

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p><em>In the middle of difficulty lies opportunity.</em><br/>Started in 2020, We are a group of student how decide to together and help the other people get out the stress of teacher get the free and neat and clean as well as accurate knowledge and made thier life successful or as what they want do with their life after all their life their choice</p>
                    <p>We mainly serve the student who are doing study like diploma, B.tech basically engineering stream with this we also provide blogs on other topics like techology, social cultural activity etc.</p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-header text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">20 July 2020</dd>
                                <dt className="col-6">No. of people</dt>
                                <dd className="col-6">10</dd>
                                <dt className="col-6">Post</dt>
                                <dd className="col-6">5</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">Everyone is a genius. But if you judge a fish by its ability to climb, it will live its whole life believing that it is stupid.</p>
                                <footer className="blockquote-footer">Albert Einstein,
                                <cite title="Source Title">Theoretical physicist</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            
        </div>
    );
}

export default About;    